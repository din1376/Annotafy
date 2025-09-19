"use client";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "@/components/ui/Confetti";
import { useConfetti } from "@/hooks/useConfetti";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useBalances } from "@/hooks/useBalances";
import Github from "@/components/ui/icons/Github";
import Filecoin from "@/components/ui/icons/Filecoin";
import { useRouter, useSearchParams } from "next/navigation";

type Tab = "manage-storage" | "upload" | "datasets";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "smooth",
    },
  },
};

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-2xl w-full p-10 rounded-2xl shadow-xl bg-white flex flex-col items-center">
        <img src="/filecoin.svg" alt="Filecoin" className="w-16 h-16 mb-4" />
        <h1 className="text-4xl font-extrabold text-black mb-4 text-center">Annotafy</h1>
        <p className="text-lg text-gray-700 mb-8 text-center">
          Welcome to Annotafy: Create, contribute to, and annotate open data campaigns on Filecoin. Earn rewards for uploading and annotating data. Explore and buy community datasets.
        </p>
        <div className="flex gap-4 w-full justify-center">
          <a href="/campaigns" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition shadow">
            View Campaigns
          </a>
          <a href="/campaigns/create" className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold text-lg hover:bg-green-700 transition shadow">
            Create Campaign
          </a>
        </div>
      </div>
    </div>
  );
}

