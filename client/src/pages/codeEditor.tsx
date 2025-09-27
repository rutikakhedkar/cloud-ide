import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import {
  Plus,
  ChevronRight,
  ChevronDown,
  File,
  Folder,
  FolderOpen,
  Terminal,
} from "lucide-react";
import axios from "axios";
import useStackStore from "../stores/stack-store";
import { useParams } from "react-router-dom";

export default function CodeEditor() {
  const [selectedFile, setSelectedFile] = useState("README.md");
  const [expandedFolders, setExpandedFolders] = useState<string[]>([
    "src",
    "public",
  ]);
  const [isTerminalExpanded, setIsTerminalExpanded] = useState(true);
  const [fileContent, setFileContent] = useState([]);
  const { getStackInfo, stackInfo } = useStackStore();

  // File tree structure
  const fileTree = [
    { name: "public", type: "folder", children: ["vite.svg", "favicon.ico"] },
    {
      name: "src",
      type: "folder",
      children: ["App.jsx", "App.css", "main.jsx", "index.css"],
    },
    { name: ".gitignore", type: "file" },
    { name: "eslint.config.js", type: "file" },
    { name: "index.html", type: "file" },
    { name: "package-lock.json", type: "file" },
    { name: "package.json", type: "file" },
    { name: "README.md", type: "file" },
    { name: "vite.config.js", type: "file" },
  ];

  const fileContents: { [key: string]: string } = {
    "README.md": `# Vite + React

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh`,
    "App.jsx": `import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo || "/placeholder.svg"} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo || "/placeholder.svg"} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App`,
    "package.json": `{
  "name": "vite-react-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@eslint/js": "^9.9.0",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "eslint": "^9.9.0",
    "eslint-plugin-react": "^7.35.0",
    "eslint-plugin-react-hooks": "^5.1.0-rc.0",
    "eslint-plugin-react-refresh": "^0.4.9",
    "globals": "^15.9.0",
    "vite": "^5.4.1"
  }
}`,
  };

  const toggleFolder = (folderName: string) => {
    setExpandedFolders((prev) =>
      prev.includes(folderName)
        ? prev.filter((f) => f !== folderName)
        : [...prev, folderName]
    );
  };

  const getFileIcon = (fileName: string) => {
    if (fileName.endsWith(".jsx") || fileName.endsWith(".js")) return "📄";
    if (fileName.endsWith(".css")) return "🎨";
    if (fileName.endsWith(".html")) return "🌐";
    if (fileName.endsWith(".json")) return "📋";
    if (fileName.endsWith(".md")) return "📝";
    if (fileName.endsWith(".svg")) return "🖼️";
    if (fileName.endsWith(".ico")) return "🔷";
    return "📄";
  };

  let { stack } = useParams();

  useEffect(() => {
    if (stack) {
      getStackInfo(stack?.toLowerCase());
    }
  }, [getStackInfo]);

  console.log(stackInfo, "stackInfo");

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Top Header */}


      {/* Main Content Area */}
      <div className="flex flex-1 flex-col">
        <div className="flex flex-1">
          {/* Left Sidebar - File Explorer */}
          <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col">
            {/* Project Section */}
            <div className="p-4 border-b border-gray-700">
              <div className="text-xs text-gray-400 uppercase tracking-wide mb-2">
                PROJECT
              </div>
              <button className="flex items-center space-x-2 text-sm text-gray-300 hover:text-white">
                <div className="w-4 h-4">📁</div>
                <span>Create a repository</span>
              </button>
            </div>

            {/* Info and Files Section */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4">
                <div className="text-xs text-gray-400 uppercase tracking-wide mb-2">
                  INFO
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-wide mb-2">
                  FILES
                </div>

                {/* File Tree */}
                <div className="space-y-1">
                  {stackInfo.map((item, index) => (
                    <div key={index}>
                      {item.type === "folder" ? (
                        <div>
                          <button
                            onClick={() => toggleFolder(item.name)}
                            className="flex items-center space-x-2 w-full text-left text-sm text-gray-300 hover:text-white hover:bg-gray-700 px-2 py-1 rounded"
                          >
                            {expandedFolders.includes(item.name) ? (
                              <ChevronDown className="w-3 h-3" />
                            ) : (
                              <ChevronRight className="w-3 h-3" />
                            )}
                            {expandedFolders.includes(item.name) ? (
                              <FolderOpen className="w-4 h-4 text-blue-400" />
                            ) : (
                              <Folder className="w-4 h-4 text-blue-400" />
                            )}
                            <span>{item.name}</span>
                          </button>
                          {expandedFolders.includes(item.name) &&
                            item.children && (
                              <div className="ml-6 space-y-1">
                                {item.children.map((child, childIndex) => (
                                  <button
                                    key={childIndex}
                                    onClick={() => {
                                      setSelectedFile(child.name);
                                      setFileContent(child.content);
                                    }}
                                    className={`flex items-center space-x-2 w-full text-left text-sm px-2 py-1 rounded ${
                                      selectedFile === child
                                        ? "bg-gray-600 text-white"
                                        : "text-gray-300 hover:text-white hover:bg-gray-700"
                                    }`}
                                  >
                                    <File className="w-4 h-4" />
                                    <span>{child.name}</span>
                                  </button>
                                ))}
                              </div>
                            )}
                        </div>
                      ) : (
                        <button
                          onClick={() => setSelectedFile(item.name)}
                          className={`flex items-center space-x-2 w-full text-left text-sm px-2 py-1 rounded ${selectedFile === item.name
                              ? "bg-gray-600 text-white"
                              : "text-gray-300 hover:text-white hover:bg-gray-700"
                            }`}
                        >
                          <File className="w-4 h-4" />
                          <span>{item.name}</span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Middle Section - Code Editor */}
          <div className="flex-1 bg-gray-900 border-r border-gray-700 flex flex-col">
            {/* File Tab */}
            <div className="bg-gray-800 border-b border-gray-700 px-4 py-2 flex items-center">
              <div className="flex items-center space-x-2 bg-gray-700 px-3 py-1 rounded-t text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-white">{selectedFile}</span>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
            </div>

            {/* Code Content */}
            <div className="flex-1 h-64 overflow-y-auto">
              <div className="p-4">
                <div className="flex text-xs text-gray-500 mb-4">
                  {/* Line numbers */}
                  <div className="w-8 text-right pr-4 select-none">
                    {fileContents[selectedFile]?.split("\n").map((_, index) => (
                      <div key={index} className="leading-6">
                        {index + 1}
                      </div>
                    ))}
                  </div>

                  {/* Editor content */}
                  <div className="flex-1">
                    <pre className="text-gray-300 font-mono text-sm leading-6 whitespace-pre-wrap">
                      {fileContents[selectedFile] ||
                        `// ${selectedFile}\n// ${fileContent}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Preview/Output */}
          <div className="flex-1 bg-white flex items-center justify-center">
            <div className="text-center">
              {/* Vite and React Logos */}
              <div className="flex items-center justify-center space-x-8 mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 via-blue-500 to-yellow-500 rounded-lg flex items-center justify-center">
                  <div className="text-white text-4xl font-bold">V</div>
                </div>
                <div className="w-24 h-24 bg-blue-500 rounded-lg flex items-center justify-center">
                  <div className="text-white text-4xl">⚛</div>
                </div>
              </div>

              {/* Main Heading */}
              <h1 className="text-6xl font-bold text-gray-800 mb-8">
                Vite + React
              </h1>

              {/* Counter */}
              <div className="mb-8">
                <p className="text-xl text-gray-600 mb-4">count is 0</p>
                <Button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2">
                  count is 0
                </Button>
              </div>

              {/* Instructions */}
              <div className="text-gray-600 space-y-2">
                <p>
                  Edit{" "}
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                    src/App.jsx
                  </code>{" "}
                  and save to test HMR
                </p>
                <p className="text-sm">
                  Click on the Vite and React logos to learn more
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Terminal Section - Full Width */}
        <div className="border-t border-gray-700 bg-gray-800">
          <button
            onClick={() => setIsTerminalExpanded(!isTerminalExpanded)}
            className="w-full flex items-center justify-between p-3 text-sm text-gray-300 hover:text-white hover:bg-gray-700"
          >
            <div className="flex items-center space-x-2">
              <Terminal className="w-4 h-4" />
              <span>Terminal</span>
            </div>
            <Plus className="w-4 h-4" />
          </button>

          {isTerminalExpanded && (
            <div className="bg-gray-900 p-4 text-sm font-mono">
              <div className="text-green-400 mb-2">
                VITE v7.1.5 ready in 3362 ms
              </div>
              <div className="text-gray-300 mb-1">
                <span className="text-green-400">➜</span> Local:{" "}
                <span className="text-blue-400">http://localhost:5173/</span>
              </div>
              <div className="text-gray-300 mb-1">
                <span className="text-green-400">➜</span> Network: use{" "}
                <span className="text-yellow-400">--host</span> to expose
              </div>
              <div className="text-gray-300">
                <span className="text-green-400">➜</span> press{" "}
                <span className="text-yellow-400">h + enter</span> to show help
              </div>
              <div className="mt-2">
                <span className="text-green-400">❯</span>
                <span className="ml-2 bg-gray-700 w-2 h-4 inline-block animate-pulse"></span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
