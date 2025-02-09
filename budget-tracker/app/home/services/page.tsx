"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import PricingPlans from "@/components/pricingTable/PricingTable"; // Import PricingPlans component
import ImageSlider from "@/components/carousal/ImageCarousal";
import InfiniteSlider from  "@/components/infiniteslider/InfiniteSlider";
import Descriptions from "@/components/description/Descriptions"

const rateLimit = 3; // Max requests per second
const rateLimitInterval = 1000; // 1 second

export default function ServicesPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pendingRequests, setPendingRequests] = useState(0); // Track pending requests
  const [isMuted, setIsMuted] = useState(true); // State to manage video mute/unmute
  const router = useRouter();
  const lastRequestTime = useRef<number>(0); // To track the last request time

  // Function to handle the rate-limited request
  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();

    // Check if we are allowed to make the request (rate limiting)
    const currentTime = Date.now();
    const timeElapsed = currentTime - lastRequestTime.current;

    if (timeElapsed < rateLimitInterval / rateLimit) {
      setPendingRequests(1);
      setIsLoading(true);
      // Wait for the allowed rate limit interval to pass
      await new Promise((resolve) => setTimeout(resolve, rateLimitInterval / rateLimit - timeElapsed));
    }

    setIsLoading(true);
    setPendingRequests(0);
    lastRequestTime.current = Date.now();

    const res = await fetch("/api/auth", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    setIsLoading(false);

    if (res.ok) {
      router.push("/sign-in"); // Navigate after successful login
    } else {
      alert("Invalid credentials");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
             
        <p className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-6xl font-bold leading-tight tracking-tighter text-transparent">
        trcBudg8
      </p>
      <h2 className="text-xl font-bold mb-4">🎇Free trial</h2>
      <h2 className="text-xl font-bold mb-4">Enter Your Access Token</h2>
      <form onSubmit={handleLogin} className="flex flex-col items-center w-full max-w-md">
        <input
          type="text"
          placeholder="Token ID User001"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="border p-2 mb-2 w-full"
        />
        <input
          type="password"
          placeholder="Access Token 00001111"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border p-2 mb-4 w-full"
        />
        <button
          type="submit"
          className="bg-green-500/60 text-white px-6 py-2 rounded mt-4 w-full"
          disabled={isLoading} // Disable the button while loading
        >
          Go! 🚗
        </button>
      </form>
      
      {/* Contact Support */}
      <div className="mt-4">
        <p className="text-sm">
          <a href="/contact" className="text-green-500/60 hover:underline">
            Contact support for free tokens
          </a>
        </p>
      </div>

      {/* Show pending request notification if there are pending requests */}
      {pendingRequests > 0 && !isLoading && (
        <div className="text-yellow-500 mt-4">Please wait, you are being rate-limited. Trying again...</div>
      )}

      {/* Loading Spinner when making the request */}
      {isLoading && (
        <div className="mt-4">
          <div className="loader">Loading...</div>
        </div>
      )}

<div className="mt-8 w-full max-w-4xl">
        <Descriptions />
      </div>


      {/* Pricing Plans Component */}
      <div className="mt-8 w-full max-w-4xl">
        <PricingPlans />
      </div>

      {/* Video Section - Moved below Pricing Plans */}
      <div className="mt-8 w-full max-w-4xl video-container">
        <video
          width="100%"
          height="auto"
          controls
          preload="auto"
          muted={isMuted}
          className="rounded-t-xl"
        >
          <source src="/demo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-controls">
          <button
            className="text-xl font-bold text-white"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? "Unmute" : "Mute"}
          </button>
        </div>
      </div>

      <div className="mt-8 w-full max-w-4xl">
        <ImageSlider />
      </div>

      <div className="mt-8 w-full max-w-4xl">
        <InfiniteSlider />
      </div>

      <style jsx>{`
        .loader {
          border: 4px solid #f3f3f3; /* Light grey */
          border-top: 4px solid #3498db; /* Blue */
          border-radius: 50%;
          width: 30px;
          height: 30px;
          animation: spin 2s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .video-container {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 20px;
          overflow: hidden;
          background: #000;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .video-controls {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.5);
          padding: 5px 15px;
          border-radius: 20px;
        }

        .video-controls button {
          font-family: "Apple SD Gothic Neo", sans-serif;
          font-weight: bold;
        }

        .video-container video {
          border-radius: 20px 20px 0 0;
        }

        @keyframes fade {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        .video-container {
          animation: fade 1.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
