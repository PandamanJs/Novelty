import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, Plus, Trash2, Share2, Clock } from "lucide-react";

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: "Untitled Story",
      type: "Short Story",
      words: 1250,
      lastEdited: "Today at 10:30 AM",
      status: "In Progress",
    },
    {
      id: 2,
      title: "My First Novel",
      type: "Novel",
      words: 45000,
      lastEdited: "Yesterday",
      status: "Draft",
    },
    {
      id: 3,
      title: "Poetry Collection",
      type: "Poetry",
      words: 3200,
      lastEdited: "3 days ago",
      status: "Draft",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
              Your Projects
            </h1>
            <p className="text-muted-foreground">
              Manage all your writing projects in one place
            </p>
          </div>
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
            <Link to="/write">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">New Project</span>
            </Link>
          </Button>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-card border border-border rounded-lg p-6 hover:border-primary/30 hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 hover:bg-secondary/20 rounded-lg transition-colors">
                    <Share2 className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button className="p-2 hover:bg-destructive/20 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                  </button>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-2">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">{project.type}</p>

              <div className="space-y-2 mb-4 pb-4 border-b border-border">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Word Count</span>
                  <span className="font-medium text-foreground">
                    {project.words.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {project.lastEdited}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                  {project.status}
                </span>
                <Link
                  to="/write"
                  className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Edit →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State Helper */}
        <div className="mt-12 p-8 rounded-lg border border-border bg-card text-center">
          <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Want more projects?
          </h3>
          <p className="text-muted-foreground mb-4">
            Start a new writing project by clicking the "New Project" button above, or continue customizing the app by prompting in the chat!
          </p>
        </div>
      </div>
    </div>
  );
}
