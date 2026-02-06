
'use client';
import { useState, useEffect } from 'react';
import { CardanoWallet, useWallet } from '@meshsdk/react';
import { Target, TrendingUp, Wallet, Bell, CheckCircle2 } from 'lucide-react';

export default function Home() {
  const { connected } = useWallet();
  const [target, setTarget] = useState(1000);
  const [months, setMonths] = useState(12);
  const [saved, setSaved] = useState(0);

  const monthlyNeeded = (target / months).toFixed(2);
  const percentDone = Math.min((saved / target) * 100, 100);
  const remaining = target - saved;

  return (
    <div className="min-h-screen p-4 md:p-8">
      <nav className="max-w-5xl mx-auto flex justify-between items-center mb-12">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Target size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight">ADA SAVER</span>
        </div>
        <CardanoWallet />
      </nav>

      <main className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-8">
        {/* Planner Left */}
        <div className="bg-slate-800/40 border border-slate-700 p-8 rounded-3xl backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="text-blue-400" />
            <h2 className="text-xl font-semibold">Savings Planner</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm text-slate-400 mb-2">Target Amount (ADA)</label>
              <input 
                type="number" 
                value={target} 
                onChange={(e) => setTarget(Number(e.target.value))}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 focus:ring-2 ring-blue-500 transition-all text-xl font-bold"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-2">Duration (Months)</label>
              <input 
                type="number" 
                value={months} 
                onChange={(e) => setMonths(Number(e.target.value))}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 focus:ring-2 ring-blue-500 transition-all text-xl font-bold"
              />
            </div>

            <div className="p-6 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-blue-500/30 rounded-2xl">
              <p className="text-blue-300 text-sm mb-1 font-medium">Monthly Savings Requirement</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-white">{monthlyNeeded}</span>
                <span className="text-blue-400 font-bold">ADA / month</span>
              </div>
            </div>
          </div>
        </div>

        {/* Vault Status Right */}
        <div className="bg-slate-800/40 border border-slate-700 p-8 rounded-3xl backdrop-blur-sm flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Wallet className="text-emerald-400" />
              <h2 className="text-xl font-semibold">Vault Status</h2>
            </div>
            {percentDone === 100 && (
              <span className="flex items-center gap-1 text-emerald-400 text-xs font-bold px-2 py-1 bg-emerald-400/10 rounded-full">
                <CheckCircle2 size={14} /> TARGET MET
              </span>
            )}
          </div>

          <div className="flex-grow">
            <div className="mb-6">
              <div className="flex justify-between mb-2 text-sm font-medium">
                <span className="text-slate-400">Total Saved</span>
                <span className="text-white">{saved} / {target} ADA</span>
              </div>
              <div className="w-full h-4 bg-slate-900 rounded-full overflow-hidden p-1 shadow-inner">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${percentDone === 100 ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'bg-blue-500'}`} 
                  style={{ width: `${percentDone}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                <p className="text-slate-500 text-xs mb-1">Percentage</p>
                <p className="text-2xl font-bold">{percentDone.toFixed(1)}%</p>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                <p className="text-slate-500 text-xs mb-1">Remaining</p>
                <p className="text-2xl font-bold">{remaining > 0 ? remaining : 0} ADA</p>
              </div>
            </div>

            {connected ? (
              <div className="space-y-4">
                <button 
                  onClick={() => setSaved(prev => Math.min(prev + Number(monthlyNeeded), target))}
                  className="w-full bg-blue-600 hover:bg-blue-500 active:scale-[0.98] py-4 rounded-2xl font-black text-lg transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
                >
                  <Bell size={20} /> Deposit {monthlyNeeded} ADA
                </button>
                <button 
                  disabled={percentDone < 100}
                  className={`w-full py-4 rounded-2xl font-black text-lg transition-all border-2 ${
                    percentDone === 100 
                    ? 'bg-emerald-600 border-emerald-400 hover:bg-emerald-500 cursor-pointer shadow-lg shadow-emerald-600/20' 
                    : 'bg-slate-700 border-slate-600 opacity-50 cursor-not-allowed text-slate-400'
                  }`}
                >
                  Withdraw All Funds
                </button>
              </div>
            ) : (
              <div className="text-center py-8 bg-slate-900/40 rounded-2xl border-2 border-dashed border-slate-700">
                <p className="text-slate-400 font-medium">Connect Wallet to Start Saving</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}