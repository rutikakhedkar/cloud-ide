import { BookOpen, Github, Grid3X3, Search, Sparkles } from 'lucide-react'
import  {Button}  from "../../components/ui/button"

function Navigation() {
  return (
      
      <div className="flex items-center justify-between px-4 py-2 border-b bg-card">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Grid3X3 className="w-5 h-5 text-purple-500" />
            <span className="font-semibold text-purple-500">CloudIDE</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Button variant="ghost" size="sm" className="gap-2">
              <Search className="w-4 h-4" />
              Explorer
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <Sparkles className="w-4 h-4" />
              AI Helper
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <BookOpen className="w-4 h-4" />
            All Bookmarks
          </Button>
          <Button variant="ghost" size="sm">
            <Github className="w-4 h-4" />
            GitHub
          </Button>
          <Button variant="default" size="sm" className="bg-purple-600 hover:bg-purple-700">
            <span className="text-white">Google</span>
          </Button>
        </div>
      </div>
  )
}

export default Navigation