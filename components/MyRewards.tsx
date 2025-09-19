"use client";

import { useState } from "react";

// Dummy leaderboard data for demo
const baseLeaderboard = [
  { name: "Alice", annotations: 120, reward: 120 },
  { name: "Bob", annotations: 90, reward: 90 },
  { name: "Carol", annotations: 45, reward: 45 },
  { name: "Dave", annotations: 30, reward: 30 },
];

const badges = [
  { name: "Starter", icon: "🥉", threshold: 10 },
  { name: "Annotator", icon: "🥈", threshold: 50 },
  { name: "Pro", icon: "🥇", threshold: 100 },
  { name: "Legend", icon: "🏅", threshold: 200 },
];

export default function MyRewards() {
  // Simulated user stats (change these for testing)
  const [userAnnotations, setUserAnnotations] = useState(60);
  const [userReward, setUserReward] = useState(60);
  const [redeemed, setRedeemed] = useState(false);

  // Find next badge
  const nextBadge = badges.find((b) => userAnnotations < b.threshold);
  const progress = nextBadge
    ? Math.min(100, (userAnnotations / nextBadge.threshold) * 100)
    : 100;
  const unlockedBadges = badges.filter((b) => userAnnotations >= b.threshold);

  // For demo: allow changing annotation count/reward
  function simulateAnnotate() {
    setUserAnnotations((n) => n + 5);
    setUserReward((r) => r + 5);
    setRedeemed(false);
  }
  function resetDemo() {
    setUserAnnotations(0);
    setUserReward(0);
    setRedeemed(false);
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow border mt-12 flex flex-col items-center">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-4xl">🏆</span>
        <h2 className="text-3xl font-extrabold text-blue-700 tracking-tight">My Annotation Rewards</h2>
      </div>
      {/* Progress Bar */}
      <div className="w-full mb-6">
        <div className="flex justify-between mb-1">
          <span className="text-black font-semibold">Progress to next badge:</span>
          <span className="text-black font-semibold">{progress.toFixed(0)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-blue-600 h-4 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        {nextBadge && (
          <div className="mt-2 text-black text-sm text-center">{userAnnotations}/{nextBadge.threshold} for <span className="font-bold">{nextBadge.name}</span> {nextBadge.icon}</div>
        )}
      </div>
      {/* Badges */}
      <div className="mb-8 w-full">
        <div className="text-black font-semibold mb-2">Badges & Achievements:</div>
        <div className="flex gap-3 flex-wrap">
          {badges.map((b) => (
            <div
              key={b.name}
              className={`flex flex-col items-center p-3 rounded-lg border-2 ${userAnnotations >= b.threshold ? "border-green-500 bg-green-50" : "border-gray-300 bg-gray-100"}`}
            >
              <span className="text-2xl mb-1">{b.icon}</span>
              <span className="font-bold text-black">{b.name}</span>
              <span className="text-xs text-gray-500">{b.threshold}+</span>
            </div>
          ))}
        </div>
      </div>
      {/* Leaderboard */}
      <div className="mb-8 w-full">
        <div className="text-black font-semibold mb-2">Leaderboard:</div>
        <div className="bg-white rounded-lg shadow p-4">
          <table className="w-full text-black">
            <thead>
              <tr>
                <th className="text-left">Rank</th>
                <th className="text-left">User</th>
                <th className="text-right">Annotations</th>
                <th className="text-right">Reward</th>
              </tr>
            </thead>
            <tbody>
              {[
                ...baseLeaderboard,
                { name: "You", annotations: userAnnotations, reward: userReward },
              ]
                .sort((a, b) => b.annotations - a.annotations)
                .map((user: { name: string; annotations: number; reward: number }, idx: number) => (
                  <tr key={user.name + user.annotations} className={user.name === "You" ? "bg-blue-50 font-bold" : ""}>
                    <td>#{idx + 1}</td>
                    <td>{user.name}</td>
                    <td className="text-right">{user.annotations}</td>
                    <td className="text-right">{user.reward} USDFC</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Reward Redemption */}
      <div className="mb-8 w-full flex flex-col items-center">
        <div className="text-black font-semibold mb-2">Reward Redemption:</div>
        <button
          className={`px-6 py-3 rounded-lg font-bold text-lg transition shadow ${redeemed ? "bg-gray-400 text-white" : "bg-green-600 text-white hover:bg-green-700"}`}
          disabled={redeemed}
          onClick={() => setRedeemed(true)}
        >
          {redeemed ? "Reward Redeemed!" : `Redeem ${userReward} USDFC`}
        </button>
        {redeemed && <div className="mt-2 text-green-700 font-semibold">Your reward has been redeemed!</div>}
      </div>
    </div>
  );
}
