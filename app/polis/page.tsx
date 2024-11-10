'use client'

import { useState, useEffect } from 'react'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, XCircle, HelpCircle, Save } from 'lucide-react'
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"

interface ProgressData {
  token: string;
  progress: number;
}

export default function Component() {
  const statements = [
    "Should we choice Sitra's challenge?",
    "Is artificial intelligence beneficial for society?",
    "Should remote work become the new standard?",
    "Are social media platforms doing enough for privacy?",
    "Should coding be mandatory in schools?",
    "Is space exploration worth the investment?",
    "Should cryptocurrencies be more regulated?",
    "Are electric vehicles the future of transportation?",
    "Should internet access be a fundamental right?",
    "Is universal basic income necessary?"
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [token, setToken] = useState('')
  const [progress, setProgress] = useState(0)
  const [isValid, setIsValid] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [canVote, setCanVote] = useState(false)

  useEffect(() => {
    // Clear input and reset states on refresh
    setToken('')
    setIsValid(false)
    setCanVote(false)
  }, [])

  const handleVote = () => {
    if (currentIndex < statements.length - 1) {
      const newIndex = currentIndex + 1
      setCurrentIndex(newIndex)
      setProgress(((newIndex + 1) / statements.length) * 100)
      
      if (newIndex === statements.length - 1) {
        setIsCompleted(true)
        toast("Congratulations! You have completed all statements.")
      }

      // Save progress after each vote
      saveProgress(newIndex)
    }
  }

  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setToken(value)
    setIsValid(value.length >= 3)
    setCanVote(false) // Reset canVote when token changes
  }

  const saveProgress = (index: number) => {
    const savedData = localStorage.getItem('votingData')
    let progressData: ProgressData[] = savedData ? JSON.parse(savedData) : []
    
    const existingIndex = progressData.findIndex(item => item.token === token)
    if (existingIndex !== -1) {
      progressData[existingIndex].progress = index
    } else {
      progressData.push({ token, progress: index })
    }

    localStorage.setItem('votingData', JSON.stringify(progressData))
    toast("Progress Saved. Your progress has been saved successfully.")
  }

  const checkProgress = () => {
    if (!isValid) {
      toast.error("Please enter a valid token first.")
      return
    }

    const savedData = localStorage.getItem('votingData')
    let progressData: ProgressData[] = savedData ? JSON.parse(savedData) : []
    const userProgress = progressData.find(item => item.token === token)

    if (userProgress) {
      setCurrentIndex(userProgress.progress)
      setProgress(((userProgress.progress + 1) / statements.length) * 100)
      setIsCompleted(userProgress.progress >= statements.length - 1)
      toast.success("Progress loaded successfully.")
    } else {
      // New token: initialize with progress 0
      progressData.push({ token, progress: 0 })
      localStorage.setItem('votingData', JSON.stringify(progressData))
      setCurrentIndex(0)
      setProgress(0)
      setIsCompleted(false)
      toast.info("New token registered. Starting from the beginning.")
    }

    setCanVote(true) // Enable voting after checking progress
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Progress</span>
          <span>{Math.min(currentIndex + 1, statements.length)} of {statements.length}</span>
        </div>
        <Progress value={progress} className="w-full" />
      </div>

      <div className="flex gap-2 items-end">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Enter your token"
            value={token}
            onChange={handleTokenChange}
          />
        </div>
        <Button variant="outline" onClick={checkProgress} disabled={!isValid}>
          Check Progress
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-medium">
            {isCompleted ? "All Statements Completed" : `Statement ${currentIndex + 1}`}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {isCompleted ? (
            <p className="text-lg text-center text-muted-foreground">
              Thank you for completing all statements!
            </p>
          ) : (
            <p className="text-lg">{statements[currentIndex]}</p>
          )}
          
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button
              onClick={handleVote}
              disabled={!canVote || isCompleted}
              variant="outline"
              className="flex-1"
            >
              <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
              Agree
            </Button>
            <Button
              onClick={handleVote}
              disabled={!canVote || isCompleted}
              variant="outline"
              className="flex-1"
            >
              <XCircle className="w-4 h-4 mr-2 text-red-500" />
              Disagree
            </Button>
            <Button
              onClick={handleVote}
              disabled={!canVote || isCompleted}
              variant="outline"
              className="flex-1"
            >
              <HelpCircle className="w-4 h-4 mr-2 text-yellow-500" />
              Pass / Unsure
            </Button>
          </div>
        </CardContent>
      </Card>

      {!canVote && (
        <p className="text-sm text-muted-foreground text-center">
          Please enter a token and check progress to enable voting
        </p>
      )}
      
      <Toaster />
    </div>
  )
}