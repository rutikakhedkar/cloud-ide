import Navigation from "../components/ui/navigation"
import CodeEditor from "../components/ui/codeEditor"
import Terminal from "../components/ui/terminal"
import FileTree from "../components/ui/fileTree"
import EditorBredcrum from "../components/ui/editorBredcrum"






export function CloudIDE() {
  return (
    <div className="h-screen bg-background flex flex-col">
      <Navigation/>
      <div className="flex flex-1 overflow-hidden">
        <FileTree/>
        <div className="flex-1 flex flex-col">
          {/* Tab Bar */}
         <EditorBredcrum/>
          {/* Code Editor */}
          <CodeEditor/>
          {/* Terminal */}
         <Terminal/>
        </div>
      </div>
    </div>
  )
}
