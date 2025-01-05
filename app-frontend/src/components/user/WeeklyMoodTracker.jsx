import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Smile, Meh, Frown } from "lucide-react";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const moodOptions = [
  { mood: "good", icon: Smile, color: "text-green-500" },
  { mood: "okay", icon: Meh, color: "text-yellow-500" },
  { mood: "bad", icon: Frown, color: "text-red-500" },
];

export function WeeklyMoodTracker() {
  const [moodData, setMoodData] = useState(
    weekDays.map(() => ({ mood: "", icon: null, color: "" }))
  );

  const setMood = (dayIndex, mood) => {
    const newMoodData = [...moodData];
    newMoodData[dayIndex] = mood;
    setMoodData(newMoodData);
  };

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Weekly Mood Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day, index) => (
            <div key={day} className="flex flex-col items-center">
              <span className="text-sm font-medium mb-2">{day}</span>
              {/* {moodData[index].icon ? (
                <moodData[index].icon className={`h-8 w-8 ${moodData[index].color}`} />
              ) : (
                <div className="flex flex-col space-y-2">
                  {moodOptions.map((option) => (
                    <Button
                      key={option.mood}
                      variant="outline"
                      size="sm"
                      className="p-1"
                      onClick={() => setMood(index, option)}
                    >
                      <option.icon className={`h-4 w-4 ${option.color}`} />
                    </Button>
                  ))}
                </div>
              )} */}
              {moodData[index].icon ? (
                React.createElement(moodData[index].icon, {
                  className: `h-8 w-8 ${moodData[index].color}`,
                })
              ) : (
                <div className="flex flex-col space-y-2">
                  {moodOptions.map((option) => (
                    <Button
                      key={option.mood}
                      variant="outline"
                      size="sm"
                      className="p-1"
                      onClick={() => setMood(index, option)}
                    >
                      <option.icon className={`h-4 w-4 ${option.color}`} />
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
