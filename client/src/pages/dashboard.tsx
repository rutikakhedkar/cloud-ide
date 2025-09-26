import { useState } from "react";
import { Button } from "../components/ui/button";
import { Plus, Eye, GitFork, X } from "lucide-react";
import Navigation from "../components/ui/navigation";
import { useNavigate } from "react-router-dom";

// Tech stack data
const techStacks = {
  Popular: [
    { name: "React", subtitle: "TypeScript", icon: "⚛", color: "bg-blue-500" },
    { name: "Angular", subtitle: "TypeScript", icon: "A", color: "bg-red-500" },
    { name: "Vue", subtitle: "JavaScript", icon: "V", color: "bg-green-400" },
  ],
};

export default function Dashboard() {
  const naivgation = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Popular");

  const tabs = [
    "Popular",
  ];

  const showStack = (stack: string) => {
    naivgation(`/codeeditor/${stack}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 border-r border-gray-700">
        {/* User Profile */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-sm font-semibold text-black">
              R
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">rutikakhadekar</div>
              <div className="text-xs text-gray-400">Free plan</div>
            </div>
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          <div className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-md cursor-pointer">
            <div className="w-4 h-4 border border-gray-500 rounded"></div>
            <span>Dashboard</span>
          </div>
          <div className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-md cursor-pointer">
            <div className="w-4 h-4 flex items-center justify-center">
              <div className="w-2 h-2 bg-gray-500 rounded-sm"></div>
            </div>
            <span>Projects</span>
          </div>
          <div className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-md cursor-pointer">
            <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
              <div className="w-1.5 h-1.5 bg-gray-500 rounded-sm"></div>
              <div className="w-1.5 h-1.5 bg-gray-500 rounded-sm"></div>
              <div className="w-1.5 h-1.5 bg-gray-500 rounded-sm"></div>
              <div className="w-1.5 h-1.5 bg-gray-500 rounded-sm"></div>
            </div>
            <span>Collections</span>
          </div>
          <div className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-md cursor-pointer">
            <div className="w-4 h-4 flex items-center justify-center">
              <div className="w-3 h-3 border border-gray-500 rounded-full"></div>
            </div>
            <span>Settings</span>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header with New Project Button */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-gray-700 hover:bg-gray-600 text-white border border-gray-600 flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <div className="text-left">
                <div className="text-sm font-medium">New project</div>
                <div className="text-xs text-gray-400">
                  from one of StackBlitz starter templates
                </div>
              </div>
            </Button>
          </div>
        </div>

        {/* Recent Projects Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent projects</h2>
            <button className="text-sm text-gray-400 hover:text-white flex items-center space-x-1">
              <span>Show all</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Projects Table */}
          <div className="bg-gray-800 rounded-lg border border-gray-700">
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-700 text-sm text-gray-400">
              <div className="col-span-1"></div>
              <div className="col-span-4">Title</div>
              <div className="col-span-4">Description</div>
              <div className="col-span-1">Views</div>
              <div className="col-span-1">Forks</div>
              <div className="col-span-1">Updated</div>
            </div>

            <div className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-750 items-center">
              <div className="col-span-1">
                <input
                  type="checkbox"
                  className="w-4 h-4 bg-gray-700 border-gray-600 rounded"
                />
              </div>
              <div className="col-span-4 flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center text-white text-xs">
                  ⚡
                </div>
                <span
                  className="text-white cursor-pointer"
                  onClick={() => naivgation("/codeeditor")}
                >
                  Vitejs - Vite (duplicated)
                </span>
              </div>
              <div className="col-span-4 text-gray-400">
                Next generation frontend tooling. It's fast!
              </div>
              <div className="col-span-1 flex items-center space-x-1 text-gray-400">
                <Eye className="w-4 h-4" />
                <span>1</span>
              </div>
              <div className="col-span-1 flex items-center space-x-1 text-gray-400">
                <GitFork className="w-4 h-4" />
                <span>0</span>
              </div>
              <div className="col-span-1 text-gray-400 text-sm">5 days ago</div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg w-full max-w-4xl max-h-[80vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div className="flex items-center space-x-3">
                <span className="text-gray-400">Add to</span>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-black text-sm font-bold">
                    R
                  </div>
                  <span className="text-white font-medium">rutikakhadekar</span>
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="border-b border-gray-700">
              <div className="flex overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={(e) => {
                      e.stopPropagation(); // ✅ prevent bubbling
                      setActiveTab(tab);
                    }}
                    className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 ${
                      activeTab === tab
                        ? "border-green-500 text-green-500"
                        : "border-transparent text-gray-400 hover:text-white"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-96">
              <div className="grid grid-cols-3 gap-4">
                {(
                  techStacks[activeTab as keyof typeof techStacks] ||
                  techStacks.Popular
                ).map((stack, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 cursor-pointer transition-colors"
                    onClick={()=>{showStack(stack.name)}}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-10 h-10 ${stack.color} rounded flex items-center justify-center text-white font-bold`}
                      >
                        {stack.icon}
                      </div>
                      <div >
                        <div className="text-white font-medium">
                          {stack.name}
                        </div>
                        <div className="text-gray-400 text-sm">
                          {stack.subtitle}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
