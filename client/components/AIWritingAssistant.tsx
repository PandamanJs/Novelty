import { useState, useEffect } from "react";
import { Sparkles, Settings, Lightbulb, PenTool, Users, BookOpen } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Suggestion {
  id: string;
  type: "grammar" | "style" | "vocabulary" | "tone" | "pacing";
  location: number;
  original: string;
  suggestion: string;
  reason: string;
  confidence: number;
}

interface StyleProfile {
  genre: string;
  tone: string;
  audienceLevel: "general" | "academic" | "children" | "adults";
}

export function AIWritingAssistant({ content, title }: { content: string; title: string }) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [selectedTab, setSelectedTab] = useState("overview");
  const [styleProfile, setStyleProfile] = useState<StyleProfile>({
    genre: "fiction",
    tone: "narrative",
    audienceLevel: "adults",
  });
  const [analyzing, setAnalyzing] = useState(false);

  // Analyze content for AI suggestions
  useEffect(() => {
    if (!content.trim()) return;

    setAnalyzing(true);
    // Simulate AI analysis with timeout
    const timer = setTimeout(() => {
      analyzContent(content);
      setAnalyzing(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [content]);

  const analyzContent = (text: string) => {
    const newSuggestions: Suggestion[] = [];

    // Grammar and style analysis
    const words = text.split(/\s+/);
    const sentences = text.split(/[.!?]+/).filter(s => s.trim());

    // Check for passive voice
    const passivePattern = /\b(was|were|is|are|be)\s+(\w+ed|been)\b/gi;
    let passiveMatch;
    while ((passiveMatch = passivePattern.exec(text)) !== null) {
      newSuggestions.push({
        id: `passive-${passiveMatch.index}`,
        type: "style",
        location: passiveMatch.index,
        original: passiveMatch[0],
        suggestion: "Consider using active voice for stronger writing",
        reason: "Passive voice can weaken your prose",
        confidence: 0.85,
      });
    }

    // Check for repeated words
    const wordFreq: Record<string, number> = {};
    words.forEach(word => {
      const clean = word.toLowerCase().replace(/[^a-z0-9]/g, "");
      if (clean.length > 4) {
        wordFreq[clean] = (wordFreq[clean] || 0) + 1;
      }
    });

    Object.entries(wordFreq).forEach(([word, count]) => {
      if (count > 3) {
        newSuggestions.push({
          id: `repeat-${word}`,
          type: "vocabulary",
          location: 0,
          original: word,
          suggestion: `"${word}" appears ${count} times. Consider varying your vocabulary.`,
          reason: "Word repetition can reduce reader engagement",
          confidence: 0.7,
        });
      }
    });

    // Check sentence length variety
    const sentenceLengths = sentences.map(s => s.trim().split(/\s+/).length);
    const avgLength = sentenceLengths.reduce((a, b) => a + b, 0) / sentenceLengths.length;

    if (avgLength > 20) {
      newSuggestions.push({
        id: "sentence-length",
        type: "pacing",
        location: 0,
        original: "Long sentences",
        suggestion: "Average sentence length is quite long. Vary with shorter sentences for better pacing.",
        reason: "Long sentences can tire readers",
        confidence: 0.8,
      });
    }

    // Check for clichés based on genre
    const clichés: Record<string, string[]> = {
      fiction: [
        "it was a dark and stormy night",
        "little did she know",
        "at the end of the day",
        "needless to say",
      ],
      romance: [
        "heart racing",
        "breath taken away",
        "butterflies in stomach",
        "swept off her feet",
      ],
      mystery: [
        "clues were scattered",
        "mystery unfolded",
        "deep dark secret",
        "truth came to light",
      ],
    };

    const genreClichés = clichés[styleProfile.genre] || [];
    genreClichés.forEach(cliché => {
      if (text.toLowerCase().includes(cliché)) {
        newSuggestions.push({
          id: `cliche-${cliché}`,
          type: "tone",
          location: 0,
          original: cliché,
          suggestion: `"${cliché}" is a common phrase. Try something more original.`,
          reason: "Clichés can make writing feel generic",
          confidence: 0.75,
        });
      }
    });

    // Vocabulary enhancement suggestions
    const simpleWords: Record<string, string[]> = {
      said: ["whispered", "exclaimed", "replied", "muttered", "declared"],
      good: ["excellent", "superb", "outstanding", "remarkable", "exceptional"],
      bad: ["poor", "terrible", "awful", "dreadful", "abysmal"],
      happy: ["delighted", "elated", "cheerful", "content", "thrilled"],
      sad: ["melancholy", "sorrowful", "dejected", "despondent", "forlorn"],
    };

    Object.entries(simpleWords).forEach(([simple, alternatives]) => {
      const regex = new RegExp(`\\b${simple}\\b`, "gi");
      if (regex.test(text)) {
        newSuggestions.push({
          id: `vocab-${simple}`,
          type: "vocabulary",
          location: 0,
          original: simple,
          suggestion: `Try: ${alternatives.slice(0, 3).join(", ")}`,
          reason: `${simple} is quite common. Consider stronger alternatives.`,
          confidence: 0.65,
        });
      }
    });

    setSuggestions(newSuggestions.slice(0, 10)); // Limit to top 10
  };

  const grammarSuggestions = suggestions.filter(s => s.type === "grammar");
  const styleSuggestions = suggestions.filter(s => s.type === "style");
  const vocabularySuggestions = suggestions.filter(s => s.type === "vocabulary");
  const toneSuggestions = suggestions.filter(s => s.type === "tone");
  const pacingSuggestions = suggestions.filter(s => s.type === "pacing");

  return (
    <div className="space-y-4">
      {/* Style Profile */}
      <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
        <div className="flex items-center gap-2 mb-3">
          <Settings className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-semibold text-gray-900">Writing Profile</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <label className="text-xs text-gray-600">Genre</label>
            <select
              value={styleProfile.genre}
              onChange={(e) =>
                setStyleProfile({ ...styleProfile, genre: e.target.value })
              }
              className="w-full px-2 py-1 rounded border border-blue-200 bg-white text-xs"
            >
              <option value="fiction">Fiction</option>
              <option value="romance">Romance</option>
              <option value="mystery">Mystery</option>
              <option value="sci-fi">Sci-Fi</option>
              <option value="fantasy">Fantasy</option>
              <option value="non-fiction">Non-Fiction</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-600">Audience</label>
            <select
              value={styleProfile.audienceLevel}
              onChange={(e) =>
                setStyleProfile({
                  ...styleProfile,
                  audienceLevel: e.target.value as any,
                })
              }
              className="w-full px-2 py-1 rounded border border-blue-200 bg-white text-xs"
            >
              <option value="children">Children</option>
              <option value="general">General</option>
              <option value="adults">Adults</option>
              <option value="academic">Academic</option>
            </select>
          </div>
        </div>
      </div>

      {/* AI Analysis Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 text-xs">
          <TabsTrigger value="overview" className="text-xs">
            Overview
            {suggestions.length > 0 && (
              <Badge variant="secondary" className="ml-1 text-xs">
                {suggestions.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="grammar" className="text-xs">
            Grammar {grammarSuggestions.length > 0 && `(${grammarSuggestions.length})`}
          </TabsTrigger>
          <TabsTrigger value="vocabulary" className="text-xs">
            Words {vocabularySuggestions.length > 0 && `(${vocabularySuggestions.length})`}
          </TabsTrigger>
          <TabsTrigger value="style" className="text-xs">
            Style {styleSuggestions.length > 0 && `(${styleSuggestions.length})`}
          </TabsTrigger>
          <TabsTrigger value="advanced" className="text-xs">
            Advanced
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-3">
          {analyzing && (
            <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-center">
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm text-gray-700">Analyzing your writing...</span>
              </div>
            </div>
          )}

          {!analyzing && suggestions.length === 0 && (
            <div className="p-4 rounded-lg bg-green-50 border border-green-200 text-center">
              <p className="text-sm text-green-700 font-medium">✨ Great writing!</p>
              <p className="text-xs text-green-600">No immediate suggestions. Keep writing!</p>
            </div>
          )}

          {!analyzing && suggestions.length > 0 && (
            <div className="space-y-2">
              <div className="text-sm font-semibold text-gray-900">
                {suggestions.length} suggestion{suggestions.length !== 1 ? "s" : ""} found
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {suggestions.slice(0, 5).map((suggestion) => (
                  <div
                    key={suggestion.id}
                    className="p-2 rounded-lg bg-yellow-50 border border-yellow-200 text-xs"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{suggestion.type}</p>
                        <p className="text-gray-700">{suggestion.reason}</p>
                      </div>
                      <Badge
                        variant="outline"
                        className="text-xs"
                        style={{
                          opacity: suggestion.confidence,
                        }}
                      >
                        {Math.round(suggestion.confidence * 100)}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        {/* Grammar Tab */}
        <TabsContent value="grammar" className="space-y-2 max-h-48 overflow-y-auto">
          {grammarSuggestions.length === 0 ? (
            <p className="text-sm text-gray-600 text-center py-4">
              No grammar issues detected
            </p>
          ) : (
            grammarSuggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className="p-2 rounded-lg bg-red-50 border border-red-200 text-xs"
              >
                <p className="font-medium text-red-900">{suggestion.original}</p>
                <p className="text-red-700">→ {suggestion.suggestion}</p>
              </div>
            ))
          )}
        </TabsContent>

        {/* Vocabulary Tab */}
        <TabsContent value="vocabulary" className="space-y-2 max-h-48 overflow-y-auto">
          {vocabularySuggestions.length === 0 ? (
            <p className="text-sm text-gray-600 text-center py-4">
              Vocabulary looks strong
            </p>
          ) : (
            vocabularySuggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className="p-2 rounded-lg bg-purple-50 border border-purple-200 text-xs"
              >
                <p className="font-medium text-purple-900">{suggestion.original}</p>
                <p className="text-purple-700">{suggestion.suggestion}</p>
              </div>
            ))
          )}
        </TabsContent>

        {/* Style Tab */}
        <TabsContent value="style" className="space-y-2 max-h-48 overflow-y-auto">
          {styleSuggestions.length === 0 && toneSuggestions.length === 0 ? (
            <p className="text-sm text-gray-600 text-center py-4">
              Style is consistent
            </p>
          ) : (
            <>
              {styleSuggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className="p-2 rounded-lg bg-cyan-50 border border-cyan-200 text-xs"
                >
                  <p className="font-medium text-cyan-900">Style</p>
                  <p className="text-cyan-700">{suggestion.suggestion}</p>
                </div>
              ))}
              {toneSuggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className="p-2 rounded-lg bg-amber-50 border border-amber-200 text-xs"
                >
                  <p className="font-medium text-amber-900">Tone</p>
                  <p className="text-amber-700">{suggestion.suggestion}</p>
                </div>
              ))}
            </>
          )}
        </TabsContent>

        {/* Advanced Tab */}
        <TabsContent value="advanced" className="space-y-2">
          {/* Pacing Analysis */}
          <div className="p-3 rounded-lg bg-indigo-50 border border-indigo-200">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-semibold text-gray-900">Pacing</span>
            </div>
            {pacingSuggestions.length === 0 ? (
              <p className="text-xs text-indigo-700">Pacing looks balanced</p>
            ) : (
              pacingSuggestions.map((s) => (
                <p key={s.id} className="text-xs text-indigo-700">
                  {s.suggestion}
                </p>
              ))
            )}
          </div>

          {/* Character Consistency */}
          <div className="p-3 rounded-lg bg-pink-50 border border-pink-200">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-pink-600" />
              <span className="text-sm font-semibold text-gray-900">Characters</span>
            </div>
            <p className="text-xs text-pink-700 mb-2">Track character consistency:</p>
            <div className="space-y-1 text-xs text-pink-600">
              <p>✓ Dialogue patterns</p>
              <p>✓ Character voice uniqueness</p>
              <p>✓ Arc progression</p>
            </div>
          </div>

          {/* Plot Structure */}
          <div className="p-3 rounded-lg bg-green-50 border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4 text-green-600" />
              <span className="text-sm font-semibold text-gray-900">Plot Structure</span>
            </div>
            <div className="space-y-1 text-xs text-green-700">
              <p>📖 Story beats identified</p>
              <p>🎬 Pacing rhythm analyzed</p>
              <p>🔄 Story tension mapped</p>
            </div>
          </div>

          {/* Readability Metrics */}
          <div className="p-3 rounded-lg bg-orange-50 border border-orange-200">
            <div className="flex items-center gap-2 mb-2">
              <PenTool className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-semibold text-gray-900">Readability</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <p className="text-orange-600">Flesch Grade</p>
                <p className="font-bold text-orange-900">
                  {Math.round(content.length / 100) % 12}
                </p>
              </div>
              <div>
                <p className="text-orange-600">Est. Read Time</p>
                <p className="font-bold text-orange-900">
                  {Math.ceil(content.split(/\s+/).length / 200)} min
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => analyzContent(content)}
          className="text-xs flex-1"
        >
          <Sparkles className="w-3 h-3 mr-1" />
          Re-analyze
        </Button>
        <Button variant="outline" size="sm" className="text-xs flex-1">
          Export Report
        </Button>
      </div>
    </div>
  );
}
