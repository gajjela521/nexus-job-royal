
import { useMemo } from 'react';
import type { Job } from '../hooks/useJobPoller';
import { isToday, isYesterday, isThisWeek, isSameWeek, subWeeks } from 'date-fns';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { clsx } from 'clsx';

interface GrowthStatsProps {
    jobs: Job[];
    filter: 'ALL' | 'CONTRACT' | 'FULL_TIME';
}

export const GrowthStats = ({ jobs, filter }: GrowthStatsProps) => {
    // 1. Filter jobs first based on tab selection
    const relevantJobs = useMemo(() => {
        return filter === 'ALL' ? jobs : jobs.filter(j => j.type === filter);
    }, [jobs, filter]);

    // 2. Calculate Day Stats
    const todayCount = relevantJobs.filter(j => isToday(new Date(j.postedAt))).length;
    const yesterdayCount = relevantJobs.filter(j => isYesterday(new Date(j.postedAt))).length;

    // Avoid division by zero
    const dayGrowth = yesterdayCount === 0 ? (todayCount > 0 ? 100 : 0) : Math.round(((todayCount - yesterdayCount) / yesterdayCount) * 100);

    // 3. Calculate Week Stats
    const now = new Date();
    const lastWeek = subWeeks(now, 1);

    const thisWeekCount = relevantJobs.filter(j => isThisWeek(new Date(j.postedAt))).length;
    const lastWeekCount = relevantJobs.filter(j => isSameWeek(new Date(j.postedAt), lastWeek)).length;

    const weekGrowth = lastWeekCount === 0 ? (thisWeekCount > 0 ? 100 : 0) : Math.round(((thisWeekCount - lastWeekCount) / lastWeekCount) * 100);

    const StatCard = ({ label, count, growth, period }: any) => (
        <div className="bg-royal-900 border border-slate-800 p-4 rounded-xl flex-1">
            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">{label}</div>
            <div className="flex items-end gap-3">
                <div className="text-3xl font-bold text-white bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                    {count}
                </div>
                <div className={clsx(
                    "flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded mb-1",
                    growth > 0 ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20" :
                        growth < 0 ? "text-red-400 bg-red-500/10 border border-red-500/20" :
                            "text-slate-400 bg-slate-500/10 border border-slate-500/20"
                )}>
                    {growth > 0 ? <TrendingUp className="w-3 h-3" /> : growth < 0 ? <TrendingDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                    {growth > 0 ? '+' : ''}{growth}% ({period})
                </div>
            </div>

        </div>
    );

    return (
        <div className="flex gap-4 w-full">
            <StatCard label={`${filter === 'ALL' ? 'Total' : filter} Growth (Day)`} count={todayCount} growth={dayGrowth} period="vs Yest" />
            <StatCard label={`${filter === 'ALL' ? 'Total' : filter} Growth (Week)`} count={thisWeekCount} growth={weekGrowth} period="vs Last Wk" />
        </div>
    );
};
