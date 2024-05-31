"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

import { FaRegCopy } from "react-icons/fa";

import { Isid } from "@/models/sid";

const Page = () => {
  const [session, setSession] = useState<Isid | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0 });
  const [selectedVote, setSelectedVote] = useState<string[]>([]);
  const pathname = usePathname();
  const sid = pathname.split("/").pop();

  const { toast } = useToast();

  if (!pathname) {
    return <div>Session ID not found</div>;
  }

  const fetchSession = async () => {
    try {
      if (!sid) return;

      const res = await fetch(`/api/sid/${sid}`);

      if (!res.ok) {
        return;
      }

      const sidSession: Isid = await res.json();

      if (sidSession.votes === null) return <div>There is nothing to see.</div>;

      setSession(sidSession);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSession();
  }, [sid, fetchSession]);

  useEffect(() => {
    if (!session) return;

    const calculateTimeLeft = () => {
      const now = new Date();
      const expiryDate = new Date(session.expiry);
      const timeDifference = expiryDate.getTime() - now.getTime();

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );

      setTimeLeft({ days, hours });
    };

    const timerId = setInterval(calculateTimeLeft, 1000);

    calculateTimeLeft();

    return () => clearInterval(timerId);
  }, [session]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const res = await fetch(`/api/sid/${sid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedVote }),
      });

      if (!res.ok) {
        return toast({
          title: "Error",
          description: "An error occurred while submitting your votes.",
        });
      }

      setSelectedVote([]);
      fetchSession();

      toast({
        title: "Success",
        description: "Votes submitted successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while submitting your votes.",
      });
    }
  };

  const handleCardSelection = (title: string) => {
    const index = selectedVote.indexOf(title);

    if (index === -1) {
      setSelectedVote([...selectedVote, title]);
    } else {
      setSelectedVote((prev) => {
        const updatedVotes = [...prev];
        updatedVotes.splice(index, 1);
        return updatedVotes;
      });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!session) return <div>Session not found</div>;

  const copyUrl = (e: any) => {
    e.preventDefault();
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Copied",
      description: "Session URL copied to clipboard.",
    });
  };

  const sortedVotes = session.votes.sort((a, b) => b.votings - a.votings);

  return (
    <section className="py-28">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="w-full flex justify-between items-center sm:flex-row flex-col mb-4">
          <h1 className="text-primary-1 text-4xl font-bold">
            {session.sessionTitle}
          </h1>
          <p className="text-md font-semibold text-slate-900">
            Expires in: {timeLeft.days} days, {timeLeft.hours} hours
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex sm:flex-row flex-col justify-between items-center">
            <button
              type="submit"
              className="mb-4 px-6 py-1 bg-slate-800 text-white rounded-full items-center justify-center flex w-full sm:w-auto"
            >
              Submit Votes
            </button>
            <button
              onClick={(e) => copyUrl(e)}
              className="mb-4 px-6 py-1 bg-slate-800 text-white rounded-full items-center justify-center flex w-full sm:w-auto"
            >
              <span className="mr-2">Copy URL</span>
              <FaRegCopy className="w-4 h-4 text-white" />
            </button>
          </div>
          <div className="flex-col flex w-full items-center">
            {sortedVotes.map((votes, index) => (
              <div
                key={index}
                className="bg-white border border-primary-1 rounded-md w-full mb-4 py-4 px-2 flex items-center"
              >
                <div className="flex flex-row items-center w-full">
                  <div className="flex w-full justify-start">
                    <input
                      type="checkbox"
                      value={votes.title}
                      onChange={() => handleCardSelection(votes.title)}
                      checked={selectedVote.includes(votes.title)}
                      className="mx-4"
                    />
                    <hr className="h-8 border-r-2 border-gray-300" />
                    <h2 className="text-2xl ml-4 font-semibold text-slate-800">
                      {votes.title}
                    </h2>
                  </div>
                  <div className="flex justify-end w-full">
                    <p className="text-lg font-medium">{votes.votings} Votes</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Page;
