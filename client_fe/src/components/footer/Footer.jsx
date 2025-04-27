import React from "react";
import { FaRegCopyright } from "react-icons/fa";
function Footer() {
  return (
    
    <footer className="bg-black text-gray-300 py-8 md:py-12 relative">
      <div className="flex flex-col items-center justify-center gap-6 md:gap-8">
        {/* Heading with gradient */}
        <div className="text-center animate-pulse text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-orange-500 to-orange-900 hover:scale-105 transition-transform duration-300">
          Expense Tracker
        </div>

        {/* Copyright text */}
        <div className="text-sm md:text-sm text-white/80 flex items-center gap-2">
          <FaRegCopyright />
          <span>
          {new Date().getFullYear() }   www.expense-tracker.com | All Rights Reserved
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
