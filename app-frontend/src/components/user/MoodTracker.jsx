import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Smile, Meh, Frown, ThumbsUp, Heart, Star } from "lucide-react";

const moodOptions = [
  { mood: "Fantastic", icon: Star, color: "text-yellow-500" },
  { mood: "Happy", icon: Smile, color: "text-green-500" },
  { mood: "Okay", icon: Meh, color: "text-blue-500" },
  { mood: "Sad", icon: Frown, color: "text-red-500" },
  { mood: "Grateful", icon: Heart, color: "text-pink-500" },
  { mood: "Confident", icon: ThumbsUp, color: "text-purple-500" },
];

export default function MoodTracker({ className }) {
  const [selectedMood, setSelectedMood] = useState(null);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>How are you feeling today?</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 ">
          {moodOptions.map((option) => (
            <Button
              key={option.mood}
              variant={selectedMood === option.mood ? "default" : "outline"}
              className={`h-24 flex flex-col items-center justify-center ${
                selectedMood === option.mood ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedMood(option.mood)}
            >
              <option.icon className={`h-8 w-8 ${option.color}`} />
              <span className="mt-2 text-sm text-black ">{option.mood}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
