"use client"

import { useState, useEffect } from "react"

const quotes = [
  {
    text: "Code is like humor. When you have to explain it, it's bad.",
    author: "Cory House",
    role: "Software Architect",
  },
  {
    text: "The best error message is the one that never shows up.",
    author: "Thomas Fuchs",
    role: "Creator of Script.aculo.us",
  },
  {
    text: "Programming isn't about what you know; it's about what you can figure out.",
    author: "Chris Pine",
    role: "Author of Learn to Program",
  },
  {
    text: "Clean code always looks like it was written by someone who cares.",
    author: "Robert C. Martin",
    role: "Author of Clean Code",
  },
  {
    text: "The most important property of a program is whether it accomplishes the intention of its user.",
    author: "C.A.R. Hoare",
    role: "Computer Scientist",
  },
]

export function CodeQuote() {
  const [currentQuote, setCurrentQuote] = useState(quotes[0])

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
    setCurrentQuote(randomQuote)
  }, [])

  return (
    <div className="max-w-lg space-y-6">
      <blockquote className="text-2xl font-medium text-white leading-relaxed">"{currentQuote.text}"</blockquote>

      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <span className="text-white font-semibold text-lg">
            {currentQuote.author
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </span>
        </div>
        <div>
          <div className="text-white font-semibold">{currentQuote.author}</div>
          <div className="text-gray-400 text-sm">{currentQuote.role}</div>
        </div>
      </div>
    </div>
  )
}
