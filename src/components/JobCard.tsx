
import { clsx } from 'clsx';
import { ExternalLink, Clock, MapPin, Building2 } from 'lucide-react';
import type { Job } from '../hooks/useJobPoller';
import { formatDistanceToNow, format } from 'date-fns';

interface JobCardProps {
    job: Job;
}

export const JobCard = ({ job }: JobCardProps) => {
    return (
        <div className="group relative bg-royal-900 border border-slate-800 rounded-xl p-5 hover:border-accent-gold/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(251,191,36,0.1)]">
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                    <div className={clsx(
                        "w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg",
                        job.type === 'CONTRACT' ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                    )}>
                        {job.company.charAt(0)}
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-100 group-hover:text-accent-gold transition-colors">{job.title}</h3>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                            <Building2 className="w-3 h-3" />
                            {job.company}
                        </div>
                    </div>
                </div>
                <span className={clsx(
                    "text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-full border",
                    job.type === 'CONTRACT' ? "bg-emerald-900/20 text-emerald-400 border-emerald-700/30" : "bg-indigo-900/20 text-indigo-400 border-indigo-700/30"
                )}>
                    {job.type === 'FULL_TIME' ? 'Full Time' : 'Contract'}
                </span>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5" />
                    {job.location}
                </div>
                <div className="flex flex-col items-end gap-0.5 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {formatDistanceToNow(new Date(job.postedAt), { addSuffix: true })}
                    </div>
                    <span className="text-[10px] text-slate-600 font-mono">
                        {format(new Date(job.postedAt), "MMM d, h:mm a")}
                    </span>
                </div>
            </div>

            <a
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-royal-800 hover:bg-accent-gold hover:text-royal-950 text-slate-300 py-2 rounded-lg text-xs font-bold transition-all uppercase tracking-wide border border-royal-700 hover:border-accent-gold"
            >
                Apply Official <ExternalLink className="w-3 h-3" />
            </a>
        </div>
    );
};
