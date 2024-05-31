"use client";

import { useEffect, useState } from "react";

interface StatsData {
  activeVotes: number;
  totalVisitors: number;
  totalCreated: number;
}

export const Stats = () => {
  const [statsData, setStatsData] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAndSetStats = async () => {
    try {
      // Fetch stats data
      const statsResponse = await fetch("/api/stats");
      if (!statsResponse.ok) {
        console.error("Error fetching stats:", statsResponse.statusText);
        return;
      }
      const statsData = await statsResponse.json();

      // Update visitor count
      const visitorCountUpdated = sessionStorage.getItem("visitorCountUpdated");
      if (!visitorCountUpdated) {
        const visitorResponse = await fetch("/api/visitors", {
          method: "POST",
        });
        if (!visitorResponse.ok) {
          console.error(
            "Error incrementing visitor count:",
            visitorResponse.statusText
          );
          return;
        }
        sessionStorage.setItem("visitorCountUpdated", "true");
      }

      // Set the fetched data to state
      setStatsData(statsData);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAndSetStats();
  }, []);

  if (loading || !statsData) {
    return <div>Loading...</div>;
  }

  const stats = [
    { value: statsData.activeVotes, title: "Active Votes" },
    { value: statsData.totalVisitors, title: "Total Visitors" },
    { value: statsData.totalCreated, title: "Total Created" },
  ];

  return (
    <section className="py-28">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="max-w-2xl mx-auto text-center z-10">
          <h3 className="text-slate-900 text-3xl font-semibold sm:text-4xl">
            Get the latest statistics about Leaf
          </h3>
          <p className="mt-3 text-gray-500 z-10">
            Leaf is a simple voting system to share with your friends. We have
            been working hard to make it the best voting system for you. Here
            are some statistics about Leaf.
          </p>
        </div>
        <div className="mt-12">
          <ul className="flex flex-col gap-4 items-center justify-center sm:flex-row z-20">
            {stats.map((item, idx) => (
              <li
                key={idx}
                className="w-full text-center bg-white border-primary-1 border px-12 py-4 rounded-lg sm:w-auto shadow-lg"
              >
                <h4 className="text-4xl text-primary-1 font-semibold">
                  {item.value}
                </h4>
                <p className="mt-3 text-primary-1 font-medium">{item.title}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
