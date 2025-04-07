import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Smile,
  Frown,
  Meh,
  AlertTriangle,
  ThumbsDown,
  Star,
  Coffee,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import axios from "axios";
import useStore from "@/useStore";

const moodOptions = [
  { mood: "Happy", icon: Smile, color: "text-green-500" },
  { mood: "Sad", icon: Frown, color: "text-red-500" },
  { mood: "Angry", icon: AlertTriangle, color: "text-orange-500" },
  { mood: "Calm", icon: Meh, color: "text-teal-500" },
  { mood: "Stressed", icon: ThumbsDown, color: "text-purple-500" },
  { mood: "Excited", icon: Star, color: "text-yellow-500" },
  { mood: "Bored", icon: Coffee, color: "text-gray-500" },
  { mood: "Anxious", icon: AlertCircle, color: "text-indigo-500" },
  { mood: "Content", icon: CheckCircle, color: "text-cyan-500" },
];

export default function MoodTracker({ className }) {
  const [selectedMood, setSelectedMood] = useState(null);
  const clientId = useStore((state) => state.clientId);
  function addJournal(option) {
    setSelectedMood(() => option.mood);
    let values = {
      user_id: clientId,
      mood: option.mood,
      questionaire: true,
    };

    axios
      .post("http://localhost:5000/add_journal", values)
      .then((res) => {
        console.log(res);
        alert(res.data.mood);
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
              onClick={() => addJournal(option)}
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
