"use client";

import { useState } from "react";
import Link from "next/link";

export const Navigation = () => {
  const [active, setActive] = useState(0);

  const navTitle = [
    { title: "Home", href: "/" },
    { title: "Create Vote", href: "/create" },
    { title: "Search Votes", href: "/search" },
  ];

  return (
    <div className="max-w-screen mx-auto px-4 pt-4 md:px-8">
      <div className="items-start justify-between md:flex">
        <div className="flex flex-col items-center">
          <h3 className="text-slate-800 text-2xl font-semibold">
            Vote with Leaf
          </h3>
        </div>
        <div className="items-center gap-x-3 mt-6 md:mt-0 sm:flex">
          <a
            href="/create"
            className="block px-4 py-2 mt-3 text-center text-primary-2 duration-150 font-medium bg-primary-1 rounded-lg hover:bg-slate-8d00 active:bg-slate-900 sm:mt-0 md:text-sm"
          >
            Get Started
          </a>
        </div>
      </div>
      <div className="mt-6 md:mt-4">
        <ul className="w-full border-b flex items-center justify-center md:justify-start gap-x-3 overflow-x-auto">
          {navTitle.map((item, idx) => (
            <li
              key={idx}
              className={`block px-4 py-2 mt-3 text-center text-slate-900 duration-150 font-semibold ${
                active === idx
                  ? "border-b-primary-1 border-b-2 text-primary-1"
                  : "bg-transparent"
              } hover:text-primary-1 sm:mt-0 md:text-sm`}
              onClick={() => setActive(idx)}
            >
              <Link href={item.href}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
