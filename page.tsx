
'use client';
import { CardanoWallet, useWallet } from '@meshsdk/react';
import { useState, useEffect } from 'react';
import { PieChart, Clock, Target, Wallet } from 'lucide-react';

export default function SavingsApp() {
  const { connected, wallet } = useWallet();
  const [target, setTarget] = useState(1000);
  const [duration, setDuration] = useState(12); // months
  const [saved, setSaved] = useState(250);
  
  const monthly = (target / duration).toFixed(2);
  const remaining = target - saved;
  const progress = Math.min((saved / target) * 100, 100);

  return (
    <main className="min-h-screen bg-[#0f172a] text-slate-100 p-6 font-sans">
      <nav className="max-w-4xl mx-auto flex justify-between items-center mb-12">
        <h1 className="text-2xl font-black bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent italic">
          ADA_VAULT
        </h1>
        <CardanoWallet />
      </nav>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Calculator Section */}
        <section className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Target className="text-blue-400" /> Set Your Goal
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-slate-400 mb-2">Target Amount (ADA)</label>
              <input type="number" value={target} onChange={(e)=>setTarget(Number(e.target.value))} className="w-full bg-slate-900 border-slate-700 rounded-xl p-3 focus:ring-2 ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-2">Duration (Months)</label>
              <input type="number" value={duration} onChange={(e)=>setDuration(Number(e.target.value))} className="w-full bg-slate-900 border-slate-700 rounded-xl p-3 focus:ring-2 ring-blue-500 outline-none" />
            </div>
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
              <p className="text-sm text-blue-300">Suggested Monthly Savings</p>
              <p className="text-3xl font-black text-blue-400">{monthly} ADA</p>
            </div>
          </div>
        </section>

        {/* Status Section */}
        <section className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <PieChart className="text-emerald-400" /> Vault Status
            </h2>
            
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Total Saved</span>
                <span className="font-mono">{saved} / {target} ADA</span>
              </div>
              <div className="h-4 bg-slate-900 rounded-full overflow-hidden border border-slate-700">
                <div className={`h-full transition-all duration-1000 ${progress === 100 ? 'bg-emerald-400' : 'bg-blue-500'}`} style={{width: `${progress}%`}}></div>
              </div>
              
              {progress === 100 ? (
                <div className="bg-emerald-500/20 text-emerald-400 p-4 rounded-xl text-center font-bold animate-bounce">
                  🎉 Target Reached! Ready for withdrawal.
                </div>
              ) : (
                <div className="text-center text-sm text-slate-500">
                  Keep going! {remaining} ADA left to reach your goal.
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 space-y-3">
             <button className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2">
               <Wallet size={20}/> Deposit ADA
             </button>
             <button disabled={progress < 100} className={`w-full py-4 rounded-2xl font-bold transition-all border ${progress >= 100 ? 'bg-emerald-600 border-emerald-400' : 'bg-slate-700 border-slate-600 opacity-50 cursor-not-allowed'}`}>
               Withdraw Everything
             </button>
          </div>
        </section>
      </div>
    </main>
  );
}
