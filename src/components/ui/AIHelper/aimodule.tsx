import { Send, Settings, Sparkles } from 'lucide-react'
import  { useState } from 'react'
import { Input } from '../Input'
import { Button } from '../button'

function AImodule() {
    const [aiMessage, setAiMessage] = useState("");
  return (
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
                Hi! I'm your AI coding assistant. I can help with code
                suggestions, documentation, debugging, and answering your
                programming questions. What would you like to work on today?
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
              onChange={(e: any) => setAiMessage(e.target.value)}
              className="flex-1"
            />
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
  )
}

export default AImodule