import { useState } from "react";
import {
  Plus,
  Trash2,
  Edit2,
  ChevronDown,
  ChevronRight,
  Copy,
  BookOpen,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Chapter,
  Section,
  Scene,
  SceneStatus,
  SceneStatusBadge,
  useStoryStructure,
} from "@/components/StoryStructure";

export function ChapterSceneManager() {
  const {
    structure,
    addSection,
    deleteSection,
    renameSection,
    toggleSection,
    addChapter,
    deleteChapter,
    renameChapter,
    toggleChapter,
    addScene,
    deleteScene,
    updateScene,
    updateSceneStatus,
  } = useStoryStructure();

  const [selectedScene, setSelectedScene] = useState<{
    sectionId: string;
    chapterId: string;
    sceneId: string;
  } | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const handleRenameSection = (sectionId: string) => {
    if (editValue.trim()) {
      renameSection(sectionId, editValue);
      setEditingId(null);
    }
  };

  const handleRenameChapter = (sectionId: string, chapterId: string) => {
    if (editValue.trim()) {
      renameChapter(sectionId, chapterId, editValue);
      setEditingId(null);
    }
  };

  const calculateSectionWordCount = (section: Section) => {
    return section.chapters.reduce((sum, ch) => sum + ch.wordCount, 0);
  };

  const calculateTotalWordCount = () => {
    return structure.sections.reduce((sum, s) => sum + calculateSectionWordCount(s), 0);
  };

  return (
    <div className="space-y-3 max-h-96 overflow-y-auto">
      {/* Total Word Count */}
      <div className="p-3 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
        <div className="text-center">
          <p className="text-xs text-gray-600 font-medium">Total Word Count</p>
          <p className="text-2xl font-bold text-blue-900">{calculateTotalWordCount().toLocaleString()}</p>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-2">
        {structure.sections.map((section) => (
          <div key={section.id} className="border border-gray-200 rounded-lg overflow-hidden">
            {/* Section Header */}
            <div className="bg-gray-50 p-2 flex items-center justify-between hover:bg-gray-100 transition">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="p-1 hover:bg-white rounded transition"
                >
                  {section.isExpanded ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>

                {editingId === section.id ? (
                  <input
                    autoFocus
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={() => handleRenameSection(section.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleRenameSection(section.id);
                      if (e.key === "Escape") setEditingId(null);
                    }}
                    className="px-2 py-1 rounded border border-blue-300 text-sm flex-1"
                  />
                ) : (
                  <span className="text-sm font-semibold text-gray-900 truncate">
                    {section.title}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500">
                  {calculateSectionWordCount(section)} words
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <MoreVertical className="w-3 h-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="text-xs">
                    <DropdownMenuItem
                      onClick={() => {
                        setEditingId(section.id);
                        setEditValue(section.title);
                      }}
                    >
                      <Edit2 className="w-3 h-3 mr-2" />
                      Rename
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => addChapter(section.id, "New Chapter")}>
                      <Plus className="w-3 h-3 mr-2" />
                      Add Chapter
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => deleteSection(section.id)}>
                      <Trash2 className="w-3 h-3 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Chapters */}
            {section.isExpanded && (
              <div className="border-t border-gray-200 divide-y divide-gray-200">
                {section.chapters.map((chapter) => (
                  <div key={chapter.id}>
                    {/* Chapter Header */}
                    <div className="bg-white p-2 pl-8 flex items-center justify-between hover:bg-gray-50 transition">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <button
                          onClick={() => toggleChapter(section.id, chapter.id)}
                          className="p-1 hover:bg-gray-100 rounded transition"
                        >
                          {chapter.isExpanded ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </button>

                        {editingId === chapter.id ? (
                          <input
                            autoFocus
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onBlur={() => handleRenameChapter(section.id, chapter.id)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleRenameChapter(section.id, chapter.id);
                              if (e.key === "Escape") setEditingId(null);
                            }}
                            className="px-2 py-1 rounded border border-blue-300 text-sm flex-1"
                          />
                        ) : (
                          <span className="text-sm font-medium text-gray-800 truncate">
                            {chapter.title}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1">
                        <span className="text-xs text-gray-500">{chapter.wordCount}w</span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <MoreVertical className="w-3 h-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="text-xs">
                            <DropdownMenuItem
                              onClick={() => {
                                setEditingId(chapter.id);
                                setEditValue(chapter.title);
                              }}
                            >
                              <Edit2 className="w-3 h-3 mr-2" />
                              Rename
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => addScene(section.id, chapter.id, "New Scene")}
                            >
                              <Plus className="w-3 h-3 mr-2" />
                              Add Scene
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => deleteChapter(section.id, chapter.id)}>
                              <Trash2 className="w-3 h-3 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    {/* Scenes */}
                    {chapter.isExpanded && (
                      <div className="bg-gray-50 border-t border-gray-200 divide-y divide-gray-200">
                        {chapter.scenes.map((scene) => (
                          <div
                            key={scene.id}
                            className={`p-2 pl-16 flex items-center justify-between hover:bg-white transition cursor-pointer ${
                              selectedScene?.sceneId === scene.id ? "bg-blue-50" : ""
                            }`}
                            onClick={() =>
                              setSelectedScene({
                                sectionId: section.id,
                                chapterId: chapter.id,
                                sceneId: scene.id,
                              })
                            }
                          >
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                              <BookOpen className="w-3 h-3 text-gray-400 flex-shrink-0" />
                              <span className="text-sm text-gray-700 truncate">{scene.title}</span>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500">{scene.wordCount}w</span>
                              <SceneStatusBadge status={scene.status} />
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                    <MoreVertical className="w-3 h-3" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="text-xs">
                                  <DropdownMenuItem
                                    onClick={() => deleteScene(section.id, chapter.id, scene.id)}
                                  >
                                    <Trash2 className="w-3 h-3 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        ))}

                        {chapter.scenes.length === 0 && (
                          <div className="p-4 text-center text-xs text-gray-500">
                            No scenes yet. Add one to start writing.
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}

                {section.chapters.length === 0 && (
                  <div className="p-3 text-center text-xs text-gray-500">
                    No chapters yet.
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
