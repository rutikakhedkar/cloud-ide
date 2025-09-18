import React, { useState } from 'react'
import { cn } from '../../utils'
import { ChevronDown, ChevronRight, Folder, FolderOpen } from 'lucide-react'

function FileTree() {
    const [selectedFile, setSelectedFile] = useState("WelcomeComponent.tsx")
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
            {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight  className="w-4 h-4" />}
            {expanded ? <FolderOpen className="w-4 h-4" /> : <Folder className="w-4 h-4" />}
          </>
        ) : (
          <>
            <div className="w-4" />
          
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
  return (
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
  )
}

export default FileTree