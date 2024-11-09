"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "./styles.css";
import { Card, CardContent } from "@/components/ui/card";
import {MoveUp, MoveDown, MoveLeft, MoveRight} from "lucide-react";

export default function Component() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [gameState, setGameState] = useState<{
    sections: Record<string, "gray" | "red" | "green">;
    activeSection: string | null;
    gameStarted: boolean;
    completed: boolean;
  }>({
    sections: {
      top: "gray",
      right: "gray",
      bottom: "gray",
      left: "gray",
    },
    activeSection: null,
    gameStarted: false,
    completed: false,
  });

  const [pressing, setPressing] = useState<string | null>(null);
  const [pressStartTime, setPressStartTime] = useState<number | null>(null);
  const [pressProgress, setPressProgress] = useState<number>(0);

  useEffect(() => {
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    }

    setupCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    // Start the game after component mount
    const timer = setTimeout(() => {
      activateRandomSection();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const activateRandomSection = () => {
    // Get available gray sections
    const availableSections = Object.entries(gameState.sections)
      .filter(([_, color]) => color === "gray")
      .map(([section]) => section);

    if (availableSections.length === 0) {
      setGameState((prev) => ({ ...prev, completed: true }));
      return;
    }

    // Select random section from available ones
    const randomSection =
      availableSections[Math.floor(Math.random() * availableSections.length)];

    setGameState((prev) => ({
      ...prev,
      sections: { ...prev.sections, [randomSection]: "red" },
      activeSection: randomSection,
      gameStarted: true,
    }));
  };

  const resetGame = () => {
    setGameState({
      sections: {
        top: "gray",
        right: "gray",
        bottom: "gray",
        left: "gray",
      },
      activeSection: null,
      gameStarted: false,
      completed: false,
    });
    activateRandomSection();
  };

  const handleSectionMouseDown = (position: string) => {
    if (gameState.sections[position] === "red") {
      setPressing(position);
      setPressStartTime(Date.now());
      setPressProgress(0);
    }
  };

  const handleSectionMouseUp = () => {
    if (pressing) {
      const pressDuration = Date.now() - (pressStartTime || 0);
      if (pressDuration >= 1000) {
        // Correct press
        setGameState((prev) => ({
          ...prev,
          sections: { ...prev.sections, [pressing]: "green" },
        }));

        // Schedule next section after a short delay
        setTimeout(() => {
          activateRandomSection();
        }, 500);
      } else {
        // Reset progress if not pressed long enough
        setPressProgress(0);
      }
      setPressing(null);
      setPressStartTime(null);
    }
  };

  useEffect(() => {
    if (pressing) {
      const interval = setInterval(() => {
        const pressDuration = Date.now() - (pressStartTime || 0);
        setPressProgress(Math.min(pressDuration / 1000, 1));
        if (pressDuration >= 1000) {
          handleSectionMouseUp();
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, [pressing, pressStartTime]);

  const handleSectionClick = (position: string) => {
    if (gameState.sections[position] === "red") {
      // Correct click
      setGameState((prev) => ({
        ...prev,
        sections: { ...prev.sections, [position]: "green" },
      }));

      // Schedule next section after a short delay
      setTimeout(() => {
        activateRandomSection();
      }, 500);
    }
  };

  const getBackgroundColor = (section: string) => {
    if (section === pressing) {
      const red = 239 + (34 - 239) * pressProgress;
      const green = 68 + (197 - 68) * pressProgress;
      const blue = 68 + (94 - 68) * pressProgress;
      return `rgb(${red}, ${green}, ${blue})`;
    }
    switch (gameState.sections[section]) {
      case "red":
        return "#ef4444";
      case "green":
        return "#22c55e";
      default:
        return "#d1d5db";
    }
  };

  return (
    <div
      className="relative w-[384px] h-[384px] mx-auto my-auto bg-gray-100 rounded-lg overflow-hidden"
      onMouseUp={handleSectionMouseUp}
      onMouseLeave={handleSectionMouseUp}
    >
      {/* Center Circle Video */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[160px] h-[160px] rounded-full overflow-hidden z-10">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={{
              transform: "rotateY(180deg)",
              WebkitTransform: "rotateY(180deg)",
              MozTransform: "rotateY(180deg)",
            }}
            className="w-full h-full object-cover rounded-full border-8 border-gray-200"
          />
          {!stream && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
              <div className="w-16 h-16 rounded-full border-2 border-gray-400 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-gray-400" />
                <div className="w-10 h-5 bg-gray-400 absolute mt-10 rounded-t-full" />
              </div>
            </div>
          )}
        </div>
        {gameState.completed && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 z-20 rounded-lg">
            <div className="text-white text-xl font-bold mb-4">
              You passed the human test!
            </div>
            <button
              onClick={resetGame}
              className="px-4 py-2 bg-white text-black rounded-lg"
            >
              Restart
            </button>
          </div>
        )}
      </div>

      {/* Triangular Sections */}
      <motion.div
        className="absolute w-full h-full cursor-pointer"
        animate={{ backgroundColor: getBackgroundColor("top") }}
        onMouseDown={() => handleSectionMouseDown("top")}
        style={{
          clipPath: "polygon(0 0, 100% 0, 50% 50%)",
        }}
      >
        <span className="absolute top-6 left-1/2 -translate-x-1/2 text-white font-bold">
          <MoveUp />
        </span>
      </motion.div>

      <motion.div
        className="absolute w-full h-full cursor-pointer"
        animate={{ backgroundColor: getBackgroundColor("right") }}
        onMouseDown={() => handleSectionMouseDown("right")}
        style={{
          clipPath: "polygon(100% 0, 100% 100%, 50% 50%)",
        }}
      >
        <span className="absolute right-6 top-1/2 -translate-y-1/2 text-white font-bold">
          <MoveRight />
        </span>
      </motion.div>

      <motion.div
        className="absolute w-full h-full cursor-pointer"
        animate={{ backgroundColor: getBackgroundColor("bottom") }}
        onMouseDown={() => handleSectionMouseDown("bottom")}
        style={{
          clipPath: "polygon(0 100%, 100% 100%, 50% 50%)",
        }}
      >
        <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white font-bold">
          <MoveDown />
        </span>
      </motion.div>

      <motion.div
        className="absolute w-full h-full cursor-pointer"
        animate={{ backgroundColor: getBackgroundColor("left") }}
        onMouseDown={() => handleSectionMouseDown("left")}
        style={{
          clipPath: "polygon(0 0, 0 100%, 50% 50%)",
        }}
      >
        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-white font-bold">
          <MoveLeft />
        </span>
      </motion.div>
    </div>
  );
}
