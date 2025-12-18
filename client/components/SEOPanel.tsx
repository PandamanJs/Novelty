import { useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface SEOData {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  slug: string;
}

interface SEOPanelProps {
  title?: string;
  onSEOChange?: (seo: SEOData) => void;
}

export function SEOPanel({ title = "", onSEOChange }: SEOPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [seo, setSEO] = useState<SEOData>({
    metaTitle: title || "Untitled Story",
    metaDescription: "",
    keywords: [],
    slug: title?.toLowerCase().replace(/\s+/g, "-") || "untitled",
  });
  const [newKeyword, setNewKeyword] = useState("");

  const addKeyword = () => {
    if (newKeyword.trim() && seo.keywords.length < 5) {
      const updated = {
        ...seo,
        keywords: [...seo.keywords, newKeyword.trim()],
      };
      setSEO(updated);
      onSEOChange?.(updated);
      setNewKeyword("");
    }
  };

  const removeKeyword = (keyword: string) => {
    const updated = {
      ...seo,
      keywords: seo.keywords.filter((k) => k !== keyword),
    };
    setSEO(updated);
    onSEOChange?.(updated);
  };

  const handleChange = (field: keyof SEOData, value: string) => {
    const updated = { ...seo, [field]: value };
    setSEO(updated);
    onSEOChange?.(updated);
  };

  if (!isOpen) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="w-full justify-start text-gray-600 hover:text-black hover:bg-gray-100"
      >
        <Search className="w-4 h-4 mr-2" />
        <span>SEO Settings</span>
      </Button>
    );
  }

  return (
    <Card className="absolute top-full mt-2 right-0 w-96 p-4 z-50 shadow-lg border border-gray-200 bg-white max-h-96 overflow-y-auto fade-in-up">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Search className="w-5 h-5" style={{ color: "#0071e3" }} />
          <h3 className="font-semibold text-black">SEO Settings</h3>
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

      <div className="space-y-4">
        {/* Meta Title */}
        <div>
          <label className="text-xs font-semibold text-foreground uppercase opacity-70">
            Meta Title
          </label>
          <Input
            value={seo.metaTitle}
            onChange={(e) => handleChange("metaTitle", e.target.value)}
            placeholder="Title for search engines"
            className="h-8 text-sm mt-1"
            maxLength={60}
          />
          <p className="text-xs text-muted-foreground mt-1">
            {seo.metaTitle.length}/60 characters
          </p>
        </div>

        {/* Meta Description */}
        <div>
          <label className="text-xs font-semibold text-foreground uppercase opacity-70">
            Meta Description
          </label>
          <Textarea
            value={seo.metaDescription}
            onChange={(e) => handleChange("metaDescription", e.target.value)}
            placeholder="Summary for search engines"
            className="text-sm mt-1 resize-none min-h-[60px]"
            maxLength={160}
          />
          <p className="text-xs text-muted-foreground mt-1">
            {seo.metaDescription.length}/160 characters
          </p>
        </div>

        {/* URL Slug */}
        <div>
          <label className="text-xs font-semibold text-foreground uppercase opacity-70">
            URL Slug
          </label>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-muted-foreground">/</span>
            <Input
              value={seo.slug}
              onChange={(e) => handleChange("slug", e.target.value.toLowerCase().replace(/\s+/g, "-"))}
              placeholder="url-slug"
              className="h-8 text-sm flex-1"
            />
          </div>
        </div>

        {/* Keywords */}
        <div>
          <label className="text-xs font-semibold text-foreground uppercase opacity-70">
            Keywords ({seo.keywords.length}/5)
          </label>
          <div className="flex gap-2 mt-2">
            <Input
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addKeyword()}
              placeholder="Add keyword"
              className="h-8 text-sm flex-1"
            />
            <Button
              onClick={addKeyword}
              size="sm"
              disabled={!newKeyword.trim() || seo.keywords.length >= 5}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {seo.keywords.map((keyword) => (
              <div
                key={keyword}
                className="px-2 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center gap-1 text-xs"
              >
                <span>{keyword}</span>
                <button
                  onClick={() => removeKeyword(keyword)}
                  className="hover:opacity-70"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* SEO Score */}
        <div className="p-3 rounded-lg bg-secondary/30 border border-border/50">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-foreground">SEO Score</p>
            <span className="text-sm font-bold text-green-500">75/100</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: "75%" }} />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            ✓ Good meta title and description
            <br />✓ Keywords defined
            <br />✕ Add more internal links
          </p>
        </div>
      </div>
    </Card>
  );
}
