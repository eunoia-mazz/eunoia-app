import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const quotes = [
  { text: "Self-care is how you take your power back.", author: "Lalah Delia" },
  { text: "You are your best thing.", author: "Toni Morrison" },
  {
    text: "Be patient with yourself. Self-growth is tender; it's holy ground. There's no greater investment.",
    author: "Stephen Covey",
  },
  {
    text: "To love oneself is the beginning of a lifelong romance.",
    author: "Oscar Wilde",
  },
  {
    text: "Talk to yourself like you would to someone you love.",
    author: "Brené Brown",
  },
];

function WellnessQuote() {
  const [quote, setQuote] = useState(quotes[0]);

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);

  return (
    <Card className="bg-blue-500">
      <CardContent className="flex items-start space-x-4 p-6">
        <Quote className="h-8 w-8 mt-1 flex-shrink-0 text-white" />
        <div>
          <p className="text-lg font-medium text-white">{quote.text}</p>
          <p className="mt-2 text-sm opacity-90 text-white">— {quote.author}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default WellnessQuote;
