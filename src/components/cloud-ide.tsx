import { useState } from "react"
import  {Button}  from "../components/ui/button"
import  {Input}  from "../components/ui/Input"
import Navigation from "./ui/navigation"
import CodeEditor from "./ui/codeEditor"
import Terminal from "./ui/terminal"
import FileTree from "./ui/fileTree"






export function CloudIDE() {




  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Top Navigation */}

      <Navigation/>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - File Explorer */}
        <FileTree/>
    

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Tab Bar */}
         

          {/* Code Editor */}
          <CodeEditor/>

          {/* Terminal */}
         <Terminal/>
        </div>

      </div>
    </div>
  )
}
