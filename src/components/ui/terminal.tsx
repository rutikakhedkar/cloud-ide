import React, { useState } from 'react'
import  {Button}  from "../../components/ui/button"
import { Maximize2, X } from 'lucide-react'
import { cn } from '../../utils'


function Terminal() {
      const [terminalExpanded, setTerminalExpanded] = useState(true)
  return (
     <div className={cn("border-t bg-black text-green-400 font-mono", terminalExpanded ? "h-48" : "h-8")}>
            <div className="flex items-center justify-between px-4 py-1 bg-gray-800 text-white text-sm">
              <div className="flex items-center gap-2">
                <span>Terminal</span>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTerminalExpanded(!terminalExpanded)}
                  className="h-6 w-6 p-0 text-white hover:bg-gray-700"
                >
                  <Maximize2 className="w-3 h-3" />
                </Button>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-white hover:bg-gray-700">
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>

            {terminalExpanded && (
              <div className="p-4 text-sm">
                <div className="mb-2">
                  <span className="text-green-400">$</span> npm run dev
                </div>
                <div className="text-red-300 mb-2">
                  Command not found: npm run dev. Type 'help' for available commands.
                </div>
                <div className="flex items-center">
                  <span className="text-green-400">$</span>
                  <span className="ml-2 bg-gray-700 w-2 h-4 animate-pulse"></span>
                </div>
              </div>
            )}
          </div>
  )
}

export default Terminal