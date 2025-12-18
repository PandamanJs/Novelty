import { useState, useCallback } from "react";
import { Plus, Trash2, Edit2, Eye, EyeOff, ChevronDown, ChevronRight, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type SceneStatus = "draft" | "in-progress" | "completed" | "placeholder";
export type SectionType = "act" | "part" | "section";

export interface Scene {
  id: string;
  title: string;
  content: string;
  status: SceneStatus;
  wordCount: number;
  wordGoal?: number;
  notes: string[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  position: number;
}

export interface Chapter {
  id: string;
  title: string;
  sectionId: string;
  scenes: Scene[];
  wordCount: number;
  wordGoal?: number;
  position: number;
  isExpanded: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Section {
  id: string;
  title: string;
  type: SectionType;
  chapters: Chapter[];
  position: number;
  isExpanded: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface StoryStructure {
  sections: Section[];
  totalWordCount: number;
}

// Hook for managing story structure
export function useStoryStructure() {
  const [structure, setStructure] = useState<StoryStructure>({
    sections: [
      {
        id: "act-1",
        title: "Act 1: Setup",
        type: "act",
        chapters: [
          {
            id: "ch-1",
            title: "Chapter 1",
            sectionId: "act-1",
            scenes: [
              {
                id: "scene-1",
                title: "Opening Scene",
                content: "",
                status: "draft",
                wordCount: 0,
                wordGoal: 1000,
                notes: [],
                tags: [],
                createdAt: new Date(),
                updatedAt: new Date(),
                position: 0,
              },
            ],
            wordCount: 0,
            wordGoal: 5000,
            position: 0,
            isExpanded: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        position: 0,
        isExpanded: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "act-2",
        title: "Act 2: Confrontation",
        type: "act",
        chapters: [],
        position: 1,
        isExpanded: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "act-3",
        title: "Act 3: Resolution",
        type: "act",
        chapters: [],
        position: 2,
        isExpanded: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    totalWordCount: 0,
  });

  const addSection = useCallback((title: string, type: SectionType) => {
    setStructure((prev) => ({
      ...prev,
      sections: [
        ...prev.sections,
        {
          id: `section-${Date.now()}`,
          title,
          type,
          chapters: [],
          position: prev.sections.length,
          isExpanded: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    }));
  }, []);

  const deleteSection = useCallback((sectionId: string) => {
    setStructure((prev) => ({
      ...prev,
      sections: prev.sections.filter((s) => s.id !== sectionId),
    }));
  }, []);

  const renameSection = useCallback((sectionId: string, newTitle: string) => {
    setStructure((prev) => ({
      ...prev,
      sections: prev.sections.map((s) =>
        s.id === sectionId ? { ...s, title: newTitle, updatedAt: new Date() } : s
      ),
    }));
  }, []);

  const toggleSection = useCallback((sectionId: string) => {
    setStructure((prev) => ({
      ...prev,
      sections: prev.sections.map((s) =>
        s.id === sectionId ? { ...s, isExpanded: !s.isExpanded } : s
      ),
    }));
  }, []);

  const addChapter = useCallback((sectionId: string, title: string) => {
    setStructure((prev) => ({
      ...prev,
      sections: prev.sections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              chapters: [
                ...s.chapters,
                {
                  id: `ch-${Date.now()}`,
                  title,
                  sectionId,
                  scenes: [],
                  wordCount: 0,
                  wordGoal: 5000,
                  position: s.chapters.length,
                  isExpanded: true,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                },
              ],
            }
          : s
      ),
    }));
  }, []);

  const deleteChapter = useCallback((sectionId: string, chapterId: string) => {
    setStructure((prev) => ({
      ...prev,
      sections: prev.sections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              chapters: s.chapters.filter((c) => c.id !== chapterId),
            }
          : s
      ),
    }));
  }, []);

  const renameChapter = useCallback((sectionId: string, chapterId: string, newTitle: string) => {
    setStructure((prev) => ({
      ...prev,
      sections: prev.sections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              chapters: s.chapters.map((c) =>
                c.id === chapterId ? { ...c, title: newTitle, updatedAt: new Date() } : c
              ),
            }
          : s
      ),
    }));
  }, []);

  const toggleChapter = useCallback((sectionId: string, chapterId: string) => {
    setStructure((prev) => ({
      ...prev,
      sections: prev.sections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              chapters: s.chapters.map((c) =>
                c.id === chapterId ? { ...c, isExpanded: !c.isExpanded } : c
              ),
            }
          : s
      ),
    }));
  }, []);

  const addScene = useCallback(
    (sectionId: string, chapterId: string, title: string) => {
      setStructure((prev) => ({
        ...prev,
        sections: prev.sections.map((s) =>
          s.id === sectionId
            ? {
                ...s,
                chapters: s.chapters.map((c) =>
                  c.id === chapterId
                    ? {
                        ...c,
                        scenes: [
                          ...c.scenes,
                          {
                            id: `scene-${Date.now()}`,
                            title,
                            content: "",
                            status: "draft",
                            wordCount: 0,
                            wordGoal: 1000,
                            notes: [],
                            tags: [],
                            createdAt: new Date(),
                            updatedAt: new Date(),
                            position: c.scenes.length,
                          },
                        ],
                      }
                    : c
                ),
              }
            : s
        ),
      }));
    },
    []
  );

  const deleteScene = useCallback(
    (sectionId: string, chapterId: string, sceneId: string) => {
      setStructure((prev) => ({
        ...prev,
        sections: prev.sections.map((s) =>
          s.id === sectionId
            ? {
                ...s,
                chapters: s.chapters.map((c) =>
                  c.id === chapterId
                    ? {
                        ...c,
                        scenes: c.scenes.filter((sc) => sc.id !== sceneId),
                      }
                    : c
                ),
              }
            : s
        ),
      }));
    },
    []
  );

  const updateScene = useCallback(
    (sectionId: string, chapterId: string, sceneId: string, updates: Partial<Scene>) => {
      setStructure((prev) => ({
        ...prev,
        sections: prev.sections.map((s) =>
          s.id === sectionId
            ? {
                ...s,
                chapters: s.chapters.map((c) =>
                  c.id === chapterId
                    ? {
                        ...c,
                        scenes: c.scenes.map((sc) =>
                          sc.id === sceneId ? { ...sc, ...updates, updatedAt: new Date() } : sc
                        ),
                      }
                    : c
                ),
              }
            : s
        ),
      }));
    },
    []
  );

  const updateSceneStatus = useCallback(
    (sectionId: string, chapterId: string, sceneId: string, status: SceneStatus) => {
      updateScene(sectionId, chapterId, sceneId, { status });
    },
    [updateScene]
  );

  return {
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
  };
}

// Status indicator and badge
export function SceneStatusBadge({ status }: { status: SceneStatus }) {
  const statusColors: Record<SceneStatus, { bg: string; text: string; label: string }> = {
    draft: { bg: "bg-gray-100", text: "text-gray-700", label: "Draft" },
    "in-progress": { bg: "bg-blue-100", text: "text-blue-700", label: "In Progress" },
    completed: { bg: "bg-green-100", text: "text-green-700", label: "Completed" },
    placeholder: { bg: "bg-yellow-100", text: "text-yellow-700", label: "Placeholder" },
  };

  const style = statusColors[status];

  return (
    <Badge className={`${style.bg} ${style.text} border-0`}>
      {style.label}
    </Badge>
  );
}

// Scene status selector
export function SceneStatusSelector({
  currentStatus,
  onStatusChange,
}: {
  currentStatus: SceneStatus;
  onStatusChange: (status: SceneStatus) => void;
}) {
  const statuses: SceneStatus[] = ["draft", "in-progress", "completed", "placeholder"];

  return (
    <div className="flex gap-1">
      {statuses.map((status) => (
        <button
          key={status}
          onClick={() => onStatusChange(status)}
          className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
            currentStatus === status
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </button>
      ))}
    </div>
  );
}
