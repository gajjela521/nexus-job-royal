
import { AlertTriangle, ExternalLink } from 'lucide-react';
import { WARN_SITES } from '../data/warnSites';
import { LayoffChart } from './LayoffChart';

// Mock Layoff Feed Data
const RECENT_LAYOFFS = [
    { company: "Discord", date: "2025-01-10", initial: 17, count: 170, location: "Remote" },
    { company: "Twitch", date: "2025-01-09", initial: 35, count: 500, location: "San Francisco, CA" },
    { company: "Unity", date: "2025-01-08", initial: 25, count: 1800, location: "Global" },
    { company: "BlackRock", date: "2025-01-08", initial: 3, count: 600, location: "New York, NY" },
    { company: "Duolingo", date: "2025-01-08", initial: 10, count: 0, location: "Contractors" }, // Partial data
];

export const LayoffPage = () => {
    return (
        <div className="p-8">
            <header className="mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent mb-2">Layoff Intelligence</h2>
                <p className="text-slate-400">Tracking workforce reductions and WARN notices globally.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Feed */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Charts Section */}
                    <div className="bg-royal-900 border border-slate-800 p-6 rounded-xl">
                        <div className="h-64">
                            <LayoffChart />
                        </div>
                    </div>

                    {/* Recent Alerts Table */}
                    <div className="bg-royal-900 border border-slate-800 rounded-xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-800 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-red-500" />
                            <h3 className="font-bold text-slate-200">Recent Reductions</h3>
                        </div>
                        <table className="w-full text-left text-sm">
                            <thead className="bg-white/5 text-slate-500 uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-3 font-medium">Company</th>
                                    <th className="px-6 py-3 font-medium">Date</th>
                                    <th className="px-6 py-3 font-medium">Wait Impact</th>
                                    <th className="px-6 py-3 font-medium">Location</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {RECENT_LAYOFFS.map((layoff, i) => (
                                    <tr key={i} className="hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4 font-bold text-slate-300">{layoff.company}</td>
                                        <td className="px-6 py-4 text-slate-500">{layoff.date}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 bg-red-500/10 text-red-500 rounded border border-red-500/20 font-bold text-xs">
                                                {layoff.count > 0 ? `~${layoff.count}` : 'Undisclosed'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500">{layoff.location}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Sidebar: State WARN Links */}
                <div className="bg-royal-900 border border-slate-800 rounded-xl p-4 flex flex-col h-[600px]">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Official WARN Registries</div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar space-y-1 pr-2">
                        {Object.entries(WARN_SITES).map(([state, url]) => (
                            <a
                                key={state}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:bg-white/5 hover:text-red-400 transition-colors border border-transparent hover:border-red-500/20"
                            >
                                <span>{state}</span>
                                <ExternalLink className="w-3.5 h-3.5 opacity-50" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
