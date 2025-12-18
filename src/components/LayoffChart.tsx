
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Mock Layoff Data
const DATA = [
    { period: "Last Week", count: 2450 },
    { period: "This Week", count: 1840 },
    { period: "Last Month", count: 8900 },
    { period: "This Month", count: 5200 }
];

export const LayoffChart = () => {
    return (
        <div className="w-full h-full p-4 bg-royal-900 border border-slate-800 rounded-xl relative group">
            <h3 className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                Layoff Trends (Live WARN Data)
            </h3>
            <div className="h-32 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={DATA} layout="horizontal" margin={{ top: 5, right: 30, left: -20, bottom: 5 }}>
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
                            barSize={30}
                            fillOpacity={0.8}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
