import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, Sparkles } from "lucide-react";

export default function QuickJournalEntry({ className }) {
  const [entry, setEntry] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Journal entry submitted:", entry);
    setEntry("");
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BookOpen className="h-5 w-5" />
          <span>Quick Journal Entry</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="What's on your mind today?"
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            className="min-h-[120px] resize-none"
          />
          <Button type="submit" className="w-full">
            <Sparkles className="mr-2 h-4 w-4" />
            Save Entry
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
