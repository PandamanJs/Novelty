import { useState, useEffect } from "react";
import { Lightbulb, RefreshCw, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

const prompts = [
  "Write about a character receiving unexpected news.",
  "Describe a place you've never been but always wanted to visit.",
  "Write a dialogue between two characters who haven't spoken in years.",
  "Explore a moment that changed everything.",
  "Describe an ordinary object with extraordinary detail.",
  "Write about the last day of something.",
  "Create a scene that reveals a character's fear.",
  "Write about a promise that was broken.",
  "Describe a day from the perspective of someone very different from you.",
  "Write about finding something precious in an unexpected place.",
  "Describe the most important lesson you've learned.",
  "Write a story that begins with: 'I never thought...'",
  "Describe a moment of complete silence.",
  "Write about a character facing their worst nightmare.",
  "Create a scene set entirely in the dark.",
];

interface WritingPromptProps {
  onInsert?: (prompt: string) => void;
}

export function WritingPrompt({ onInsert }: WritingPromptProps) {
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen && !currentPrompt) {
      generateNewPrompt();
    }
  }, [isOpen]);

  const generateNewPrompt = () => {
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    setCurrentPrompt(randomPrompt);
  };

  const handleInsert = () => {
    onInsert?.(currentPrompt);
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="w-full justify-start text-gray-600 hover:text-black hover:bg-gray-100"
      >
        <span>Get Prompt</span>
      </Button>
    );
  }

  return (
    <Card className="absolute top-full mt-2 right-0 w-80 p-4 z-50 shadow-lg border border-gray-200 bg-white fade-in-up">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          <h3 className="font-semibold text-black">Writing Prompt</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(false)}
          className="h-6 w-6 p-0"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <p className="text-sm text-gray-600 mb-4 leading-relaxed italic fade-in">
        "{currentPrompt}"
      </p>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={generateNewPrompt}
          className="flex-1 gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          New
        </Button>
        <Button
          size="sm"
          onClick={handleInsert}
          className="flex-1 bg-primary hover:bg-blue-600 text-primary-foreground"
        >
          Insert
        </Button>
      </div>
    </Card>
  );
}
