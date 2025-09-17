import { GitBranch, Play, X } from 'lucide-react'
import { Input } from './Input'
import { Button } from './button'

function EditorBredcrum() {
  return (
<div className="flex items-center border-b bg-card">
            <div className="flex">
              <div className="flex items-center gap-2 px-4 py-2 bg-background border-r text-sm">
                <span>WelcomeComponent.tsx</span>
                <X className="w-3 h-3 hover:bg-accent rounded" />
              </div>
              <div className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground">
                <span>App.tsx</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground">
                <span>index.css</span>
              </div>
            </div>
            <div className="flex-1" />
            <div className="flex items-center gap-2 px-4">
              <Button variant="ghost" size="sm">
                <GitBranch className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Play className="w-4 h-4" />
              </Button>
            </div>
          </div>
  )
}

export default EditorBredcrum