import Navigation from "../components/ui/navigation"
import CodeEditor from "../components/ui/codeEditor"
import Terminal from "../components/ui/terminal"
import FileTree from "../components/ui/fileTree"
import EditorBredcrum from "../components/ui/editorBredcrum"
import { useEffect } from "react"
import useUserStore from "../stores/auth-store"


export function CloudIDE() {
  const userInfo = useUserStore((state) => state.userInfo);
  const isLoggedIn=useUserStore((state) => state.isLoggedIn);
  const getUserInfo = useUserStore((state) => state.getUserInfo);

  useEffect(() => {
    getUserInfo(); // fetch data on mount
  }, []);
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
