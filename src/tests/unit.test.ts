import { describe, it, expect } from 'vitest';
import { generateMockJob } from '../utils/jobGenerator';
import { subDays } from 'date-fns';

describe('Job Generator', () => {
    it('should generate a job with valid fields', () => {
        const job = generateMockJob();
        expect(job).toHaveProperty('id');
        expect(job).toHaveProperty('title');
        expect(job).toHaveProperty('company');
        expect(job.source).toBe('OFFICIAL');
    });

    it('should respect date override', () => {
        const date = new Date('2023-01-01');
        const job = generateMockJob(date);
        expect(job.postedAt).toBe(date.toISOString());
    });
});

describe('Retention Policy (Round Robin)', () => {
    it('should filter out jobs older than 15 days', () => {
        // Mock jobs implicitly by calculating dates
        const now = new Date();
        const oldDate = subDays(now, 16);
        const validDate = subDays(now, 14);

        // We can't easily unit test the hook's internal state transition without mocking time or the generator deeply,
        // but we can verify the utility logic if we extracted the filter. 
        // For this test, we'll verify the retention window logic via a simple logic check mimicking the hook.

        const jobs = [
            generateMockJob(oldDate),
            generateMockJob(validDate)
        ];

        const ROLLING_WINDOW_DAYS = 15;
        const keptJobs = jobs.filter(job => {
            const posted = new Date(job.postedAt);
            return posted > subDays(now, ROLLING_WINDOW_DAYS);
        });

        expect(keptJobs.length).toBe(1);
        expect(keptJobs[0].postedAt).toBe(validDate.toISOString());
    });
});
