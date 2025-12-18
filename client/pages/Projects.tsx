import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, Plus, Clock } from "lucide-react";
import { useState } from "react";

interface Project {
  id: number;
  title: string;
  type: "Novel" | "Short Story" | "Poetry" | "Blog" | "Journal";
  words: number;
  lastEdited: string;
  status: "In Progress" | "Draft" | "Published";
  excerpt?: string;
  tags?: string[];
  genre?: string;
  progress?: number;
}

export default function Projects() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedGenre, setSelectedGenre] = useState<string>("All");

  const projects: Project[] = [
    {
      id: 1,
      title: "The Starlit Journey",
      type: "Novel",
      words: 45000,
      lastEdited: "Today at 10:30 AM",
      status: "In Progress",
      genre: "Sci-Fi",
      tags: ["Adventure", "Space"],
      excerpt: "A tale of discovery across the cosmos...",
      progress: 65,
    },
    {
      id: 2,
      title: "Midnight Whispers",
      type: "Short Story",
      words: 8500,
      lastEdited: "Yesterday",
      status: "Published",
      genre: "Mystery",
      tags: ["Thriller", "Dark"],
      excerpt: "Secrets have a way of surfacing...",
    },
    {
      id: 3,
      title: "Garden of Memories",
      type: "Poetry",
      words: 3200,
      lastEdited: "3 days ago",
      status: "Draft",
      genre: "Literary",
      tags: ["Romance", "Emotional"],
      excerpt: "A collection of poetic reflections...",
      progress: 40,
    },
    {
      id: 4,
      title: "Digital Chronicles",
      type: "Blog",
      words: 12500,
      lastEdited: "Today",
      status: "Published",
      genre: "Technology",
      tags: ["Writing", "Tech"],
      excerpt: "Thoughts on the digital age...",
    },
  ];

  const genres = ["All", "Sci-Fi", "Mystery", "Literary", "Technology", "Romance"];
  const filteredProjects = selectedGenre === "All" ? projects : projects.filter((p) => p.genre === selectedGenre);

  return (
    <div className="min-h-screen bg-white text-black pt-16">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header - Apple minimal */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-5xl sm:text-6xl font-bold text-black mb-2">Your Projects</h1>
              <p className="text-lg text-gray-600 font-normal">
                {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"}
              </p>
            </div>
            <Button
              asChild
              className="btn-apple px-6 py-2.5 rounded-full font-medium text-sm gap-2"
            >
              <Link to="/write">
                <Plus className="w-4 h-4" />
                New Project
              </Link>
            </Button>
          </div>

          {/* Genre Filter - Apple minimal */}
          <div className="flex gap-2 flex-wrap pb-6 border-b border-gray-200">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedGenre === genre
                    ? "bg-blue-50 text-blue-600 border border-blue-200"
                    : "bg-gray-100 text-gray-600 hover:text-black hover:bg-gray-200"
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* View Modes - Apple minimal */}
        <div className="flex gap-2 mb-8 border-b border-gray-200 pb-4">
          <button
            onClick={() => setViewMode("grid")}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              viewMode === "grid"
                ? "text-black bg-gray-100"
                : "text-gray-600 hover:text-black hover:bg-gray-50"
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              viewMode === "list"
                ? "text-black bg-gray-100"
                : "text-gray-600 hover:text-black hover:bg-gray-50"
            }`}
          >
            List
          </button>
        </div>

        {/* Grid View - Apple card design */}
        {viewMode === "grid" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="group card-apple hover:shadow-lg hover:border-gray-300 transition-all duration-300 overflow-hidden fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Link to="/write" className="block">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors">
                      <BookOpen className="w-5 h-5 text-blue-600" strokeWidth={1.5} />
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      project.status === "Published"
                        ? "bg-green-50 text-green-700"
                        : project.status === "In Progress"
                        ? "bg-blue-50 text-blue-700"
                        : "bg-gray-100 text-gray-700"
                    }`}>
                      {project.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-black mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {project.excerpt}
                  </p>

                  {/* Progress bar */}
                  {project.progress && (
                    <div className="mb-4">
                      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{project.progress}% complete</p>
                    </div>
                  )}

                  {/* Metadata */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{project.words.toLocaleString()} words</span>
                    </div>
                    <span className="text-xs text-gray-500">{project.lastEdited}</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* List View - Apple minimal */}
        {viewMode === "list" && (
          <div className="space-y-2">
            {filteredProjects.map((project, index) => (
              <Link
                key={project.id}
                to="/write"
                className="card-apple hover:shadow-md hover:border-gray-300 transition-all duration-300 p-4 flex items-center justify-between group fade-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="p-2.5 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors flex-shrink-0">
                    <BookOpen className="w-4 h-4 text-blue-600" strokeWidth={1.5} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-semibold text-black group-hover:text-blue-600 transition-colors mb-1">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-600">{project.excerpt}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 flex-shrink-0 ml-4">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap ${
                    project.status === "Published"
                      ? "bg-green-50 text-green-700"
                      : project.status === "In Progress"
                      ? "bg-blue-50 text-blue-700"
                      : "bg-gray-100 text-gray-700"
                  }`}>
                    {project.status}
                  </span>
                  <span className="text-sm text-gray-600 whitespace-nowrap">{project.words.toLocaleString()} words</span>
                  <span className="text-sm text-gray-500 whitespace-nowrap">{project.lastEdited}</span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-6" strokeWidth={1} />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects yet</h3>
            <p className="text-gray-600 mb-8">Start creating your first project</p>
            <Button
              asChild
              className="btn-apple px-6 py-2.5 rounded-full font-medium"
            >
              <Link to="/write">Create Project</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
