import { useState } from "react"
import  {Button}  from "../components/ui/button"
import  {Input}  from "../components/ui/Input"
import {
  ChevronRight,
  ChevronDown,
  File,
  Folder,
  FolderOpen,
  Grid3X3,
  Search,
  GitBranch,
  Play,
  Maximize2,
  X,
  Send,
  Sparkles,
  Github,
  BookOpen,
  Settings,
} from "lucide-react"
import { cn } from "../lib/utils"

const fileTree = [
  {
    name: "src",
    type: "folder",
    expanded: true,
    children: [
      {
        name: "components",
        type: "folder",
        expanded: false,
        children: [],
      },
      {
        name: "pages",
        type: "folder",
        expanded: false,
        children: [],
      },
      { name: "App.tsx", type: "file" },
      { name: "index.css", type: "file" },
    ],
  },
  {
    name: "public",
    type: "folder",
    expanded: false,
    children: [],
  },
  { name: "package.json", type: "file" },
  { name: "README.md", type: "file" },
]

const codeContent = `import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const WelcomeComponent = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(prev => prev + 1);
  };

  return (
    <div className="p-6 bg-gradient-subtle rounded-lg">
      <h1 className="text-2xl font-bold mb-4">
        Welcome to CloudIDE! 🚀
      </h1>
      
      <p className="text-muted-foreground mb-4">
        You clicked {count} times
      </p>
      
      <Button
        onClick={handleIncrement}
      >
        Click me
      </Button>
    </div>
  );
};`

interface FileTreeItemProps {
  item: any
  level: number
  onFileSelect: (fileName: string) => void
  selectedFile: string
}

