import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export default function GoalsTracker({ className }) {
  const [goals, setGoals] = useState([
    { id: 1, text: "Meditate for 10 minutes daily", completed: false },
    { id: 2, text: "Exercise 3 times a week", completed: false },
    { id: 3, text: "Read a self-help book", completed: true },
  ]);
  const [newGoal, setNewGoal] = useState("");

  const addGoal = (e) => {
    e.preventDefault();
    if (newGoal.trim()) {
      setGoals([...goals, { id: Date.now(), text: newGoal, completed: false }]);
      setNewGoal("");
    }
  };

  const toggleGoal = (id) => {
    setGoals(
      goals.map((goal) =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      )
    );
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Goals Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={addGoal} className="flex space-x-2 mb-4">
          <Input
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            placeholder="Add a new goal"
          />
          <Button
            type="submit"
            className="text-white bg-blue-500 hover:bg-blue-600"
          >
            Add
          </Button>
        </form>
        <ul className="space-y-2">
          {goals.map((goal) => (
            <li key={goal.id} className="flex items-center space-x-2">
              <Checkbox
                id={`goal-${goal.id}`}
                checked={goal.completed}
                onCheckedChange={() => toggleGoal(goal.id)}
              />
              <label
                htmlFor={`goal-${goal.id}`}
                className={`flex-grow ${
                  goal.completed ? "line-through text-muted-foreground" : ""
                }`}
              >
                {goal.text}
              </label>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
