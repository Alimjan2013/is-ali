"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import './styles.css';

export default function Component() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [gameState, setGameState] = useState<{
    sections: Record<string, "gray" | "red" | "green">
    activeSection: string | null
    gameStarted: boolean
    completed: boolean
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
  })

  useEffect(() => {
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        setStream(stream)
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      } catch (error) {
        console.error("Error accessing camera:", error)
      }
    }

    setupCamera()

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  useEffect(() => {
    // Start the game after component mount
    const timer = setTimeout(() => {
      activateRandomSection()
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const activateRandomSection = () => {
    // Get available gray sections
    const availableSections = Object.entries(gameState.sections)
      .filter(([_, color]) => color === "gray")
      .map(([section]) => section)

    if (availableSections.length === 0) {
      setGameState((prev) => ({ ...prev, completed: true }))
      return
    }

    // Select random section from available ones
    const randomSection = availableSections[Math.floor(Math.random() * availableSections.length)]

    setGameState((prev) => ({
      ...prev,
      sections: { ...prev.sections, [randomSection]: "red" },
      activeSection: randomSection,
      gameStarted: true,
    }))
  }

  const handleSectionClick = (position: string) => {
    if (gameState.sections[position] === "red") {
      // Correct click
      setGameState((prev) => ({
        ...prev,
        sections: { ...prev.sections, [position]: "green" },
      }))

      // Schedule next section after a short delay
      setTimeout(() => {
        activateRandomSection()
      }, 500)
    }
  }

  const getBackgroundColor = (section: string) => {
    switch (gameState.sections[section]) {
      case "red":
        return "#ef4444"
      case "green":
        return "#22c55e"
      default:
        return "#d1d5db"
    }
  }

  return (
    <div className="relative w-[384px] h-[384px] mx-auto my-auto bg-gray-100 rounded-lg overflow-hidden">
      {/* Center Circle Video */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[160px] h-[160px] rounded-full overflow-hidden z-10">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={{ transform: "rotateY(180deg)", WebkitTransform: "rotateY(180deg)", MozTransform: "rotateY(180deg)" }}
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
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20 rounded-lg">
            <div className="text-white text-xl font-bold">You passed the human test!</div>
          </div>
        )}
      </div>

      {/* Triangular Sections */}
      <motion.div
        className="absolute w-full h-full cursor-pointer"
        animate={{ backgroundColor: getBackgroundColor("top") }}
        onClick={() => handleSectionClick("top")}
        style={{
          clipPath: "polygon(0 0, 100% 0, 50% 50%)",
        }}
      >
        <span className="absolute top-6 left-1/2 -translate-x-1/2 text-white font-bold">1</span>
      </motion.div>

      <motion.div
        className="absolute w-full h-full cursor-pointer"
        animate={{ backgroundColor: getBackgroundColor("right") }}
        onClick={() => handleSectionClick("right")}
        style={{
          clipPath: "polygon(100% 0, 100% 100%, 50% 50%)",
        }}
      >
        <span className="absolute right-6 top-1/2 -translate-y-1/2 text-white font-bold">2</span>
      </motion.div>

      <motion.div
        className="absolute w-full h-full cursor-pointer"
        animate={{ backgroundColor: getBackgroundColor("bottom") }}
        onClick={() => handleSectionClick("bottom")}
        style={{
          clipPath: "polygon(0 100%, 100% 100%, 50% 50%)",
        }}
      >
        <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white font-bold">3</span>
      </motion.div>

      <motion.div
        className="absolute w-full h-full cursor-pointer"
        animate={{ backgroundColor: getBackgroundColor("left") }}
        onClick={() => handleSectionClick("left")}
        style={{
          clipPath: "polygon(0 0, 0 100%, 50% 50%)",
        }}
      >
        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-white font-bold">4</span>
      </motion.div>
    </div>  )
}