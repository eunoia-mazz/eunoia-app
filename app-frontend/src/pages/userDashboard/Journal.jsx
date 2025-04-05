import DashboardShell from "@/components/user/DashboardShell";
import DashboardHeader from "@/components/user/DashboardHeader";
import { Card } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import useStore from "../../useStore";
function Journal() {
  const [selectedMood, setSelectedMood] = useState(null);
  const clientId = useStore((state) => state.clientId);
  const [journal, setJournal] = useState("");
  const quotes = [
    "Take it one day at a time.",
    "Keep pushing forward, you're doing great!",
    "Small steps lead to big changes.",
    "Believe in yourself and all that you are.",
    "You are stronger than you think.",
    "Every day is a new beginning.",
    "One step at a time, one day at a time.",
    "Progress, not perfection.",
    "Healing begins with self-compassion.",
    "You are worthy of peace and happiness.",
    "It's okay to not be okay sometimes.",
    "Strength grows in the moments you think you can't go on but you keep going.",
    "Your journey is unique, trust it.",
    "Take care of your mind; it's the foundation of everything.",
    "Your mental health is just as important as your physical health.",
    "Every setback is a setup for a comeback.",
    "You don't have to face this alone.",
    "Self-care is not selfish, it's necessary.",
  ];

  const [quote, setQuote] = useState("");

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);

  function addJournal() {
    const mood = getMoodLabel();
    let values = {};
    if (mood) {
      values = {
        user_id: clientId,
        mood,
        questionaire: true,
      };
    } else {
      values = {
        user_id: clientId,
        text: journal,
        journal: true,
      };
    }
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
  function getMoodLabel() {
    const mood = moods.find((mood) => mood.emoji === selectedMood);
    return mood ? mood.label : null;
  }

  const moods = [
    { emoji: "😊", label: "Happy" },
    { emoji: "😞", label: "Sad" },
    { emoji: "😡", label: "Angry" },
    { emoji: "😅", label: "Nervous" },
    { emoji: "😢", label: "Crying" },
    { emoji: "🥰", label: "Loved" },
    { emoji: "😎", label: "Cool" },
    { emoji: "😴", label: "Tired" },
    { emoji: "😌", label: "Relaxed" },
    { emoji: "🤔", label: "Thoughtful" },
    { emoji: "😱", label: "Scared" },
    { emoji: "😜", label: "Playful" },
    { emoji: "🤗", label: "Hugged" },
    { emoji: "😬", label: "Embarrassed" },
    { emoji: "🥺", label: "Feeling small" },
    { emoji: "🤩", label: "Excited" },
  ];

  return (
    <DashboardShell>
      <Helmet>
        <title>Journal | Dashboard</title>
        <meta
          name="description"
          content="Manage therapists on the Eunoia platform"
        />
      </Helmet>
      <DashboardHeader
        heading="My Journal"
        text="Express your thoughts, reflect your feelings, and embrace your journey."
      />
      <Card>
        <div className="p-5 bg-blue-50 min-h-screen">
          <div className="mt-5">
            <textarea
              name="journal"
              value={journal}
              onChange={(e) => setJournal(e.target.value)}
              placeholder="Share your thoughts, emotions, or anything that's on your mind today..."
              className="w-full h-48 mt-3 px-4 py-2 text-lg border border-gray-300 rounded-md"
            />
          </div>

          <div className="mt-5 text-center">
            <p className="text-2xl font-semibold text-blue-500 mb-3">
              How are you feeling?
            </p>
            <div className="grid grid-cols-4 gap-4 justify-center">
              {moods.map((mood, index) => (
                <div key={index} className="flex flex-col items-center">
                  <button
                    className={`text-4xl ${
                      selectedMood === mood.emoji
                        ? "bg-blue-200"
                        : "bg-transparent"
                    } p-2 rounded-md`}
                    onClick={() => setSelectedMood(mood.emoji)}
                  >
                    {mood.emoji}
                  </button>
                  <span className="text-sm text-gray-600 mt-2">
                    {mood.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-5">
            <button
              className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={addJournal}
            >
              Save Entry
            </button>
          </div>

          <footer className="text-center mt-10">
            <p className="text-xl font-semibold text-gray-600 italic">
              {quote}
            </p>
          </footer>
        </div>
      </Card>
    </DashboardShell>
  );
}

export default Journal;
