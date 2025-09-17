import { Send, Settings, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import { Input } from './Input'
import { Button } from './button'

function CodeEditor() {
      const [aiMessage, setAiMessage] = useState("")
  return (
    <div className="flex-1 flex">
            <div className="flex-1 relative">
              <div className="absolute inset-0 bg-background">
                <div className="h-full overflow-auto">
                  <div className="flex">
                    {/* Line Numbers */}
                    <div className="w-12 bg-muted/30 text-muted-foreground text-sm font-mono leading-6 text-right pr-2 py-4 select-none">
                      {Array.from({ length: 25 }, (_, i) => (
                        <div key={i + 1}>{i + 1}</div>
                      ))}
                    </div>

                    {/* Code Content */}
                    <div className="flex-1 py-4 px-4">
                      <pre className="text-sm font-mono leading-6 text-foreground">
                        <code>
                         </code>
                      </pre>

                      {/* AI Suggestion Popup */}
                 
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar - AI Helper */}
            <div className="w-80 border-l bg-card flex flex-col">
              <div className="p-3 border-b flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-500" />
                <span className="font-medium text-sm">AI Helper</span>
                <Settings className="w-4 h-4 ml-auto text-muted-foreground" />
              </div>

              <div className="flex-1 overflow-auto p-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-purple-600" />
                    </div>
                    <span className="text-muted-foreground">Explain Code</span>
                    <span className="text-muted-foreground">Optimize</span>
                    <span className="text-muted-foreground">Documentation</span>
                  </div>

                  <div className="bg-muted/30 rounded-lg p-3 text-sm">
                    <p className="text-muted-foreground">
                      Hi! I'm your AI coding assistant. I can help with code suggestions, documentation, debugging, and
                      answering your programming questions. What would you like to work on today?
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">10:07 AM</p>
                  </div>
                </div>
              </div>

              <div className="p-3 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask me anything about your code..."
                    value={aiMessage}
                    onChange={(e:any) => setAiMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
  )
}

export default CodeEditor