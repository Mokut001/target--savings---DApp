
'use client';
import { useState } from 'react';
import { CardanoWallet, useWallet } from '@meshsdk/react';
import { Target, Wallet, ArrowUpRight, CheckCircle, Calculator, Trophy } from 'lucide-react';

export default function SavingsVault() {
  const { connected } = useWallet();
  const [targetAda, setTargetAda] = useState(1000);
  const [timeframe, setTimeframe] = useState(12);
  const [savedAda, setSavedAda] = useState(0);
  const [loading, setLoading] = useState(false);

  const monthlyAda = (targetAda / timeframe).toFixed(2);
  const progress = Math.min((savedAda / targetAda) * 100, 100);
  const remaining = Math.max(0, targetAda - savedAda);
  const isGoalMet = savedAda >= targetAda;

  const handleDeposit = () => {
    setLoading(true);
    setTimeout(() => {
      setSavedAda(prev => prev + Number(monthlyAda));
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      <nav className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center border-b border-gray-800">
        <div className="flex items-center gap-2">
            <Target size={24} className="text-blue-500" />
            <h1 className="text-xl font-bold">VaultNode</h1>
        </div>
        <CardanoWallet />
      </nav>

      <main className="max-w-6xl mx-auto p-6 md:p-12">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-[#161b22] p-8 rounded-3xl border border-gray-800">
            <h2 className="text-gray-400 mb-2 uppercase text-xs font-bold tracking-widest">Available in Vault</h2>
            <div className="flex items-baseline gap-3 mb-8">
                <span className="text-6xl font-black">{savedAda.toLocaleString()}</span>
                <span className="text-2xl font-bold text-blue-500">ADA</span>
            </div>
            
            <div className="space-y-4">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Progress</span>
                    <span className="font-bold">{progress.toFixed(1)}%</span>
                </div>
                <div className="h-4 w-full bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${isGoalMet ? 'bg-emerald-500' : 'bg-blue-600'}`}
                      style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-[#0d1117] p-4 rounded-2xl border border-gray-800">
                    <p className="text-xs text-gray-500 uppercase font-bold">Remaining</p>
                    <p className="text-xl font-black">{remaining.toLocaleString()} ADA</p>
                </div>
                <div className="bg-[#0d1117] p-4 rounded-2xl border border-gray-800">
                    <p className="text-xs text-gray-500 uppercase font-bold">Timeframe</p>
                    <p className="text-xl font-black">{timeframe} Months</p>
                </div>
            </div>
          </div>

          <div className="bg-[#161b22] p-8 rounded-3xl border border-gray-800">
            <div className="space-y-6">
                <div>
                    <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Target Goal (ADA)</label>
                    <input 
                      type="number" value={targetAda} 
                      onChange={(e) => setTargetAda(Number(e.target.value))}
                      className="w-full bg-[#0d1117] border border-gray-800 rounded-xl p-4 text-xl font-bold focus:ring-2 ring-blue-500 outline-none"
                    />
                </div>
                <div>
                    <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Duration (Months)</label>
                    <input 
                      type="number" value={timeframe} 
                      onChange={(e) => setTimeframe(Number(e.target.value))}
                      className="w-full bg-[#0d1117] border border-gray-800 rounded-xl p-4 text-xl font-bold focus:ring-2 ring-blue-500 outline-none"
                    />
                </div>

                <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                    <p className="text-sm text-blue-400">Suggested Deposit: <strong>{monthlyAda} ADA/mo</strong></p>
                </div>

                <div className="space-y-3 pt-4">
                    <button 
                      onClick={handleDeposit}
                      disabled={!connected || loading || isGoalMet}
                      className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 rounded-xl font-bold text-lg flex items-center justify-center gap-2"
                    >
                        {loading ? 'Processing...' : `Deposit ${monthlyAda} ADA`}
                        <ArrowUpRight size={20} />
                    </button>
                    <button 
                      disabled={!isGoalMet}
                      className={`w-full py-4 rounded-xl font-bold text-lg border-2 ${isGoalMet ? 'bg-white text-black' : 'border-gray-800 text-gray-600 cursor-not-allowed'}`}
                    >
                        Withdraw All
                    </button>
                </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}