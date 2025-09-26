"use client"
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const createTree = () => {
    if (!text.trim()) {
      setError("Please enter a handle");
      return;
    }
    setError(""); // clear previous error
    router.push(`/generate?handle=${text}`);
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-[#254f1a] min-h-screen grid grid-cols-1 lg:grid-cols-2 pt-20 md:pt-28 lg:pt-32">
        
        {/* Left Content */}
        <div className="flex justify-center flex-col px-6 md:px-12 lg:ml-[8vw] gap-3 text-center lg:text-left">
          <p className="text-yellow-300 font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            Everything you
          </p>
          <p className="text-yellow-300 font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            are. In one,
          </p>
          <p className="text-yellow-300 font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            simple link in bio.
          </p>

          <p className="text-yellow-300 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl my-4 max-w-2xl mx-auto lg:mx-0">
            Join 50M+ people using Linktree for their link in bio. One link to help you
            share everything you create, curate and sell from your Instagram, TikTok,
            Twitter, YouTube and other social media profiles.
          </p>

          <div className="input flex flex-col sm:flex-row gap-3 sm:gap-2 w-full sm:w-auto max-w-md mx-auto lg:mx-0">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              className={`px-3 py-2 w-full sm:w-64 focus:outline-green-800 rounded-md ${
                error ? "border-2 border-red-500" : "border border-transparent"
              }`}
              type="text"
              placeholder="Enter your Handle"
            />
            <button
              onClick={createTree}
              className="bg-pink-300 rounded-full px-4 py-3 font-semibold hover:bg-pink-400 transition"
            >
              Claim your Bittree
            </button>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>

        {/* Right Image */}
        <div className="flex items-center justify-center mt-10 lg:mt-0 lg:mr-[8vw]">
          <Image
            src="/home.png"
            alt="homepage image"
            width={600}
            height={600}
            className="w-[75%] sm:w-[400px] md:w-[450px] lg:w-[500px] xl:w-[550px] h-auto"
          />
        </div>
      </section>

      {/* Next Section */}
      <section className="bg-[#254f1a] min-h-screen"></section>
    </main>
  );
}
