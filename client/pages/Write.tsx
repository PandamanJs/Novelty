import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import {
  Save,
  Eye,
  EyeOff,
  MoreVertical,
  Focus,
  FolderOpen,
  X,
  BookOpen,
  BookMarked,
  Users,
  Zap,
  MapPin,
  Target,
  Flame,
  Clock,
  Sparkles,
  Download,
  Tag,
  Image as ImageIcon,
  Search,
  BarChart3,
  Palette,
  Settings,
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
import { LocationBuilder } from "@/components/LocationBuilder";
import { ScenePlanner } from "@/components/ScenePlanner";
import { WritingStreak } from "@/components/WritingStreak";
import { PlotHoleChecker } from "@/components/PlotHoleChecker";
import { CharacterArcTracker } from "@/components/CharacterArcTracker";
import { SEOPanel } from "@/components/SEOPanel";
import { ReadabilityAnalyzer } from "@/components/ReadabilityAnalyzer";
import { PublishingPanel } from "@/components/PublishingPanel";
import { TagsManager } from "@/components/TagsManager";
import { CoverImageManager } from "@/components/CoverImageManager";
import { AnalyticsPanel } from "@/components/AnalyticsPanel";
import { AIWritingAssistant } from "@/components/AIWritingAssistant";
import { PlotAssistant } from "@/components/PlotAssistant";
import { ContextAwareRewriter } from "@/components/ContextAwareRewriter";
import { useStoryStructure, SceneStatusBadge, SceneStatusSelector } from "@/components/StoryStructure";
import { ChapterSceneManager } from "@/components/ChapterSceneManager";
import { RichTextEditor } from "@/components/RichTextEditor";
import { StoryTimeline, StoryMap } from "@/components/StoryTimeline";
import { CollapsibleSection } from "@/components/CollapsibleSection";
import { toast } from "sonner";

type BackgroundStyle = 'white' | 'cream' | 'light-gray' | 'dark' | 'gradient-blue' | 'gradient-purple';

const backgroundStyles: Record<BackgroundStyle, { bg: string; accent: string; label: string }> = {
  'white': { bg: 'bg-white', accent: 'text-black', label: 'White' },
  'cream': { bg: 'bg-amber-50', accent: 'text-amber-900', label: 'Cream' },
  'light-gray': { bg: 'bg-slate-50', accent: 'text-slate-900', label: 'Gray' },
  'dark': { bg: 'bg-slate-900', accent: 'text-white', label: 'Dark' },
  'gradient-blue': { bg: 'bg-gradient-to-br from-blue-50 to-indigo-50', accent: 'text-blue-900', label: 'Blue' },
  'gradient-purple': { bg: 'bg-gradient-to-br from-purple-50 to-pink-50', accent: 'text-purple-900', label: 'Purple' },
};

export default function Write() {
  const [content, setContent] = useState(
    "Once upon a time...\n\nStart writing your story here. This is your blank canvas.",
  );
  const [title, setTitle] = useState("Untitled Story");
  const [showStats, setShowStats] = useState(true);
  const [focusMode, setFocusMode] = useState(false);
  const [showDrafts, setShowDrafts] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [background, setBackground] = useState<BackgroundStyle>('white');
  const [showBackgroundMenu, setShowBackgroundMenu] = useState(false);
  const [selectedSceneId, setSelectedSceneId] = useState<string | null>(null);
  const [showTimeline, setShowTimeline] = useState(false);
  const [showStoryMap, setShowStoryMap] = useState(false);
  const [sidebarTab, setSidebarTab] = useState<'writing' | 'characters' | 'publish' | 'settings'>('writing');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    planning: true,
    tools: true,
    progress: true,
    story: true,
    ai: true,
  });
  const { drafts, saveDraft, deleteDraft, loadDraft } = useDrafts();
  const { structure, addScene, deleteScene, updateScene, updateSceneStatus } = useStoryStructure();

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

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
  const paragraphs = content.split('\n\n').filter(p => p.trim()).length;

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

  // Focus Mode
  if (focusMode) {
    return (
      <div className={`min-h-screen flex flex-col pt-16 ${backgroundStyles[background].bg}`}>
        <Header />
        <div className="border-b border-gray-200 bg-white/50 backdrop-blur-md px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFocusMode(false)}
              className="gap-2"
            >
              <Focus className="w-4 h-4" />
              Exit Focus
            </Button>
            <span className="text-sm text-gray-600">
              {wordCount} words · {readingTime} min read
            </span>
          </div>
          <WritingTimer />
        </div>
        <div className="flex-1 overflow-auto p-8 lg:p-16">
          <div className="max-w-4xl mx-auto h-full">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`text-4xl font-bold bg-transparent border-0 focus:outline-none w-full mb-8 ${backgroundStyles[background].accent}`}
              placeholder="Untitled Story"
            />
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start typing your story here..."
              className={`w-full h-full min-h-[600px] border-0 focus:ring-0 p-0 resize-none text-lg leading-relaxed bg-transparent ${backgroundStyles[background].accent} placeholder-gray-400`}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col pt-16 ${backgroundStyles[background].bg}`}>
      <Header />

      {/* Premium Top Bar */}
      <div className="border-b border-gray-200 bg-white/80 backdrop-blur-lg sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-xl font-bold text-black bg-transparent border-0 focus:outline-none w-full"
              placeholder="Untitled Story"
            />
          </div>

          <div className="flex items-center gap-1 flex-wrap justify-end">
            {showStats && (
              <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-full bg-gray-100 text-sm text-gray-600">
                <span>{wordCount} words</span>
                <span>•</span>
                <span>{readingTime} min</span>
                <span>•</span>
                <span>{paragraphs} ¶</span>
              </div>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowStats(!showStats)}
              className="text-gray-600 hover:text-black"
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
              className="text-gray-600 hover:text-black gap-2 hidden sm:flex"
            >
              <Focus className="w-4 h-4" />
              Focus
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-black">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => saveDraft(title, content)}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Draft
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSidebarOpen(!sidebarOpen)}>
                  {sidebarOpen ? <X className="w-4 h-4 mr-2" /> : <Settings className="w-4 h-4 mr-2" />}
                  {sidebarOpen ? 'Hide' : 'Show'} Tools
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Sidebar - Premium Tools Panel */}
        {sidebarOpen && (
          <div className="w-80 border-r border-gray-200 bg-white/60 backdrop-blur-md overflow-hidden flex flex-col shadow-sm">
            {/* Sidebar Header */}
            <div className="border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center justify-between p-4 pb-0">
                <h3 className="font-bold text-sm text-black">Writer's Studio</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(false)}
                  className="h-6 w-6 p-0 text-gray-600 hover:text-black"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Tab Navigation */}
              <div className="flex border-t border-gray-200 bg-gray-50">
                <button
                  onClick={() => setSidebarTab('writing')}
                  className={`flex-1 px-4 py-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 relative ${
                    sidebarTab === 'writing'
                      ? 'border-blue-500 text-blue-700 bg-white shadow-sm'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  title="Writing tools and drafts"
                >
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-lg">✍️</span>
                    <span className="hidden sm:inline">Write</span>
                  </div>
                </button>
                <button
                  onClick={() => setSidebarTab('characters')}
                  className={`flex-1 px-4 py-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 relative ${
                    sidebarTab === 'characters'
                      ? 'border-cyan-500 text-cyan-700 bg-white shadow-sm'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  title="Characters, locations, and world building"
                >
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-lg">🎭</span>
                    <span className="hidden sm:inline">People</span>
                  </div>
                </button>
                <button
                  onClick={() => setSidebarTab('publish')}
                  className={`flex-1 px-4 py-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 relative ${
                    sidebarTab === 'publish'
                      ? 'border-green-500 text-green-700 bg-white shadow-sm'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  title="Export and publishing options"
                >
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-lg">📢</span>
                    <span className="hidden sm:inline">Publish</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Background Selector - Only on Writing Tab */}
            {sidebarTab === 'writing' && (
            <div className="border-b border-gray-200 p-4">
              <button
                onClick={() => setShowBackgroundMenu(!showBackgroundMenu)}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors group"
              >
                <Palette className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-black flex-1">Background Theme</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                  {backgroundStyles[background].label}
                </span>
              </button>

              {showBackgroundMenu && (
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {Object.entries(backgroundStyles).map(([key, { bg, label }]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setBackground(key as BackgroundStyle);
                        setShowBackgroundMenu(false);
                      }}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        background === key
                          ? 'border-blue-500 ring-2 ring-blue-200'
                          : 'border-gray-200 hover:border-gray-300'
                      } ${bg}`}
                      title={label}
                    />
                  ))}
                </div>
              )}
            </div>
            )}

            {/* Scrollable Tools */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {/* WRITING TAB CONTENT */}
              {sidebarTab === 'writing' && (
                <>
                  {/* Quick Stats Bar */}
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg p-3 text-white">
                    <div className="text-xs font-bold mb-2">Progress</div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <div className="text-lg font-bold">{wordCount}</div>
                        <div className="opacity-90">words</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold">{readingTime}</div>
                        <div className="opacity-90">min read</div>
                      </div>
                    </div>
                  </div>

                  {/* Essential Tools */}
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-gray-900 uppercase tracking-wide opacity-60 px-1 pt-1">
                      ⚡ Essential
                    </p>
                    <ToolCard icon={<Clock className="w-4 h-4" />} color="blue" label="Writing Timer">
                      <WritingTimer />
                    </ToolCard>
                    <ToolCard icon={<Sparkles className="w-4 h-4" />} color="yellow" label="Writing Prompts">
                      <WritingPrompt onInsert={handleInsertPrompt} />
                    </ToolCard>
                  </div>

                  {/* Story Organization */}
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-gray-900 uppercase tracking-wide opacity-60 px-1 pt-1">
                      📚 Story Organization
                    </p>
                    <ToolCard icon={<FolderOpen className="w-4 h-4" />} color="blue" label="Drafts">
                      <button onClick={() => setShowDrafts(!showDrafts)} className="w-full text-left text-sm text-gray-600 hover:text-black transition">
                        {drafts.length} saved drafts
                      </button>
                    </ToolCard>
                    <ToolCard icon={<BookOpen className="w-4 h-4" />} color="purple" label="Outline">
                      <OutlineBuilder />
                    </ToolCard>
                    <ToolCard icon={<BookMarked className="w-4 h-4" />} color="amber" label="Scenes">
                      <ScenePlanner />
                    </ToolCard>
                    <ToolCard icon={<BookOpen className="w-4 h-4" />} color="indigo" label="Timeline">
                      <button onClick={() => setShowTimeline(!showTimeline)} className="w-full text-left text-xs px-3 py-2 rounded-lg hover:bg-indigo-50 transition font-medium text-indigo-700 bg-indigo-50 border border-indigo-200">
                        {showTimeline ? '▼ Timeline View' : '▶ Timeline View'}
                      </button>
                    </ToolCard>
                  </div>

                  {/* Quality & Analysis */}
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-gray-900 uppercase tracking-wide opacity-60 px-1 pt-1">
                      🔍 Quality
                    </p>
                    <ToolCard icon={<BookOpen className="w-4 h-4" />} color="indigo" label="Plot Checker">
                      <PlotHoleChecker />
                    </ToolCard>
                    <ToolCard icon={<BarChart3 className="w-4 h-4" />} color="purple" label="Readability">
                      <ReadabilityAnalyzer content={content} />
                    </ToolCard>
                  </div>

                  {/* Progress */}
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-gray-900 uppercase tracking-wide opacity-60 px-1 pt-1">
                      📊 Goals & Motivation
                    </p>
                    <ToolCard icon={<Target className="w-4 h-4" />} color="teal" label="Writing Goals">
                      <WritingGoals wordCount={wordCount} />
                    </ToolCard>
                    <ToolCard icon={<Flame className="w-4 h-4" />} color="orange" label="Writing Streak">
                      <WritingStreak wordCount={wordCount} />
                    </ToolCard>
                  </div>

                  {/* AI Powered */}
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-gray-900 uppercase tracking-wide opacity-60 px-1 pt-1">
                      🤖 AI Powered
                    </p>
                    <ToolCard icon={<Sparkles className="w-4 h-4" />} color="blue" label="AI Assistant">
                      <AIWritingAssistant content={content} title={title} />
                    </ToolCard>
                    <ToolCard icon={<BookOpen className="w-4 h-4" />} color="indigo" label="Plot & Character">
                      <PlotAssistant wordCount={wordCount} />
                    </ToolCard>
                    <ToolCard icon={<Sparkles className="w-4 h-4" />} color="purple" label="Rewrite & Enhance">
                      <ContextAwareRewriter content={content} />
                    </ToolCard>
                  </div>

                  {/* Recent Drafts */}
                  {showDrafts && drafts.length > 0 && (
                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-xs font-bold text-gray-900 uppercase tracking-wide opacity-60 px-1 mb-2">
                        📄 Recent Drafts
                      </p>
                      <div className="space-y-1 max-h-48 overflow-y-auto">
                        {drafts.slice(0, 5).map((draft) => (
                          <div
                            key={draft.id}
                            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 cursor-pointer transition-colors text-xs"
                            onClick={() => handleLoadDraft(draft)}
                          >
                            <p className="font-medium text-gray-900 truncate">{draft.title}</p>
                            <p className="text-gray-500 text-xs">
                              {draft.content.split(/\s+/).length} words
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>\n              )}\n\n              {/* CHARACTERS TAB CONTENT */}\n              {sidebarTab === 'characters' && (
                <>
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-gray-900 uppercase tracking-wide opacity-60 px-1 pt-1">
                      👥 Your Cast
                    </p>
                    <ToolCard icon={<Users className="w-4 h-4" />} color="cyan" label="Characters">
                      <CharacterBuilder />
                    </ToolCard>
                    <ToolCard icon={<Zap className="w-4 h-4" />} color="pink" label="Character Arcs">
                      <CharacterArcTracker />
                    </ToolCard>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-bold text-gray-900 uppercase tracking-wide opacity-60 px-1 pt-1">
                      🗺️ Your World
                    </p>
                    <ToolCard icon={<MapPin className="w-4 h-4" />} color="green" label="Locations">
                      <LocationBuilder />
                    </ToolCard>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-bold text-gray-900 uppercase tracking-wide opacity-60 px-1 pt-1">
                      📈 Analytics
                    </p>
                    <ToolCard icon={<BarChart3 className="w-4 h-4" />} color="cyan" label="Analytics">
                      <AnalyticsPanel />
                    </ToolCard>
                  </div>
                </>
              )}

              {/* PUBLISHING TAB CONTENT */}
              {sidebarTab === 'publish' && (
                <>
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-gray-900 uppercase tracking-wide opacity-60 px-1 pt-1">
                      ⬇️ Export
                    </p>
                    <ToolCard icon={<Download className="w-4 h-4" />} color="green" label="Export Story">
                      <ExportMenu title={title} content={content} />
                    </ToolCard>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-bold text-gray-900 uppercase tracking-wide opacity-60 px-1 pt-1">
                      📖 Publishing
                    </p>
                    <ToolCard icon={<Clock className="w-4 h-4" />} color="red" label="Publish Settings">
                      <PublishingPanel />
                    </ToolCard>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-bold text-gray-900 uppercase tracking-wide opacity-60 px-1 pt-1">
                      📝 Metadata
                    </p>
                    <ToolCard icon={<Tag className="w-4 h-4" />} color="cyan" label="Tags & Categories">
                      <TagsManager />
                    </ToolCard>
                    <ToolCard icon={<Search className="w-4 h-4" />} color="blue" label="SEO Settings">
                      <SEOPanel title={title} />
                    </ToolCard>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-bold text-gray-900 uppercase tracking-wide opacity-60 px-1 pt-1">
                      🎨 Visual
                    </p>
                    <ToolCard icon={<ImageIcon className="w-4 h-4" />} color="amber" label="Cover Image">
                      <CoverImageManager />
                    </ToolCard>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Editor Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Timeline or Story Map Views */}
          {(showTimeline || showStoryMap) && (
            <div className="border-b border-gray-200 bg-white/60 backdrop-blur-md p-6 overflow-y-auto max-h-64">
              {showTimeline && <StoryTimeline sections={structure.sections} />}
              {showStoryMap && <StoryMap sections={structure.sections} />}
            </div>
          )}

          {/* Editor Stats Bar */}
          {showStats && (
            <div className="border-b border-gray-200 bg-white/60 backdrop-blur-md px-6 py-3 flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center gap-6">
                <div>
                  <span className="font-semibold text-black">{wordCount}</span>
                  <span className="ml-1">words</span>
                </div>
                <div>
                  <span className="font-semibold text-black">{charCount}</span>
                  <span className="ml-1">characters</span>
                </div>
                <div>
                  <span className="font-semibold text-black">{paragraphs}</span>
                  <span className="ml-1">paragraphs</span>
                </div>
                <div>
                  <span className="font-semibold text-black">{readingTime}</span>
                  <span className="ml-1">min read</span>
                </div>
              </div>
              {!sidebarOpen && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(true)}
                  className="text-gray-600 hover:text-black gap-1 text-xs"
                >
                  <Settings className="w-3 h-3" />
                  Show Tools
                </Button>
              )}
            </div>
          )}

          {/* Main Editor */}
          <div className="flex-1 overflow-auto">
            <div className="max-w-4xl mx-auto px-6 lg:px-12 py-8 h-full">
              <div className="mb-8">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={`text-5xl font-bold bg-transparent border-0 focus:outline-none w-full mb-4 ${backgroundStyles[background].accent}`}
                  placeholder="Untitled Story"
                />
                <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
              </div>

              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start writing your story here..."
                className={`w-full min-h-[600px] border-0 focus:ring-0 p-0 resize-none text-lg leading-relaxed bg-transparent ${backgroundStyles[background].accent} placeholder-gray-400`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Tool Card Component
function ToolCard({ 
  icon, 
  color, 
  label, 
  children 
}: { 
  icon: React.ReactNode; 
  color: string; 
  label: string; 
  children: React.ReactNode;
}) {
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-50 border-blue-200',
    purple: 'bg-purple-50 border-purple-200',
    amber: 'bg-amber-50 border-amber-200',
    cyan: 'bg-cyan-50 border-cyan-200',
    pink: 'bg-pink-50 border-pink-200',
    green: 'bg-green-50 border-green-200',
    teal: 'bg-teal-50 border-teal-200',
    orange: 'bg-orange-50 border-orange-200',
    yellow: 'bg-yellow-50 border-yellow-200',
    indigo: 'bg-indigo-50 border-indigo-200',
    red: 'bg-red-50 border-red-200',
  };

  const iconClasses: Record<string, string> = {
    blue: 'text-blue-600',
    purple: 'text-purple-600',
    amber: 'text-amber-600',
    cyan: 'text-cyan-600',
    pink: 'text-pink-600',
    green: 'text-green-600',
    teal: 'text-teal-600',
    orange: 'text-orange-600',
    yellow: 'text-yellow-600',
    indigo: 'text-indigo-600',
    red: 'text-red-600',
  };

  return (
    <div className={`p-3 rounded-lg border ${colorClasses[color] || colorClasses.blue} hover:shadow-md transition-all`}>
      <div className="flex items-center gap-2 mb-2">
        <div className={`${iconClasses[color] || iconClasses.blue}`}>
          {icon}
        </div>
        <span className="font-medium text-sm text-gray-900">{label}</span>
      </div>
      <div className="text-sm text-gray-700">
        {children}
      </div>
    </div>
  );
}
