import {
  BrainCogIcon,
  PackageIcon,
  ThumbsUpIcon,
  TrophyIcon,
  UsersIcon,
  ZapIcon,
} from "lucide-react";

const featureData = [
  {
    title: "Chatbot",
    description:
      "Instant support through an AI-powered chatbot to guide you on your mental health journey.",
    icon: (
      <BrainCogIcon className="flex-shrink-0 mt-2 h-8 w-8 text-[#4A90E2]" />
    ),
  },
  {
    title: "Hotline / Helpline",
    description:
      "Access to 24/7 mental health support via a dedicated hotline or helpline.",
    icon: <PackageIcon className="flex-shrink-0 mt-2 h-8 w-8 text-[#4A90E2]" />,
  },
  {
    title: "Commercial Chat Forums",
    description:
      "Join community forums to discuss mental health and well-being with peers.",
    icon: (
      <ThumbsUpIcon className="flex-shrink-0 mt-2 h-8 w-8 text-[#4A90E2]" />
    ),
  },
  {
    title: "Journaling",
    description:
      "Reflect on your thoughts and feelings with an integrated journaling tool.",
    icon: <TrophyIcon className="flex-shrink-0 mt-2 h-8 w-8 text-[#4A90E2]" />,
  },
  {
    title: "Questionnaires",
    description:
      "Take mental health questionnaires to assess and track your progress.",
    icon: <UsersIcon className="flex-shrink-0 mt-2 h-8 w-8 text-[#4A90E2]" />,
  },
  {
    title: "Mood Tracking",
    description:
      "Track and monitor your mood over time for better emotional awareness.",
    icon: <ZapIcon className="flex-shrink-0 mt-2 h-8 w-8 text-[#4A90E2]" />,
  },
];

export default function Features() {
  return (
    <div className="my-10 w-full flex flex-col items-center">
      <p className="w-full text-5xl font-bold text-blue-500 text-center py-5">
        Empower Your Mind with Eunoia
      </p>
      <p className="w-full text-xl font-semibold text-center mb-5 ">
        A mental health app designed to nurture, uplift, and guide you toward
        well-being
      </p>
      <div className="w-5/6 flex justify-center items-center">
        <div className="w-full max-w-6xl flex flex-wrap justify-evenly">
          {featureData.map((feature, index) => (
            <div
              key={index}
              className="flex w-full md:w-5/12 space-x-5 lg:space-x-8"
            >
              {feature.icon}
              <div>
                <h3 className="sm:text-lg font-semibold text-[#2C3E50]">
                  {feature.title}
                </h3>
                <p className="mt-1 font-normal text-base text-[#333333]">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
