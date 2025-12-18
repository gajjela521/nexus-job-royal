
import { useState } from 'react';
import { useJobPoller } from './hooks/useJobPoller';
import { JobCard } from './components/JobCard';
import { LayoffChart } from './components/LayoffChart';
import { GrowthStats } from './components/GrowthStats';
import { StatsChart } from './components/StatsChart';
import { WARN_SITES } from './data/warnSites';
import { LayoutDashboard, Search, ExternalLink } from 'lucide-react';
import { clsx } from 'clsx';
import { format } from 'date-fns';

function App() {
  const { jobs, loading, lastUpdated, isPolling } = useJobPoller(3600000); // 1 hour poll in real usage, simulated fast in hook
  const [filter, setFilter] = useState<'ALL' | 'CONTRACT' | 'FULL_TIME'>('ALL');
  const [search, setSearch] = useState('');

  const filteredJobs = jobs.filter(job => {
    const matchesType = filter === 'ALL' || job.type === filter;
    const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-royal-950 text-slate-200 font-sans selection:bg-accent-gold/30 flex">

      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800/50 bg-royal-900/40 backdrop-blur-xl flex flex-col fixed h-full z-10 glass-panel">
        <div className="p-8 border-b border-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-gold to-accent-amber flex items-center justify-center text-royal-950 font-bold shadow-[0_0_15px_rgba(251,191,36,0.2)]">
              N
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-100 tracking-tight">NEXUS</h1>
              <p className="text-[10px] text-accent-gold uppercase tracking-[0.2em]">Royal Edition</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <div className="px-4 py-2 text-xs font-bold text-slate-500 uppercase tracking-widest">Dashboard</div>
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-accent-gold font-bold text-sm shadow-xl">
            <LayoutDashboard className="w-4 h-4" />
            Live Feed
          </button>
        </nav>

        <div className="p-4 border-t border-slate-800/50">
          <div className="bg-black/20 rounded-xl p-4 border border-white/5">
            <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">System Status</div>
            <div className="flex items-center gap-2 mb-1">
              <div className={clsx("w-2 h-2 rounded-full", isPolling ? "bg-accent-gold animate-pulse" : "bg-emerald-500")}></div>
              <span className="text-xs font-bold text-slate-300">{isPolling ? 'Scraping Sources...' : 'Operational'}</span>
            </div>
            {lastUpdated && (
              <div className="text-[10px] text-slate-500">
                Last Sync: {format(lastUpdated, 'HH:mm:ss')}
              </div>
            )}
          </div>
        </div>

        {/* WARN Links */}
        <div className="flex-1 p-4 border-t border-slate-800/50 min-h-0 overflow-hidden flex flex-col">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-2 font-bold px-1">US State WARN Sites</div>
          <div className="flex-1 overflow-y-auto custom-scrollbar space-y-1">
            {Object.entries(WARN_SITES).map(([state, url]) => (
              <a
                key={state}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-slate-400 hover:bg-white/5 hover:text-accent-gold transition-colors"
                title={`${state} WARN Notices`}
              >
                <span>{state}</span>
                <ExternalLink className="w-3 h-3 opacity-50" />
              </a>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 relative">
        <div className="fixed top-0 left-64 right-0 h-48 bg-gradient-to-b from-royal-950/90 to-transparent pointer-events-none z-0"></div>

        <header className="relative z-10 flex flex-col mb-12">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-100 to-slate-500 bg-clip-text text-transparent mb-2">Executive Dashboard</h2>
              <p className="text-slate-400">Real-time enterprise job aggregation from official channels.</p>
            </div>

            {/* Total Active Badge */}
            <div className="bg-royal-900 border border-slate-800 px-6 py-3 rounded-xl flex flex-col items-end">
              <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Total Active Jobs</div>
              <div className="text-3xl font-bold text-white">{jobs.length}</div>
            </div>
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-4 gap-6 mb-2">
            {/* Growth Metrics */}
            <div className="col-span-2 flex flex-col justify-end">
              <GrowthStats jobs={jobs} filter={filter} />
            </div>

            {/* Job Mix Chart */}
            <div className="bg-royal-900 border border-slate-800 p-4 rounded-xl relative h-40">
              <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-2 absolute top-4 left-4">Current Mix</div>
              <div className="h-28 mt-4">
                <StatsChart jobs={jobs} />
              </div>
            </div>

            {/* Layoff Chart */}
            <div className="h-40">
              <LayoffChart />
            </div>
          </div>
        </header>

        {/* Controls */}
        <div className="relative z-10 flex items-center justify-between mb-8 sticky top-4 bg-royal-950/80 backdrop-blur-md p-4 rounded-2xl border border-slate-800/50 shadow-2xl">
          <div className="flex items-center gap-2 bg-royal-900 border border-slate-700 rounded-lg px-3 py-2 w-96 focus-within:ring-1 focus-within:ring-accent-gold/50 transition-all">
            <Search className="w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search companies, roles..."
              className="bg-transparent border-none focus:outline-none text-sm w-full placeholder-slate-600"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setFilter('ALL')}
              className={clsx("px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all", filter === 'ALL' ? "bg-accent-gold text-royal-950 shadow-[0_0_15px_rgba(251,191,36,0.3)]" : "bg-royal-900 border border-slate-700 text-slate-400 hover:text-white")}
            >
              All Jobs
            </button>
            <button
              onClick={() => setFilter('FULL_TIME')}
              className={clsx("px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all", filter === 'FULL_TIME' ? "bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)]" : "bg-royal-900 border border-slate-700 text-slate-400 hover:text-white")}
            >
              Full Time
            </button>
            <button
              onClick={() => setFilter('CONTRACT')}
              className={clsx("px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all", filter === 'CONTRACT' ? "bg-emerald-500 text-royal-950 shadow-[0_0_15px_rgba(16,185,129,0.3)]" : "bg-royal-900 border border-slate-700 text-slate-400 hover:text-white")}
            >
              Contract
            </button>
          </div>
        </div>

        {/* Job Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-0">
          {loading ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-slate-500">
              <div className="w-12 h-12 border-4 border-accent-gold border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-sm font-mono animate-pulse">ESTABLISHING SECURE CONNECTIONS...</p>
            </div>
          ) : (
            filteredJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))
          )}
          {!loading && filteredJobs.length === 0 && (
            <div className="col-span-full text-center py-20 text-slate-500">
              No jobs found matching parameters.
            </div>
          )}
        </div>

      </main>
    </div>
  );
}

export default App;
