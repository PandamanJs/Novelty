import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import {
  Bold,
  Italic,
  List,
  Save,
  Clock,
  Eye,
  MoreVertical,
  ChevronLeft,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Write() {
  const [content, setContent] = useState(
    "Once upon a time...\n\nStart writing your story here. This is your blank canvas."
  );
  const [title, setTitle] = useState("Untitled Story");
  const [showStats, setShowStats] = useState(true);

  // Calculate writing stats
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const charCount = content.length;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Top Bar */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-2xl font-bold text-foreground bg-transparent border-0 focus:outline-none w-full"
              placeholder="Untitled Story"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowStats(!showStats)}
              className="text-muted-foreground hover:text-foreground"
            >
              <Eye className="w-4 h-4" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </DropdownMenuItem>
                <DropdownMenuItem>Export as PDF</DropdownMenuItem>
                <DropdownMenuItem>Export as DOCX</DropdownMenuItem>
                <DropdownMenuItem>Share</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <div className="hidden lg:flex flex-col w-64 border-r border-border bg-card p-6 overflow-y-auto">
          <h3 className="font-semibold text-foreground mb-4">Projects</h3>

          <div className="space-y-2 mb-8">
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 cursor-pointer hover:bg-primary/20 transition-colors">
              <p className="font-medium text-sm text-primary">Untitled Story</p>
              <p className="text-xs text-muted-foreground mt-1">Today at 10:30 AM</p>
            </div>

            <div className="p-3 rounded-lg border border-border hover:bg-secondary/10 transition-colors cursor-pointer opacity-50">
              <p className="font-medium text-sm text-foreground">My First Novel</p>
              <p className="text-xs text-muted-foreground mt-1">Yesterday</p>
            </div>

            <div className="p-3 rounded-lg border border-border hover:bg-secondary/10 transition-colors cursor-pointer opacity-50">
              <p className="font-medium text-sm text-foreground">Poetry Collection</p>
              <p className="text-xs text-muted-foreground mt-1">3 days ago</p>
            </div>
          </div>

          <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            + New Project
          </Button>
        </div>

        {/* Main Editor */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Formatting Toolbar */}
          <div className="border-b border-border bg-card px-4 sm:px-6 py-3 flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground hover:bg-secondary/20"
              title="Bold"
            >
              <Bold className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground hover:bg-secondary/20"
              title="Italic"
            >
              <Italic className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground hover:bg-secondary/20"
              title="List"
            >
              <List className="w-4 h-4" />
            </Button>

            <div className="flex-1" />

            <Button
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
            >
              <Save className="w-4 h-4" />
              <span className="hidden sm:inline">Save Draft</span>
            </Button>
          </div>

          {/* Editor Content */}
          <div className="flex-1 flex overflow-hidden">
            {/* Writing Area */}
            <div className="flex-1 overflow-auto p-4 sm:p-8 lg:p-12">
              <div className="max-w-3xl mx-auto h-full">
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Start typing your story here..."
                  className="w-full h-full min-h-[600px] border-0 focus:ring-0 p-0 resize-none text-base leading-relaxed bg-transparent text-foreground placeholder-muted-foreground"
                />
              </div>
            </div>

            {/* Right Stats Panel */}
            {showStats && (
              <div className="hidden md:flex flex-col w-72 border-l border-border bg-card p-6 overflow-y-auto">
                <h3 className="font-semibold text-foreground mb-6">Writing Stats</h3>

                <div className="space-y-6">
                  {/* Word Count */}
                  <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                    <p className="text-sm text-muted-foreground mb-1">Words</p>
                    <p className="text-3xl font-bold text-primary">{wordCount}</p>
                  </div>

                  {/* Character Count */}
                  <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                    <p className="text-sm text-muted-foreground mb-1">Characters</p>
                    <p className="text-3xl font-bold text-accent">{charCount}</p>
                  </div>

                  {/* Reading Time */}
                  <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Est. Reading Time</p>
                    </div>
                    <p className="text-3xl font-bold text-secondary">
                      {readingTime}
                      <span className="text-base ml-1">min</span>
                    </p>
                  </div>

                  {/* Daily Stats */}
                  <div className="border-t border-border pt-6">
                    <p className="font-semibold text-foreground mb-4">Today's Progress</p>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          Words written
                        </p>
                        <p className="text-lg font-semibold text-foreground">
                          {wordCount}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          Writing streak
                        </p>
                        <p className="text-lg font-semibold text-foreground">
                          3 days
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Goals */}
                  <div className="border-t border-border pt-6">
                    <p className="font-semibold text-foreground mb-4">Daily Goal</p>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">
                        {wordCount} / 2000
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {Math.round((wordCount / 2000) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{
                          width: `${Math.min((wordCount / 2000) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