function FileTreeItem({ item, level, onFileSelect, selectedFile }: FileTreeItemProps) {
  const [expanded, setExpanded] = useState(item.expanded || false)

  const handleClick = () => {
    if (item.type === "folder") {
      setExpanded(!expanded)
    } else {
      onFileSelect(item.name)
    }
  }

  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-1 px-2 py-1 text-sm cursor-pointer hover:bg-accent/50 rounded-sm",
          selectedFile === item.name && "bg-accent text-accent-foreground",
          level > 0 && "ml-4",
        )}
        onClick={handleClick}
      >
        {item.type === "folder" ? (
          <>
            {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            {expanded ? <FolderOpen className="w-4 h-4" /> : <Folder className="w-4 h-4" />}
          </>
        ) : (
          <>
            <div className="w-4" />
            <File className="w-4 h-4" />
          </>
        )}
        <span className="truncate">{item.name}</span>
      </div>
      {item.type === "folder" && expanded && item.children && (
        <div>
          {item.children.map((child: any, index: number) => (
            <FileTreeItem
              key={index}
              item={child}
              level={level + 1}
              onFileSelect={onFileSelect}
              selectedFile={selectedFile}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function CloudIDE() {
  const [selectedFile, setSelectedFile] = useState("WelcomeComponent.tsx")
  const [terminalExpanded, setTerminalExpanded] = useState(true)
  const [aiMessage, setAiMessage] = useState("")

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Top Navigation */}
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

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - File Explorer */}
        <div className="w-64 border-r bg-card flex flex-col">
          <div className="p-3 border-b">
            <h3 className="font-medium text-sm">Explorer</h3>
          </div>
          <div className="flex-1 overflow-auto p-2">
            {fileTree.map((item, index) => (
              <FileTreeItem
                key={index}
                item={item}
                level={0}
                onFileSelect={setSelectedFile}
                selectedFile={selectedFile}
              />
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Tab Bar */}
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

          {/* Code Editor */}
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
                          <span className="text-blue-600 dark:text-blue-400">import</span>{" "}
                          <span className="text-foreground">React, &#123; useState &#125;</span>{" "}
                          <span className="text-blue-600 dark:text-blue-400">from</span>{" "}
                          <span className="text-green-700 dark:text-green-300">"react"</span>;{"\n"}
                          <span className="text-blue-600 dark:text-blue-400">import</span>{" "}
                          <span className="text-foreground">&#123; Button &#125;</span>{" "}
                          <span className="text-blue-600 dark:text-blue-400">from</span>{" "}
                          <span className="text-green-700 dark:text-green-300">"@/components/ui/button"</span>;{"\n"}
                          {"\n"}
                          <span className="text-blue-600 dark:text-blue-400">const</span>{" "}
                          <span className="text-amber-700 dark:text-amber-300">WelcomeComponent</span> ={" "}
                          <span className="text-foreground">() =&gt; &#123;</span>
                          {"\n"}
                          {"  "}
                          <span className="text-blue-600 dark:text-blue-400">const</span>{" "}
                          <span className="text-foreground">[count, setCount] = useState(</span>
                          <span className="text-orange-600 dark:text-orange-400">0</span>
                          <span className="text-foreground">);</span>
                          {"\n"}
                          {"\n"}
                          {"  "}
                          <span className="text-blue-600 dark:text-blue-400">const</span>{" "}
                          <span className="text-amber-700 dark:text-amber-300">handleIncrement</span> ={" "}
                          <span className="text-foreground">() =&gt; &#123;</span>
                          {"\n"}
                          {"    "}
                          <span className="text-foreground">setCount(prev =&gt; prev + </span>
                          <span className="text-orange-600 dark:text-orange-400">1</span>
                          <span className="text-foreground">);</span>
                          {"\n"}
                          {"  "}
                          <span className="text-foreground">&#125;;</span>
                          {"\n"}
                          {"\n"}
                          {"  "}
                          <span className="text-blue-600 dark:text-blue-400">return</span>{" "}
                          <span className="text-foreground">(</span>
                          {"\n"}
                          {"    "}
                          <span className="text-red-600 dark:text-red-400">&lt;div</span>{" "}
                          <span className="text-blue-600 dark:text-blue-400">className</span>=
                          <span className="text-green-700 dark:text-green-300">
                            "p-6 bg-gradient-subtle rounded-lg"
                          </span>
                          <span className="text-red-600 dark:text-red-400">&gt;</span>
                          {"\n"}
                          {"      "}
                          <span className="text-red-600 dark:text-red-400">&lt;h1</span>{" "}
                          <span className="text-blue-600 dark:text-blue-400">className</span>=
                          <span className="text-green-700 dark:text-green-300">"text-2xl font-bold mb-4"</span>
                          <span className="text-red-600 dark:text-red-400">&gt;</span>
                          {"\n"}
                          {"        "}Welcome to CloudIDE! 🚀{"\n"}
                          {"      "}
                          <span className="text-red-600 dark:text-red-400">&lt;/h1&gt;</span>
                          {"\n"}
                          {"\n"}
                          {"      "}
                          <span className="text-red-600 dark:text-red-400">&lt;p</span>{" "}
                          <span className="text-blue-600 dark:text-blue-400">className</span>=
                          <span className="text-green-700 dark:text-green-300">"text-muted-foreground mb-4"</span>
                          <span className="text-red-600 dark:text-red-400">&gt;</span>
                          {"\n"}
                          {"        "}You clicked &#123;count&#125; times{"\n"}
                          {"      "}
                          <span className="text-red-600 dark:text-red-400">&lt;/p&gt;</span>
                          {"\n"}
                          {"\n"}
                          {"      "}
                          <span className="text-red-600 dark:text-red-400">&lt;Button</span>
                          {"\n"}
                          {"        "}
                          <span className="text-blue-600 dark:text-blue-400">onClick</span>=
                          <span className="text-foreground">&#123;handleIncrement&#125;</span>
                          {"\n"}
                          {"      "}
                          <span className="text-red-600 dark:text-red-400">&gt;</span>
                          {"\n"}
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
                    onChange={(e) => setAiMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Terminal */}
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
        </div>
        
      </div>
    </div>
  )
}
