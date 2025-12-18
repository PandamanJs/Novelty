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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-2">
              Projects
            </h1>
            <p className="text-lg text-muted-foreground font-light">
              All your writing in one place
            </p>
          </div>
          <Button
            asChild
            className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/50 text-primary-foreground gap-2 rounded-full font-semibold px-6 py-6 border-0 transition-all duration-300"
          >
            <Link to="/write">
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">New</span>
            </Link>
          </Button>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/10 group-hover:from-primary/30 group-hover:to-secondary/20 transition-all duration-300">
                  <BookOpen className="w-6 h-6 text-foreground" strokeWidth={1.5} />
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                    <Share2 className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                  </button>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-1">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-6">{project.type}</p>

              <div className="space-y-3 mb-6 pb-6 border-b border-border">
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
                <span className="text-xs px-3 py-1 rounded-full bg-secondary text-foreground font-medium">
                  {project.status}
                </span>
                <Link
                  to="/write"
                  className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  Edit →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State Helper */}
        <div className="mt-16 p-12 rounded-2xl border border-border bg-gradient-to-br from-card to-primary/5 text-center">
          <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-6 opacity-30" />
          <h3 className="text-2xl font-semibold text-foreground mb-3">
            Start writing
          </h3>
          <p className="text-muted-foreground mb-8 font-light leading-relaxed max-w-md mx-auto">
            Create a new project and start bringing your ideas to life. Tell me in the chat what you'd like to add next.
          </p>
        </div>
      </div>
    </div>
  );
}
