"use client"

import { Plus, Eye, GitFork, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

export function DashboardContent() {
  const frameworkIcons = [
    { name: "Angular", color: "bg-red-500", icon: "A" },
    { name: "Next.js", color: "bg-black", icon: "N" },
    { name: "Vue", color: "bg-green-500", icon: "V" },
    { name: "React", color: "bg-blue-500", icon: "R" },
    { name: "Svelte", color: "bg-orange-500", icon: "S" },
    { name: "Vite", color: "bg-purple-500", icon: "V" },
  ]

  const recentProjects = [
    {
      id: 1,
      title: "Vitejs - Vite (duplicated)",
      description: "Next generation frontend tooling. It's fast!",
      views: 1,
      forks: 0,
      updated: "less than a minute ago",
      icon: "V",
      iconColor: "bg-blue-500",
    },
  ]

  return (
    <div className="flex-1 p-8 overflow-auto">
      {/* New Project Section */}
      <div className="mb-12">
        <Card className="bg-gray-800 border-gray-700 p-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center">
              <Plus className="w-8 h-8 text-gray-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">New project</h2>
              <p className="text-gray-400 text-sm">from one of StackBlitz starter templates</p>
            </div>

            {/* Framework Icons Grid */}
            <div className="grid grid-cols-6 gap-4 mt-6">
              {frameworkIcons.map((framework, index) => (
                <Button key={index} variant="ghost" className="w-12 h-12 p-0 hover:bg-gray-700">
                  <div
                    className={`w-8 h-8 ${framework.color} rounded flex items-center justify-center text-white font-bold text-sm`}
                  >
                    {framework.icon}
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Projects Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Recent projects</h3>
          <Button variant="ghost" className="text-gray-400 hover:text-white text-sm">
            Show all →
          </Button>
        </div>

        {/* Projects Table */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-700 text-sm text-gray-400">
            <div className="col-span-1">
              <Checkbox />
            </div>
            <div className="col-span-4">Title</div>
            <div className="col-span-3">Description</div>
            <div className="col-span-1 text-center">Views</div>
            <div className="col-span-1 text-center">Forks</div>
            <div className="col-span-2">Updated</div>
          </div>

          {/* Project Rows */}
          {recentProjects.map((project) => (
            <div key={project.id} className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-700 transition-colors">
              <div className="col-span-1">
                <Checkbox />
              </div>
              <div className="col-span-4 flex items-center gap-3">
                <div
                  className={`w-6 h-6 ${project.iconColor} rounded flex items-center justify-center text-white font-bold text-xs`}
                >
                  {project.icon}
                </div>
                <span className="text-white font-medium">{project.title}</span>
              </div>
              <div className="col-span-3">
                <span className="text-gray-400 text-sm">{project.description}</span>
              </div>
              <div className="col-span-1 text-center flex items-center justify-center gap-1">
                <Eye className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400 text-sm">{project.views}</span>
              </div>
              <div className="col-span-1 text-center flex items-center justify-center gap-1">
                <GitFork className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400 text-sm">{project.forks}</span>
              </div>
              <div className="col-span-1 flex items-center justify-between">
                <span className="text-gray-400 text-sm">{project.updated}</span>
                <Button variant="ghost" size="sm" className="p-1 h-auto">
                  <MoreHorizontal className="w-4 h-4 text-gray-400" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
