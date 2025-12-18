
import { useState, useEffect } from 'react';
import { generateMockJob } from '../utils/jobGenerator';
import { subDays, isAfter } from 'date-fns';

export interface Job {
    id: string;
    title: string;
    company: string;
    type: 'CONTRACT' | 'FULL_TIME';
    location: string;
    postedAt: string;
    url: string;
    source: 'OFFICIAL' | 'AGGREGATOR';
    status: 'ACTIVE' | 'CLOSED';
}

const ROLLING_WINDOW_DAYS = 15;

export const useJobPoller = (intervalMs: number = 5000) => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
    const [isPolling, setIsPolling] = useState(false);

    // Initial Load - Backfill 15 Days
    useEffect(() => {
        const loadInitial = () => {
            const initialJobs: Job[] = [];

            // Distribute 100 jobs over the last 15 days semi-randomly
            const now = new Date();
            for (let i = 0; i < 100; i++) {
                const daysAgo = Math.floor(Math.random() * ROLLING_WINDOW_DAYS);
                const jobDate = subDays(now, daysAgo);
                // Add some random hours/minutes jitter
                jobDate.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));

                initialJobs.push(generateMockJob(jobDate));
            }
            // Sort valid ones just in case (descending)
            initialJobs.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());

            setJobs(initialJobs);
            setLoading(false);
            setLastUpdated(new Date());
        };
        loadInitial();
    }, []);

    // Polling & Retention Logic
    useEffect(() => {
        const interval = setInterval(() => {
            setIsPolling(true);
            setTimeout(() => { // Simulate network delay
                const now = new Date();
                const retentionCutoff = subDays(now, ROLLING_WINDOW_DAYS);

                // 1. Generate new jobs (simulating fresh scraper run)
                const newJobs: Job[] = [];
                const count = Math.floor(Math.random() * 3) + 1; // 1-3 new jobs
                for (let i = 0; i < count; i++) {
                    newJobs.push(generateMockJob(now));
                }

                setJobs(prev => {
                    // 2. Merge new + old
                    const allJobs = [...newJobs, ...prev];

                    // 3. Filter out expired jobs (Round Robin Retention)
                    const keptJobs = allJobs.filter(job => {
                        const posted = new Date(job.postedAt);
                        return isAfter(posted, retentionCutoff);
                    });

                    return keptJobs;
                });

                setLastUpdated(now);
                setIsPolling(false);
            }, 2000);
        }, intervalMs);

        return () => clearInterval(interval);
    }, [intervalMs]);

    return { jobs, loading, lastUpdated, isPolling };
};
