"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

export default function Component() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [sections, setSections] = useState({
    top: false,
    right: false,
    bottom: false,
    left: false,
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
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  const handleSectionClick = (position: keyof typeof sections) => {
    setSections(prev => ({
      ...prev,
      [position]: !prev[position]
    }))
  }

  return (
    <div className="relative w-[384px] h-[384px] mx-auto bg-gray-100 rounded-lg overflow-hidden">
      {/* Center Circle Video */}
      
      {/* Triangular Sections */}
      <motion.div
        className="absolute w-full h-full cursor-pointer"
        animate={{ backgroundColor: sections.top ? "#22c55e" : "#ef4444" }}
        onClick={() => handleSectionClick("top")}
        style={{
          clipPath: "polygon(0 0, 100% 0, 50% 50%)",
        }}
      >
        <span className="absolute top-6 left-1/2 -translate-x-1/2 text-white font-bold">1</span>
      </motion.div>
      
      <motion.div
        className="absolute w-full h-full cursor-pointer"
        animate={{ backgroundColor: sections.right ? "#22c55e" : "#ef4444" }}
        onClick={() => handleSectionClick("right")}
        style={{
          clipPath: "polygon(100% 0, 100% 100%, 50% 50%)",
        }}
      >
        <span className="absolute right-6 top-1/2 -translate-y-1/2 text-white font-bold">2</span>
      </motion.div>
      
      <motion.div
        className="absolute w-full h-full cursor-pointer"
        animate={{ backgroundColor: sections.bottom ? "#22c55e" : "#ef4444" }}
        onClick={() => handleSectionClick("bottom")}
        style={{
          clipPath: "polygon(0 100%, 100% 100%, 50% 50%)",
        }}
      >
        <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white font-bold">3</span>
      </motion.div>
      
      <motion.div
        className="absolute w-full h-full cursor-pointer"
        animate={{ backgroundColor: sections.left ? "#22c55e" : "#ef4444" }}
        onClick={() => handleSectionClick("left")}
        style={{
          clipPath: "polygon(0 0, 0 100%, 50% 50%)",
        }}
      >
        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-white font-bold">4</span>
      </motion.div>
    </div>
  )
}