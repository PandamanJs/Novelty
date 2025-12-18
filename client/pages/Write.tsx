import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import {
  Bold,
  Italic,
  List,
  Save,
  Eye,
  EyeOff,
  MoreVertical,
  Focus,
  FolderOpen,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { WritingTimer } from "@/components/WritingTimer";
import { WritingPrompt } from "@/components/WritingPrompt";
import { ExportMenu } from "@/components/ExportMenu";
import { DraftManager, useDrafts, Draft } from "@/components/DraftManager";
import { OutlineBuilder } from "@/components/OutlineBuilder";
import { CharacterBuilder } from "@/components/CharacterBuilder";
import { WritingGoals } from "@/components/WritingGoals";
import { toast } from "sonner";

export default function Write() {
  const [content, setContent] = useState(
    "Once upon a time...\n\nStart writing your story here. This is your blank canvas.",
  );
  const [title, setTitle] = useState("Untitled Story");
  const [showStats, setShowStats] = useState(true);
  const [focusMode, setFocusMode] = useState(false);
  const [showDrafts, setShowDrafts] = useState(false);
  const { drafts, saveDraft, deleteDraft, loadDraft } = useDrafts();

  // Auto-save drafts every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (content.trim()) {
        saveDraft(title, content);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [content, title]);

  // Calculate writing stats
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const charCount = content.length;
  const readingTime = Math.ceil(wordCount / 200);

  const handleLoadDraft = (draft: Draft) => {
    setTitle(draft.title);
    setContent(draft.content);
    setShowDrafts(false);
    toast.success(`Loaded: ${draft.title}`);
  };

  const handleInsertPrompt = (prompt: string) => {
    const newContent = content + (content.endsWith("\n") ? "" : "\n\n") + `[Prompt: ${prompt}]\n`;
    setContent(newContent);
  };

  if (focusMode) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="border-b border-border bg-background/50 backdrop-blur-md px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFocusMode(false)}
              className="gap-2"
            >
              <Focus className="w-4 h-4" />
              Exit Focus Mode
            </Button>
            <span className="text-sm text-muted-foreground">
              {wordCount} words
            </span>
          </div>
          <WritingTimer />
        </div>
        <div className="flex-1 overflow-auto p-8 lg:p-12">
          <div className="max-w-3xl mx-auto h-full">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-2xl font-bold text-foreground bg-transparent border-0 focus:outline-none w-full mb-6"
              placeholder="Untitled Story"
            />
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start typing your story here..."
              className="w-full h-full min-h-[600px] border-0 focus:ring-0 p-0 resize-none text-base leading-relaxed bg-transparent text-foreground placeholder-muted-foreground"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col relative z-10">
      <Header />

      {/* Animated background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-blue-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-tr from-blue-500/8 to-cyan-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      </div>

      {/* Top Bar */}
      <div className="border-b border-border bg-background/50 backdrop-blur-md relative z-20">
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

          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowStats(!showStats)}
              className="text-muted-foreground hover:text-foreground"
              title="Toggle stats"
            >
              {showStats ? (
                <Eye className="w-4 h-4" />
              ) : (
                <EyeOff className="w-4 h-4" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFocusMode(true)}
              className="text-muted-foreground hover:text-foreground gap-2"
              title="Focus mode"
            >
              <Focus className="w-4 h-4" />
              <span className="hidden sm:inline">Focus</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" title="More options">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => saveDraft(title, content)}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Draft
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Drafts */}
        {showDrafts && (
          <div className="lg:flex flex-col w-64 border-r border-border/50 glass-effect-sm p-6 overflow-y-auto">
            <h3 className="font-semibold text-foreground mb-6 text-sm uppercase tracking-wide opacity-70">
              Saved Drafts
            </h3>
            <DraftManager
              drafts={drafts}
              onLoad={handleLoadDraft}
              onDelete={deleteDraft}
            />
          </div>
        )}

        {!showDrafts && (
          <div className="hidden lg:flex flex-col w-64 border-r border-border/50 glass-effect-sm p-6 overflow-y-auto">
            <h3 className="font-semibold text-foreground mb-6 text-sm uppercase tracking-wide opacity-70">
              Writing Tips
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <p className="font-medium text-foreground mb-2">Focus Mode</p>
                <p className="text-xs">Hide distractions and concentrate on your writing.</p>
              </div>
              <div>
                <p className="font-medium text-foreground mb-2">Writing Timer</p>
                <p className="text-xs">Use Pomodoro technique: 25 min focus + 5 min break.</p>
              </div>
              <div>
                <p className="font-medium text-foreground mb-2">Export Options</p>
                <p className="text-xs">Save your work as TXT, Markdown, or HTML.</p>
              </div>
              <div>
                <p className="font-medium text-foreground mb-2">Auto-Save</p>
                <p className="text-xs">Drafts are saved automatically every 30 seconds.</p>
              </div>
            </div>
          </div>
        )}

        {/* Main Editor */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Formatting Toolbar */}
          <div className="border-b border-border bg-background/50 backdrop-blur-md px-4 sm:px-6 py-3 flex items-center gap-2 flex-wrap">
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

            <div className="h-6 border-l border-border/30 mx-1" />

            <WritingTimer />
            <WritingPrompt onInsert={handleInsertPrompt} />
            <OutlineBuilder />
            <CharacterBuilder />
            <WritingGoals wordCount={wordCount} />
            <ExportMenu title={title} content={content} />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDrafts(!showDrafts)}
              className="text-muted-foreground hover:text-foreground gap-2"
              title="Drafts"
            >
              <FolderOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Drafts</span>
            </Button>

            <div className="flex-1" />

            <Button
              size="sm"
              onClick={() => saveDraft(title, content)}
              className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white gap-2 rounded-lg font-semibold border-0 transition-all duration-300"
            >
              <Save className="w-4 h-4" />
              <span className="hidden sm:inline">Save</span>
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
              <div className="hidden md:flex flex-col w-80 border-l border-border bg-background/50 backdrop-blur-md p-8 overflow-y-auto slide-in-right">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-semibold text-foreground text-sm uppercase tracking-wide opacity-70">
                    Statistics
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowStats(false)}
                    className="h-6 w-6 p-0 hover:bg-secondary/30"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-8">
                  {/* Word Count */}
                  <div className="fade-in-up stagger-1">
                    <p className="text-sm text-muted-foreground font-medium mb-2">
                      Words
                    </p>
                    <p className="text-4xl font-bold text-foreground glow-pulse">
                      {wordCount}
                    </p>
                  </div>

                  {/* Character Count */}
                  <div className="fade-in-up stagger-2">
                    <p className="text-sm text-muted-foreground font-medium mb-2">
                      Characters
                    </p>
                    <p className="text-4xl font-bold text-foreground glow-pulse">
                      {charCount}
                    </p>
                  </div>

                  {/* Reading Time */}
                  <div className="fade-in-up stagger-3">
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
                        <span className="text-muted-foreground">
                          Words written
                        </span>
                        <span className="font-medium text-foreground">
                          {wordCount}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Writing streak
                        </span>
                        <span className="font-medium text-foreground">
                          3 days
                        </span>
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
