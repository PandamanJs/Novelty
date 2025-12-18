import { useState } from "react";
import { Lightbulb, Zap, Users, BookOpen, TrendingUp, MessageCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CharacterArc {
  name: string;
  startState: string;
  midpoint: string;
  endState: string;
  transformationType: string;
}

interface PlotPoint {
  act: number;
  beat: string;
  description: string;
  emotionalImpact: "high" | "medium" | "low";
}

export function PlotAssistant({ wordCount }: { wordCount: number }) {
  const [selectedTab, setSelectedTab] = useState("structure");
  const [characterArcs, setCharacterArcs] = useState<CharacterArc[]>([
    {
      name: "Protagonist",
      startState: "Add initial state",
      midpoint: "Add midpoint transformation",
      endState: "Add final state",
      transformationType: "emotional",
    },
  ]);

  const plotStructure: PlotPoint[] = [
    {
      act: 1,
      beat: "Exposition",
      description: "Establish world, characters, and initial situation",
      emotionalImpact: "medium",
    },
    {
      act: 1,
      beat: "Inciting Incident",
      description: "Event that disrupts the protagonist's ordinary world",
      emotionalImpact: "high",
    },
    {
      act: 2,
      beat: "Rising Action",
      description: "Mounting obstacles and complications",
      emotionalImpact: "high",
    },
    {
      act: 2,
      beat: "Midpoint",
      description: "Major reversal or revelation (false victory/defeat)",
      emotionalImpact: "high",
    },
    {
      act: 3,
      beat: "Climax",
      description: "Final confrontation with highest stakes",
      emotionalImpact: "high",
    },
    {
      act: 3,
      beat: "Resolution",
      description: "Consequences and new normal established",
      emotionalImpact: "medium",
    },
  ];

  // Recommend story structure based on word count
  const getStoryRecommendations = () => {
    if (wordCount < 5000) {
      return [
        "📖 Short story format - focus on single compelling incident",
        "⏱️ Compress timeline - tight pacing essential",
        "👤 Limited character scope - 2-4 main characters recommended",
        "🎯 Simple plot - avoid multiple subplots",
      ];
    } else if (wordCount < 50000) {
      return [
        "📚 Novella format - room for deeper character development",
        "🌿 Single subplot acceptable - build complexity gradually",
        "👥 Multiple perspectives possible - 3-5 characters",
        "🔄 Full story arc recommended - exposition, conflict, resolution",
      ];
    } else {
      return [
        "📖 Novel length - complex story structures optimal",
        "🌳 Multiple subplots supported - interweave character arcs",
        "👨‍👩‍👧‍👦 Large cast possible - 6+ characters with distinct arcs",
        "🎬 Epic scope achievable - consider multiple POVs",
      ];
    }
  };

  return (
    <div className="space-y-3">
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 text-xs">
          <TabsTrigger value="structure" className="text-xs">
            Plot
          </TabsTrigger>
          <TabsTrigger value="characters" className="text-xs">
            Characters
          </TabsTrigger>
          <TabsTrigger value="tension" className="text-xs">
            Tension
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="text-xs">
            Tips
          </TabsTrigger>
        </TabsList>

        {/* Plot Structure Tab */}
        <TabsContent value="structure" className="space-y-2">
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {plotStructure.map((point, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg border text-xs ${
                  point.emotionalImpact === "high"
                    ? "bg-red-50 border-red-200"
                    : "bg-yellow-50 border-yellow-200"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-gray-900">
                      Act {point.act} - {point.beat}
                    </p>
                    <p className="text-gray-700 text-xs mt-1">{point.description}</p>
                  </div>
                  <Badge
                    variant={
                      point.emotionalImpact === "high" ? "destructive" : "secondary"
                    }
                    className="text-xs whitespace-nowrap"
                  >
                    {point.emotionalImpact}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          {/* Three Act Structure Diagram */}
          <div className="p-3 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
            <p className="text-xs font-semibold text-gray-900 mb-2">Story Structure</p>
            <div className="flex items-center gap-1 text-xs text-gray-700">
              <span className="flex-1 text-center px-2 py-1 rounded bg-white border border-blue-200">
                Setup
              </span>
              <Zap className="w-3 h-3 text-blue-600" />
              <span className="flex-1 text-center px-2 py-1 rounded bg-white border border-blue-200">
                Confrontation
              </span>
              <Zap className="w-3 h-3 text-blue-600" />
              <span className="flex-1 text-center px-2 py-1 rounded bg-white border border-blue-200">
                Resolution
              </span>
            </div>
          </div>
        </TabsContent>

        {/* Character Arcs Tab */}
        <TabsContent value="characters" className="space-y-2">
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {characterArcs.map((arc, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-pink-50 border border-pink-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-gray-900 text-sm">{arc.name}</p>
                  <Badge variant="outline" className="text-xs">
                    {arc.transformationType}
                  </Badge>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <p className="text-gray-600">Before</p>
                    <p className="text-gray-900 font-medium">{arc.startState}</p>
                  </div>
                  <div className="flex items-center gap-1 text-pink-600">
                    <TrendingUp className="w-3 h-3" />
                    <span>Character transformation</span>
                  </div>
                  <div>
                    <p className="text-gray-600">After</p>
                    <p className="text-gray-900 font-medium">{arc.endState}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Character Button */}
          <Button
            variant="outline"
            size="sm"
            className="w-full text-xs"
            onClick={() => {
              setCharacterArcs([
                ...characterArcs,
                {
                  name: `Character ${characterArcs.length + 1}`,
                  startState: "Add initial state",
                  midpoint: "Add midpoint",
                  endState: "Add final state",
                  transformationType: "emotional",
                },
              ]);
            }}
          >
            <Users className="w-3 h-3 mr-1" />
            Add Character
          </Button>
        </TabsContent>

        {/* Tension Tab */}
        <TabsContent value="tension" className="space-y-2">
          <div className="space-y-2">
            {/* Tension Curve */}
            <div className="p-3 rounded-lg bg-orange-50 border border-orange-200">
              <p className="text-xs font-semibold text-gray-900 mb-2">Story Tension Arc</p>
              <div className="space-y-2">
                <div className="flex items-end gap-1 h-20 bg-white rounded border border-orange-200 p-2">
                  {[2, 3, 4, 5, 7, 8, 9, 10, 8, 5].map((height, idx) => (
                    <div
                      key={idx}
                      className="flex-1 bg-gradient-to-t from-orange-400 to-orange-300 rounded-sm"
                      style={{ height: `${(height / 10) * 100}%` }}
                    />
                  ))}
                </div>
                <p className="text-xs text-orange-700">
                  Tension peaks at climax, drops at resolution
                </p>
              </div>
            </div>

            {/* Pacing Tips */}
            <div className="p-3 rounded-lg bg-cyan-50 border border-cyan-200">
              <div className="flex items-center gap-2 mb-2">
                <MessageCircle className="w-4 h-4 text-cyan-600" />
                <span className="text-xs font-semibold text-gray-900">Pacing Tips</span>
              </div>
              <ul className="space-y-1 text-xs text-cyan-700">
                <li>✓ Vary sentence length for tension/relaxation</li>
                <li>✓ Use short sentences in action scenes</li>
                <li>✓ Use longer sentences for contemplation</li>
                <li>✓ Balance dialogue with description</li>
              </ul>
            </div>
          </div>
        </TabsContent>

        {/* Recommendations Tab */}
        <TabsContent value="recommendations" className="space-y-2">
          <div className="p-3 rounded-lg bg-green-50 border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-4 h-4 text-green-600" />
              <span className="text-xs font-semibold text-gray-900">
                Story Recommendations ({Math.round(wordCount)} words)
              </span>
            </div>
            <ul className="space-y-2">
              {getStoryRecommendations().map((rec, idx) => (
                <li key={idx} className="text-xs text-green-700 flex gap-2">
                  <span className="flex-shrink-0">→</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Story Type Suggestions */}
          <div className="p-3 rounded-lg bg-purple-50 border border-purple-200">
            <p className="text-xs font-semibold text-gray-900 mb-2">Recommended Story Types</p>
            <div className="space-y-1 text-xs">
              {wordCount < 5000 && (
                <>
                  <p className="text-purple-700">• Flash fiction</p>
                  <p className="text-purple-700">• Short story</p>
                  <p className="text-purple-700">• Microfiction challenges</p>
                </>
              )}
              {wordCount >= 5000 && wordCount < 50000 && (
                <>
                  <p className="text-purple-700">• Short story collection</p>
                  <p className="text-purple-700">• Novella</p>
                  <p className="text-purple-700">• Serialized episodes</p>
                </>
              )}
              {wordCount >= 50000 && (
                <>
                  <p className="text-purple-700">• Full novel</p>
                  <p className="text-purple-700">• Book series starter</p>
                  <p className="text-purple-700">• Multi-POV narrative</p>
                </>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
