import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-0">
        <p>© {new Date().getFullYear()} QueueLess Hospital. All rights reserved.</p>
        <div className="flex gap-4">
          <Link to="/about" className="hover:text-primary">
            About
          </Link>
          <Link to="/contact" className="hover:text-primary">
            Contact
          </Link>
          <Link to="/features" className="hover:text-primary">
            QueueLess Features
          </Link>
        </div>
      </div>
    </footer>
  );
}

