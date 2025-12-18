
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { Job } from '../hooks/useJobPoller';

export const StatsChart = ({ jobs }: { jobs: Job[] }) => {
    const contractCount = jobs.filter(j => j.type === 'CONTRACT').length;
    const fullTimeCount = jobs.filter(j => j.type === 'FULL_TIME').length;

    const data = [
        { name: 'Contract', count: contractCount, color: '#34d399' },
        { name: 'Full Time', count: fullTimeCount, color: '#818cf8' },
    ];

    return (
        <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#cbd5e1' }}
                        cursor={{ fill: 'transparent' }}
                    />
                    <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
