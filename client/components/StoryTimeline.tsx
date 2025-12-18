import { Chapter, Section } from "@/components/StoryStructure";
import { Badge } from "@/components/ui/badge";

export interface TimelineEvent {
  id: string;
  title: string;
  chapter: number;
  scene: number;
  date?: string;
  location?: string;
  characters?: string[];
  type: "plot" | "character" | "location" | "conflict";
}

export function StoryTimeline({ sections }: { sections: Section[] }) {
  let globalChapterNum = 0;

  const events: TimelineEvent[] = [];

  sections.forEach((section) => {
    section.chapters.forEach((chapter) => {
      globalChapterNum++;
      chapter.scenes.forEach((scene, sceneIdx) => {
        if (scene.tags.includes("plot-point") || scene.status === "completed") {
          events.push({
            id: scene.id,
            title: scene.title,
            chapter: globalChapterNum,
            scene: sceneIdx + 1,
            type: "plot",
          });
        }
      });
    });
  });

  const typeColors: Record<string, { bg: string; border: string; text: string }> = {
    plot: { bg: "bg-red-50", border: "border-red-200", text: "text-red-700" },
    character: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700" },
    location: { bg: "bg-green-50", border: "border-green-200", text: "text-green-700" },
    conflict: { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-700" },
  };

  return (
    <div className="space-y-4">
      {/* Timeline Legend */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(typeColors).map(([type, colors]) => (
          <div key={type} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded ${colors.bg} border ${colors.border}`} />
            <span className="text-xs text-gray-700 capitalize">{type}</span>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="space-y-3">
        {events.map((event, idx) => {
          const colors = typeColors[event.type];
          return (
            <div key={event.id} className="flex gap-4">
              {/* Timeline Dot */}
              <div className="flex flex-col items-center gap-1">
                <div className={`w-4 h-4 rounded-full border-2 ${colors.border} ${colors.bg}`} />
                {idx < events.length - 1 && (
                  <div className="w-0.5 h-12 bg-gray-200" />
                )}
              </div>

              {/* Event Card */}
              <div
                className={`flex-1 p-3 rounded-lg border ${colors.border} ${colors.bg} text-sm`}
              >
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900">{event.title}</p>
                    <p className={`text-xs ${colors.text}`}>
                      Chapter {event.chapter} · Scene {event.scene}
                    </p>
                  </div>
                  <Badge
                    variant="secondary"
                    className="text-xs whitespace-nowrap"
                  >
                    {event.type}
                  </Badge>
                </div>
              </div>
            </div>
          );
        })}

        {events.length === 0 && (
          <div className="p-6 text-center rounded-lg bg-gray-50 border border-gray-200">
            <p className="text-sm text-gray-600">
              No major plot points or completed scenes yet.
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Tag scenes with "plot-point" or mark them as completed to see them here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export function StoryMap({ sections }: { sections: Section[] }) {
  // Create a grid-based visualization of the story structure
  const totalChapters = sections.reduce((sum, s) => sum + s.chapters.length, 0);
  const maxScenesPerChapter = Math.max(
    ...sections.flatMap((s) => s.chapters.map((c) => c.scenes.length))
  );

  return (
    <div className="space-y-4">
      <div className="text-sm font-semibold text-gray-900">
        Story Structure: {totalChapters} chapters, {maxScenesPerChapter} scenes max
      </div>

      {/* Grid View */}
      <div className="space-y-3">
        {sections.map((section, sIdx) => (
          <div key={section.id} className="space-y-1">
            <div className="text-xs font-semibold text-gray-700 px-1">{section.title}</div>

            {section.chapters.map((chapter, cIdx) => (
              <div key={chapter.id} className="flex gap-1 flex-wrap">
                {chapter.scenes.map((scene, sceneIdx) => {
                  const statusColors: Record<string, string> = {
                    draft: "bg-gray-200",
                    "in-progress": "bg-blue-300",
                    completed: "bg-green-300",
                    placeholder: "bg-yellow-200",
                  };

                  return (
                    <div
                      key={scene.id}
                      className={`w-6 h-6 rounded text-xs flex items-center justify-center font-bold text-white cursor-pointer hover:ring-2 ring-blue-500 transition ${
                        statusColors[scene.status]
                      }`}
                      title={`Ch ${cIdx + 1} · Sc ${sceneIdx + 1}: ${scene.title}`}
                    >
                      {scene.wordCount > 0 ? "✓" : "○"}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
        <p className="text-xs font-semibold text-gray-900 mb-2">Legend</p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-200 rounded" />
            <span>Draft</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-300 rounded" />
            <span>In Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-300 rounded" />
            <span>Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-200 rounded" />
            <span>Placeholder</span>
          </div>
        </div>
      </div>
    </div>
  );
}
