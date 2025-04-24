import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
const quotes = [
  {
    text: "Self-care is not a luxury; it is a necessity.",
    author: "Audre Lorde",
  },
  {
    text: "Caring for myself is not self-indulgence, it is self-preservation.",
    author: "Audre Lorde",
  },
  {
    text: "You are allowed to be both a masterpiece and a work in progress simultaneously.",
    author: "Sophia Bush",
  },
  {
    text: "Be yourself; everyone else is already taken.",
    author: "Oscar Wilde",
  },
  {
    text: "Loving yourself isn't vanity; it's sanity.",
    author: "Katrina Mayer",
  },
  {
    text: "The better you feel about yourself, the less you feel the need to show off.",
    author: "Robert Hand",
  },
  { text: "You are enough just as you are.", author: "Meghan Markle" },
  {
    text: "Self-love is the source of all our other loves.",
    author: "Pierre Corneille",
  },
  {
    text: "Love yourself first and everything else falls into line.",
    author: "Lucille Ball",
  },
  {
    text: "Self-care is not about self-indulgence, it's about self-respect.",
    author: "Joanne O'Connor",
  },
  {
    text: "Self-care is never a selfish act—it is simply good stewardship of the only gift I have...",
    author: "Parker Palmer",
  },
  {
    text: "One of the greatest regrets in life is being what others would want you to be...",
    author: "Shannon L. Alder",
  },
  {
    text: "Don't worry if people think you're crazy. You have that kind of intoxicating insanity...",
    author: "Jennifer Elisabeth",
  },
  {
    text: "It's all about falling in love with yourself and sharing that love...",
    author: "Eartha Kitt",
  },
  {
    text: "It is interesting how often we can't see all the ways in which we are being strong.",
    author: "Lena Dunham",
  },
  {
    text: "Self love is an ocean and your heart is a vessel...",
    author: "Beau Taplin",
  },
  {
    text: "I took a deep breath and listened to the old brag of my heart. I am, I am, I am.",
    author: "Sylvia Plath",
  },
  {
    text: "Do not feel lonely, the entire universe is inside you...",
    author: "Rumi",
  },
  { text: "Your self-worth is determined by you...", author: "Beyoncé" },
  {
    text: "Once you've accepted your flaws, no one can use them against you.",
    author: "George R.R. Martin",
  },
  {
    text: "The hardest challenge is to be yourself in a world where everyone is trying...",
    author: "E.E Cummings",
  },
  {
    text: "Life isn't about finding yourself. Life is about creating yourself.",
    author: "George Bernard Shaw",
  },
  {
    text: "If you're not someone who has a natural love for yourself...",
    author: "Anne Hathaway",
  },
  {
    text: "My mission... is to find peace with exactly who and what I am.",
    author: "Anaïs Nin",
  },
  {
    text: "There is you and you. This is a relationship. This is the most important relationship.",
    author: "Nayyirah Waheed",
  },
  {
    text: "Not only do self-love and love of others go hand in hand...",
    author: "M. Scott Peck",
  },
  {
    text: "I must undertake to love myself and to respect myself...",
    author: "Maya Angelou",
  },
  {
    text: "When you take care of yourself, you're a better person for others...",
    author: "Solange Knowles",
  },
  {
    text: "Self-love, my liege, is not so vile a sin, as self-neglecting.",
    author: "William Shakespeare",
  },
  {
    text: "For me, self-love is like, 'Am I sleeping enough? Eating well?'...",
    author: "Kerry Washington",
  },
  {
    text: "If you have no confidence in self, you are twice defeated in the race of life.",
    author: "Marcus Garvey",
  },
  {
    text: "Who looks outside, dreams; who looks inside, awakes.",
    author: "Carl Gustav Jung",
  },
  {
    text: "Be a first-rate version of yourself, not a second-rate version of someone else.",
    author: "Judy Garland",
  },
  {
    text: "Your relationship with yourself sets the tone for every other relationship...",
    author: "Robert Holden",
  },
  {
    text: "Respect yourself, love yourself, because there has never been a person like you...",
    author: "Osho",
  },
  {
    text: "Remind yourself that you cannot fail at being yourself.",
    author: "Wayne Dyer",
  },
  {
    text: "You have to believe in yourself when no one else does—that makes you a winner.",
    author: "Jack Canfield",
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
