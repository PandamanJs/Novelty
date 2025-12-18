import { useState } from "react";
import { Bold, Italic, Heading2, List, Link, Quote } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  wordGoal?: number;
  placeholder?: string;
  autosave?: boolean;
  onSave?: (value: string) => void;
}

export function RichTextEditor({
  value,
  onChange,
  wordGoal,
  placeholder = "Start writing...",
  autosave = true,
  onSave,
}: RichTextEditorProps) {
  const [isSaved, setIsSaved] = useState(true);
  const wordCount = value.trim().split(/\s+/).filter(Boolean).length;
  const progress = wordGoal ? (wordCount / wordGoal) * 100 : 0;

  const insertMarkdown = (before: string, after: string = "") => {
    const textarea = document.querySelector("textarea") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.substring(start, end);
    const newValue =
      value.substring(0, start) + before + selected + after + value.substring(end);

    onChange(newValue);

    // Restore selection
    setTimeout(() => {
      textarea.selectionStart = start + before.length;
      textarea.selectionEnd = start + before.length + selected.length;
    }, 0);
  };

  const handleChange = (newValue: string) => {
    onChange(newValue);
    setIsSaved(false);

    if (autosave) {
      const timer = setTimeout(() => {
        onSave?.(newValue);
        setIsSaved(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  };

  return (
    <div className="space-y-2">
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 rounded-lg bg-gray-50 border border-gray-200 flex-wrap">
        <div className="flex items-center gap-1 border-r border-gray-300 pr-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => insertMarkdown("**", "**")}
            title="Bold"
            className="h-8 w-8 p-0"
          >
            <Bold className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => insertMarkdown("*", "*")}
            title="Italic"
            className="h-8 w-8 p-0"
          >
            <Italic className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => insertMarkdown("## ", "\n")}
            title="Heading"
            className="h-8 w-8 p-0"
          >
            <Heading2 className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-1 border-r border-gray-300 pr-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => insertMarkdown("- ", "\n")}
            title="List"
            className="h-8 w-8 p-0"
          >
            <List className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => insertMarkdown("> ", "\n")}
            title="Quote"
            className="h-8 w-8 p-0"
          >
            <Quote className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex-1" />

        {/* Status Indicators */}
        <div className="flex items-center gap-2">
          {!isSaved && autosave && (
            <span className="text-xs text-amber-600 font-medium">Saving...</span>
          )}
          {isSaved && autosave && (
            <span className="text-xs text-green-600 font-medium">✓ Saved</span>
          )}
          <Badge variant="secondary" className="text-xs">
            {wordCount} words
          </Badge>
          {wordGoal && (
            <Badge
              variant={progress >= 100 ? "default" : "outline"}
              className="text-xs"
            >
              {Math.round(progress)}%
            </Badge>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      {wordGoal && (
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600 font-medium">Word Goal Progress</span>
            <span className="text-xs text-gray-700">
              {wordCount} / {wordGoal}
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all ${
                progress >= 100
                  ? "bg-green-500"
                  : progress >= 75
                  ? "bg-blue-500"
                  : progress >= 50
                  ? "bg-yellow-500"
                  : "bg-orange-500"
              }`}
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* Editor */}
      <Textarea
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-96 border border-gray-200 rounded-lg p-4 resize-none text-sm leading-relaxed focus:ring-2 focus:ring-blue-500"
      />

      {/* Word Count Stats */}
      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="p-2 rounded-lg bg-gray-50 border border-gray-200">
          <p className="text-xs text-gray-600">Words</p>
          <p className="text-lg font-bold text-gray-900">{wordCount}</p>
        </div>
        <div className="p-2 rounded-lg bg-gray-50 border border-gray-200">
          <p className="text-xs text-gray-600">Characters</p>
          <p className="text-lg font-bold text-gray-900">{value.length}</p>
        </div>
        <div className="p-2 rounded-lg bg-gray-50 border border-gray-200">
          <p className="text-xs text-gray-600">Paragraphs</p>
          <p className="text-lg font-bold text-gray-900">
            {value.split("\n\n").filter((p) => p.trim()).length}
          </p>
        </div>
        <div className="p-2 rounded-lg bg-gray-50 border border-gray-200">
          <p className="text-xs text-gray-600">Read Time</p>
          <p className="text-lg font-bold text-gray-900">
            {Math.ceil(wordCount / 200)}
            <span className="text-xs">m</span>
          </p>
        </div>
      </div>
    </div>
  );
}
