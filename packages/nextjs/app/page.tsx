"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { Lightning, Brain, PaperPlaneTilt, CaretRight } from "@phosphor-icons/react";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex flex-col h-full">
        {/* Hero Section */}
        <div className="flex-shrink-0 bg-white dark:bg-neutral-900 flex items-center justify-center px-8 py-16 min-h-[45vh]">
          <div className="text-center max-w-4xl">
            <h1 className="text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              Zapier for Web3
            </h1>
            <p className="text-lg text-gray-600 dark:text-neutral-400 mb-8 leading-relaxed max-w-3xl mx-auto">
              Stop writing brittle bots. Avalanche Automata lets your non-technical team build AI-powered workflows to run loyalty programs, manage DAOs, and reward users—no code required.
            </p>
            <Link 
              href="/automata" 
              className="inline-block bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-3 px-6 rounded-lg hover:brightness-110 transition-all shadow-lg"
            >
              Launch Automata
            </Link>
          </div>
        </div>

        {/* How It Works Section - The Golden Path */}
        <div className="flex-1 px-8 py-6 bg-gray-50 dark:bg-neutral-950 flex items-center">
          <div className="max-w-7xl mx-auto w-full">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
              Build Your First Intelligent Workflow in 60 Seconds
            </h2>
            
            {/* Desktop: Horizontal Flow with Connecting Lines */}
            <div className="hidden md:flex items-center justify-center gap-10 relative">
              {/* Step 1: The Trigger */}
              <div className="bg-white dark:bg-neutral-900 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all w-72 relative z-10">
                <div className="flex justify-center mb-3">
                  <Lightning className="h-12 w-12 text-red-500" weight="duotone" />
                </div>
                <h3 className="text-base font-bold mb-2 text-gray-900 dark:text-white">
                  1. Set an On-Chain Trigger
                </h3>
                <p className="text-gray-600 dark:text-neutral-400 leading-snug text-sm">
                  Start with any on-chain event. Watch for a new NFT transfer, a new user, or a passed governance vote.
                </p>
              </div>

              {/* Connecting Line 1 - Dotted */}
              <div className="flex items-center relative z-0">
                <div className="w-20 border-t-2 border-dashed border-gray-300 dark:border-neutral-600"></div>
              </div>

              {/* Step 2: The "Wow" (AI Logic) - EMPHASIZED */}
              <div className="bg-white dark:bg-neutral-900 rounded-xl p-5 shadow-2xl ring-2 ring-red-500/30 hover:ring-red-500/40 transition-all w-72 relative z-10 border-2 border-red-100 dark:border-red-900/30">
                <div className="absolute -top-2.5 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-2.5 py-0.5 rounded-full shadow-lg">
                    AI MAGIC
                  </span>
                </div>
                <div className="flex justify-center mb-3">
                  <Brain className="h-12 w-12 text-red-500" weight="duotone" />
                </div>
                <h3 className="text-base font-bold mb-2 text-gray-900 dark:text-white">
                  2. Add AI-Powered Logic
                </h3>
                <p className="text-gray-600 dark:text-neutral-400 leading-snug text-sm">
                  This is our magic. Ask the AI a simple question in plain English, like "Is this a new holder?" or "Does this address own a specific badge?"
                </p>
              </div>

              {/* Connecting Line 2 - Dotted */}
              <div className="flex items-center relative z-0">
                <div className="w-20 border-t-2 border-dashed border-gray-300 dark:border-neutral-600"></div>
              </div>

              {/* Step 3: The Actions */}
              <div className="bg-white dark:bg-neutral-900 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all w-72 relative z-10">
                <div className="flex justify-center mb-3">
                  <PaperPlaneTilt className="h-12 w-12 text-red-500" weight="duotone" />
                </div>
                <h3 className="text-base font-bold mb-2 text-gray-900 dark:text-white">
                  3. Execute On-Chain Actions
                </h3>
                <p className="text-gray-600 dark:text-neutral-400 leading-snug text-sm">
                  If the AI says "TRUE", automatically send a USDT reward, mint a loyalty NFT, or assign a new DAO role. All gasless, all automated.
                </p>
              </div>
            </div>

            {/* Mobile: Vertical Stack */}
            <div className="md:hidden flex flex-col items-center space-y-6">
              {/* Step 1 */}
              <div className="bg-white dark:bg-neutral-900 rounded-xl p-8 shadow-lg w-full max-w-sm">
                <div className="flex justify-center mb-6">
                  <Lightning className="h-16 w-16 text-red-500" weight="duotone" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  1. Set an On-Chain Trigger
                </h3>
                <p className="text-gray-600 dark:text-neutral-400 leading-relaxed">
                  Start with any on-chain event. Watch for a new NFT transfer, a new user, or a passed governance vote.
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-0.5 h-8 bg-gradient-to-b from-gray-300 to-red-200 dark:from-neutral-700 dark:to-red-900"></div>
                <CaretRight className="h-6 w-6 text-red-400 rotate-90" weight="fill" />
              </div>

              {/* Step 2 */}
              <div className="bg-white dark:bg-neutral-900 rounded-xl p-8 shadow-2xl ring-2 ring-red-500/30 w-full max-w-sm border-2 border-red-100 dark:border-red-900/30 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    AI MAGIC
                  </span>
                </div>
                <div className="flex justify-center mb-6">
                  <Brain className="h-16 w-16 text-red-500" weight="duotone" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  2. Add AI-Powered Logic
                </h3>
                <p className="text-gray-600 dark:text-neutral-400 leading-relaxed">
                  This is our magic. Ask the AI a simple question in plain English, like "Is this a new holder?" or "Does this address own a specific badge?"
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-0.5 h-8 bg-gradient-to-b from-red-200 to-gray-300 dark:from-red-900 dark:to-neutral-700"></div>
                <CaretRight className="h-6 w-6 text-red-400 rotate-90" weight="fill" />
              </div>

              {/* Step 3 */}
              <div className="bg-white dark:bg-neutral-900 rounded-xl p-8 shadow-lg w-full max-w-sm">
                <div className="flex justify-center mb-6">
                  <PaperPlaneTilt className="h-16 w-16 text-red-500" weight="duotone" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  3. Execute On-Chain Actions
                </h3>
                <p className="text-gray-600 dark:text-neutral-400 leading-relaxed">
                  If the AI says "TRUE", automatically send a USDT reward, mint a loyalty NFT, or assign a new DAO role. All gasless, all automated.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="flex-shrink-0 py-3 bg-white dark:bg-neutral-900 border-t border-gray-200 dark:border-neutral-800">
          <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 dark:text-neutral-400">
            <p>© 2025 Avalanche Automata. Built on Avalanche.</p>
            <div className="flex gap-6 mt-2 md:mt-0">
              <Link href="/automata" className="hover:text-red-500 transition-colors">
                Launch App
              </Link>
              <a href="hhttps://github.com/LazarusAA/avalanche-automata" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors">
                GitHub
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
