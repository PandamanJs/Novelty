import { useState } from "react";
import { Wand2, Copy, RefreshCw, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

interface RewriteOption {
  id: string;
  style: string;
  description: string;
  example: string;
}

export function ContextAwareRewriter({ content }: { content: string }) {
  const [selectedText, setSelectedText] = useState("");
  const [rewriteOptions, setRewriteOptions] = useState<RewriteOption[]>([]);
  const [generating, setGenerating] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState("natural");

  const rewriteStyles: Record<string, { label: string; color: string; description: string }> = {
    natural: {
      label: "Natural",
      color: "blue",
      description: "Smooth, flowing prose that reads naturally",
    },
    concise: {
      label: "Concise",
      color: "green",
      description: "Direct, trim down to essentials",
    },
    descriptive: {
      label: "Descriptive",
      color: "purple",
      description: "Rich sensory details and vivid imagery",
    },
    simple: {
      label: "Simple",
      color: "cyan",
      description: "Easy to understand, accessible language",
    },
    formal: {
      label: "Formal",
      color: "amber",
      description: "Professional, academic tone",
    },
    dramatic: {
      label: "Dramatic",
      color: "red",
      description: "Heightened emotion and impact",
    },
  };

  const handleGenerateRewriteOptions = () => {
    if (!selectedText.trim()) {
      alert("Please select text to rewrite");
      return;
    }

    setGenerating(true);

    // Simulate AI rewriting
    setTimeout(() => {
      const mockOptions: RewriteOption[] = [
        {
          id: "1",
          style: "More Active",
          description: "Use active voice instead of passive",
          example: "The door was opened by the character. → The character opened the door.",
        },
        {
          id: "2",
          style: "Stronger Verbs",
          description: "Replace weak verbs with powerful alternatives",
          example: '"said" → "whispered", "declared", "exclaimed"',
        },
        {
          id: "3",
          style: "Concise Version",
          description: "Remove unnecessary words and phrases",
          example: "Remove redundancy, trim excess description",
        },
        {
          id: "4",
          style: "More Vivid",
          description: "Add sensory details and imagery",
          example: "Show, don't tell with concrete details",
        },
        {
          id: "5",
          style: "Varied Structure",
          description: "Different sentence construction for rhythm",
          example: "Mix sentence lengths for better pacing",
        },
      ];

      setRewriteOptions(mockOptions);
      setGenerating(false);
    }, 1000);
  };

  const colorClasses: Record<
    string,
    { bg: string; border: string; text: string; badge: string }
  > = {
    blue: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-700",
      badge: "bg-blue-100 text-blue-700",
    },
    green: {
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-700",
      badge: "bg-green-100 text-green-700",
    },
    purple: {
      bg: "bg-purple-50",
      border: "border-purple-200",
      text: "text-purple-700",
      badge: "bg-purple-100 text-purple-700",
    },
    cyan: {
      bg: "bg-cyan-50",
      border: "border-cyan-200",
      text: "text-cyan-700",
      badge: "bg-cyan-100 text-cyan-700",
    },
    amber: {
      bg: "bg-amber-50",
      border: "border-amber-200",
      text: "text-amber-700",
      badge: "bg-amber-100 text-amber-700",
    },
    red: {
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-700",
      badge: "bg-red-100 text-red-700",
    },
  };

  const selectedStyle_ = rewriteStyles[selectedStyle];
  const styleColors =
    colorClasses[selectedStyle_.color as keyof typeof colorClasses] ||
    colorClasses.blue;

  return (
    <div className="space-y-3">
      {/* Style Selector */}
      <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
        <p className="text-xs font-semibold text-gray-900 mb-2">Rewrite Style</p>
        <div className="grid grid-cols-3 gap-1">
          {Object.entries(rewriteStyles).map(([key, { label, color, description }]) => (
            <button
              key={key}
              onClick={() => setSelectedStyle(key)}
              className={`px-2 py-1.5 rounded text-xs font-medium transition-all border ${
                selectedStyle === key
                  ? `${styleColors.bg} ${styleColors.border} border-2 ring-2 ring-${color}-200`
                  : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
              }`}
              title={description}
            >
              {label}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-600 mt-2">{selectedStyle_.description}</p>
      </div>

      {/* Selected Text Input */}
      <div className="p-3 rounded-lg border border-gray-200 bg-white">
        <p className="text-xs font-semibold text-gray-900 mb-2">Text to Rewrite</p>
        <Textarea
          value={selectedText}
          onChange={(e) => setSelectedText(e.target.value)}
          placeholder="Paste or type the text you want to rewrite..."
          className="w-full h-20 text-xs border border-gray-200 rounded p-2 resize-none"
        />
        <div className="flex gap-2 mt-2">
          <Button
            size="sm"
            onClick={handleGenerateRewriteOptions}
            disabled={generating || !selectedText.trim()}
            className="flex-1 text-xs gap-1"
          >
            <Wand2 className="w-3 h-3" />
            {generating ? "Generating..." : "Generate Options"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedText("")}
            className="text-xs"
          >
            Clear
          </Button>
        </div>
      </div>

      {/* Rewrite Suggestions */}
      {rewriteOptions.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-900">Rewrite Suggestions</p>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {rewriteOptions.map((option) => (
              <div
                key={option.id}
                className={`p-2 rounded-lg border ${styleColors.bg} ${styleColors.border}`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className={`font-semibold text-xs ${styleColors.text}`}>
                    {option.style}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-5 w-5 p-0 text-xs"
                    onClick={() => {
                      // Copy to clipboard
                      navigator.clipboard.writeText(option.example);
                    }}
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
                <p className={`text-xs ${styleColors.text} mb-1`}>{option.description}</p>
                <div className="bg-white p-1.5 rounded border border-gray-200 text-xs font-mono text-gray-700">
                  {option.example}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rewriting Tips */}
      <div className="p-3 rounded-lg bg-indigo-50 border border-indigo-200">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="w-4 h-4 text-indigo-600" />
          <span className="text-xs font-semibold text-gray-900">Rewriting Tips</span>
        </div>
        <ul className="space-y-1 text-xs text-indigo-700">
          <li>• Focus on one sentence or paragraph at a time</li>
          <li>• Preserve the original meaning and intent</li>
          <li>• Read the rewrite aloud to check flow</li>
          <li>• Compare options side-by-side for best result</li>
        </ul>
      </div>
    </div>
  );
}
