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
  EyeOff,
  MoreVertical,
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
      <div className="border-b border-border bg-background/50 backdrop-blur-md">
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
              {showStats ? (
                <Eye className="w-4 h-4" />
              ) : (
                <EyeOff className="w-4 h-4" />
              )}
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
        <div className="hidden lg:flex flex-col w-64 border-r border-border bg-background/50 backdrop-blur-md p-6 overflow-y-auto">
          <h3 className="font-semibold text-foreground mb-6 text-sm uppercase tracking-wide opacity-70">
            Projects
          </h3>

          <div className="space-y-2 mb-8">
            <div className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/10 border border-primary/20 cursor-pointer hover:from-primary/30 hover:to-secondary/20 transition-all duration-300">
              <p className="font-medium text-sm text-foreground">Untitled Story</p>
              <p className="text-xs text-muted-foreground mt-1">Today at 10:30 AM</p>
            </div>

            <div className="p-3 rounded-lg border border-border hover:bg-secondary/50 transition-colors cursor-pointer opacity-60">
              <p className="font-medium text-sm text-foreground">My First Novel</p>
              <p className="text-xs text-muted-foreground mt-1">Yesterday</p>
            </div>

            <div className="p-3 rounded-lg border border-border hover:bg-secondary/50 transition-colors cursor-pointer opacity-60">
              <p className="font-medium text-sm text-foreground">Poetry Collection</p>
              <p className="text-xs text-muted-foreground mt-1">3 days ago</p>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full border-muted text-foreground hover:bg-muted/30 hover:border-primary/50 rounded-full font-semibold transition-all duration-300"
          >
            + New Project
          </Button>
        </div>

        {/* Main Editor */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Formatting Toolbar */}
          <div className="border-b border-border bg-background/50 backdrop-blur-md px-4 sm:px-6 py-3 flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              title="Bold"
            >
              <Bold className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              title="Italic"
            >
              <Italic className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              title="List"
            >
              <List className="w-4 h-4" />
            </Button>

            <div className="flex-1" />

            <Button
              size="sm"
              className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/50 text-primary-foreground gap-2 rounded-full font-semibold border-0 transition-all duration-300"
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
              <div className="hidden md:flex flex-col w-80 border-l border-border bg-background/50 backdrop-blur-md p-8 overflow-y-auto">
                <h3 className="font-semibold text-foreground mb-8 text-sm uppercase tracking-wide opacity-70">
                  Statistics
                </h3>

                <div className="space-y-8">
                  {/* Word Count */}
                  <div>
                    <p className="text-sm text-muted-foreground font-medium mb-2">
                      Words
                    </p>
                    <p className="text-4xl font-bold text-foreground">
                      {wordCount}
                    </p>
                  </div>

                  {/* Character Count */}
                  <div>
                    <p className="text-sm text-muted-foreground font-medium mb-2">
                      Characters
                    </p>
                    <p className="text-4xl font-bold text-foreground">
                      {charCount}
                    </p>
                  </div>

                  {/* Reading Time */}
                  <div>
                    <p className="text-sm text-muted-foreground font-medium mb-2">
                      Est. Reading Time
                    </p>
                    <p className="text-4xl font-bold text-foreground">
                      {readingTime}
                      <span className="text-lg ml-2 font-normal">min</span>
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-border" />

                  {/* Daily Stats */}
                  <div>
                    <p className="text-sm text-muted-foreground font-medium mb-4">
                      TODAY'S PROGRESS
                    </p>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Words written</span>
                        <span className="font-medium text-foreground">
                          {wordCount}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Writing streak</span>
                        <span className="font-medium text-foreground">3 days</span>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-border" />

                  {/* Goals */}
                  <div>
                    <p className="text-sm text-muted-foreground font-medium mb-4">
                      DAILY GOAL
                    </p>
                    <div className="flex items-center justify-between mb-3 text-sm">
                      <span className="text-muted-foreground">
                        {wordCount} / 2000
                      </span>
                      <span className="text-muted-foreground">
                        {Math.round((wordCount / 2000) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-1.5">
                      <div
                        className="bg-foreground h-1.5 rounded-full transition-all"
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
