"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { FaRegMinusSquare, FaRegPlusSquare } from "react-icons/fa";

const Page = () => {
  const [sTitle, setSTitle] = useState("");
  const [titles, setTitles] = useState([""]);
  const [expiry, setExpiry] = useState(1);
  const [sid, setSid] = useState("");
  const router = useRouter();

  const handleTitle = (index: number, value: string) => {
    const newTitles = [...titles];
    newTitles[index] = value;
    setTitles(newTitles);
  };

  const addTitleField = () => {
    setTitles([...titles, ""]);
  };

  const removeTitleField = (index: number) => {
    setTitles(titles.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (sid) {
      router.push(`/sid/${sid}`);
    }
  }, [sid, router]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sTitle.length < 1) {
      alert("Please enter a session title.");
      return;
    }
    if (titles.length < 1) {
      alert("Please enter at least one title.");
      return;
    }

    try {
      const response = await fetch("/api/sid/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionTitle: sTitle, expiry, titles }),
      });

      if (!response.ok) {
        return;
      }
      const data = await response.json();
      setSid(data.sid);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <section className="py-28">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <h2 className="text-2xl font-bold mb-4 text-slate-800">
          Create a new Voting Session
        </h2>
        <div className="bg-white border-primary-1 border w-full rounded-md shadow-md p-4">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="w-full flex flex-col sm:flex-row gap-4">
              <div className="mb-4 w-full">
                <label className="block text-slate-800 font-bold text-md">
                  Session Title:
                </label>
                <input
                  type="text"
                  value={sTitle}
                  onChange={(e) => setSTitle(e.target.value)}
                  className="p-2 w-full border border-primary-1 rounded mt-1"
                  required
                />
              </div>
              <div className="mb-4 w-full">
                <label className="block text-slate-800 font-bold text-md">
                  Expiry:
                </label>
                <select
                  value={expiry}
                  onChange={(e) => setExpiry(Number(e.target.value))}
                  className="p-2 w-full border border-primary-1 rounded mt-1"
                  required
                >
                  <option value={1}>1 Day</option>
                  <option value={3}>3 Days</option>
                  <option value={7}>7 Days</option>
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-slate-800 font-bold text-md mb-1">
                Voting Titles:
              </label>
              {titles.map((title, index) => (
                <div key={index} className="flex mb-2">
                  <div className="border border-primary-1 rounded flex-row flex w-full">
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => handleTitle(index, e.target.value)}
                      className="w-full p-2  border-none"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => removeTitleField(index)}
                      className="mx-4 text-red-600"
                    >
                      <FaRegMinusSquare />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={addTitleField}
                    className="ml-2 px-4 py-2 bg-primary-1 text-white rounded"
                  >
                    <FaRegPlusSquare />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center sm:justify-start">
              <button
                type="submit"
                className="bg-primary-1 text-white hover:bg-slate-800 transition-all duration-300 rounded px-4 py-2"
              >
                Create Voting Session
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Page;
