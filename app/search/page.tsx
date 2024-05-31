"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const page = () => {
  const router = useRouter();
  const [sessionID, setSessionID] = useState<string | null>(null);

  const extractSessionID = (url: string) => {
    const urlParts = url.split("/");
    const sid = urlParts.pop();
    return sid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.includes("http")) {
      const sid = extractSessionID(e.target.value);
      setSessionID(sid!);
    } else {
      setSessionID(e.target.value);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!sessionID) {
      return;
    }

    router.push(`/sid/${sessionID}`);
  };

  useEffect(() => {
    if (sessionID) {
      const sid = extractSessionID(sessionID);
      setSessionID(sid as string | null);
    }
  }, [sessionID]);

  return (
    <section className="py-28">
      <div className="relative overflow-hidden">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary-1">Leaf</h1>
            <p className="mt-4 text-lg text-gray-400">
              Enter the Session ID to search for a session.
            </p>
          </div>
          <div className="mt-7 mx-auto max-w-xl relative">
            <form onSubmit={handleSubmit}>
              <div className="relative z-10 flex space-x-3 p-3 bg-white border border-primary-1 rounded-lg shadow-lg shadow-gray-100">
                <div className="flex-[1_0_0%]">
                  <input
                    type="text"
                    value={sessionID || ""}
                    onChange={handleInputChange}
                    className="py-2.5 px-4 block w-full border-transparent rounded-lg focus:outline-none"
                    placeholder="Enter Session ID or URL"
                  />
                </div>
                <div className="flex-[0_0_auto]">
                  <button
                    type="submit"
                    className="size-[46px] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-primary-1 text-white hover:bg-primary-2 hover:text-primary-1 transition-all hover:border-primary-1 duration-300 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    <svg
                      className="flex-shrink-0 size-5"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
