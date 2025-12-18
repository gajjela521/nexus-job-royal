
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { clsx } from 'clsx';

// Mock Layoff Data
const DATA_MONTHLY = [
    { period: "Sep", count: 8500 },
    { period: "Oct", count: 9200 },
    { period: "Nov", count: 7800 },
    { period: "Dec", count: 5200 }
];

const DATA_WEEKLY = [
    { period: "Wk 1", count: 2100 },
    { period: "Wk 2", count: 1850 },
    { period: "Wk 3", count: 2400 },
    { period: "Wk 4", count: 1200 }
];

const DATA_DAILY = [
    { period: "Mon", count: 320 },
    { period: "Tue", count: 450 },
    { period: "Wed", count: 280 },
    { period: "Thu", count: 510 },
    { period: "Fri", count: 390 }
];

type Period = 'DAILY' | 'WEEKLY' | 'MONTHLY';

export const LayoffChart = () => {
    const [period, setPeriod] = useState<Period>('MONTHLY');

    const data = period === 'DAILY' ? DATA_DAILY
        : period === 'WEEKLY' ? DATA_WEEKLY
            : DATA_MONTHLY;

    return (
        <div className="w-full h-full p-4 bg-royal-900 border border-slate-800 rounded-xl relative group flex flex-col">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-[10px] text-slate-500 uppercase tracking-widest font-bold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    Layoff Trends (Live WARN)
                </h3>
                <div className="flex bg-black/20 rounded-lg p-0.5 border border-white/5">
                    {(['DAILY', 'WEEKLY', 'MONTHLY'] as Period[]).map((p) => (
                        <button
                            key={p}
                            onClick={(e) => { e.stopPropagation(); setPeriod(p); }}
                            className={clsx(
                                "px-2 py-1 text-[9px] font-bold rounded transition-all",
                                period === p ? "bg-red-500 text-white shadow-lg" : "text-slate-500 hover:text-slate-300"
                            )}
                        >
                            {p.charAt(0) + p.slice(1).toLowerCase()}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} layout="horizontal" margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                        <XAxis dataKey="period" stroke="#64748b" fontSize={9} axisLine={false} tickLine={false} />
                        <YAxis stroke="#64748b" fontSize={9} axisLine={false} tickLine={false} />
                        <Tooltip
                            cursor={{ fill: '#1e293b' }}
                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#cbd5e1', fontSize: '11px' }}
                            itemStyle={{ color: '#f87171' }}
                        />
                        <Bar
                            dataKey="count"
                            fill="#ef4444"
                            radius={[4, 4, 0, 0]}
                            barSize={period === 'DAILY' ? 40 : 25}
                            fillOpacity={0.8}
                            animationDuration={300}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
