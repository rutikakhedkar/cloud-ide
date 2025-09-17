"use client"

import { useState } from "react"
import { ChevronDown, LayoutDashboard, FolderOpen, Bookmark, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DashboardSidebar() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: FolderOpen, label: "Projects", active: false },
    { icon: Bookmark, label: "Collections", active: false },
    { icon: Settings, label: "Settings", active: false },
  ]

  return (
    <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
      {/* User Profile Section */}
      <div className="p-4 border-b border-gray-700">
        <Button
          variant="ghost"
          className="w-full justify-between p-2 h-auto text-left hover:bg-gray-700"
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-semibold text-sm">
              R
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white">rutikahadekar</span>
              <span className="text-xs text-gray-400">Free plan</span>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </Button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Button
                variant="ghost"
                className={`w-full justify-start gap-3 p-3 h-auto ${
                  item.active ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span className="text-sm">{item.label}</span>
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
