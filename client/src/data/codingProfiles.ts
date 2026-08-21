// Signal Architecture style reminder: do not fabricate progress metrics; keep profile data easy to update in one place.

export type CodingMetric = {
  label: string;
  value: number;
  suffix?: string;
};

export type CodingProfile = {
  name: string;
  username: string;
  description: string;
  url: string;
  logo: string;
  accent: string;
  metrics: CodingMetric[];
};

export const codingProfiles: CodingProfile[] = [
  {
    name: "LeetCode",
    username: "Yogavelan29",
    description: "Problem Solving · Data Structures & Algorithms",
    url: "https://leetcode.com/u/yogavelan29/",
    logo: "/images/leetcode-logo.png",
    accent: "#f4b43e",
    metrics: [
      { label: "Program count", value: 250, suffix: "+" },
      { label: "Contest rating", value: 1600, suffix: "+" },
    ],
  },
  {
    name: "CodeChef",
    username: "yogavelan29",
    description: "Competitive Programming · Problem Solving",
    url: "https://www.codechef.com/users/yogavelan29",
    logo: "/images/codechef-logo.png",
    accent: "#b58863",
    metrics: [
      { label: "Program count", value: 250, suffix: "+" },
      { label: "Contest rating", value: 1300, suffix: "+" },
    ],
  },
  {
    name: "SkillRack",
    username: "YOGAVELAN M D",
    description: "Programming Practice · Coding Exercises",
    url: "https://www.skillrack.com/faces/resume.xhtml?id=491649&key=4e0c6c255db5c492ab9cceac13e62ec03773a1a3",
    logo: "/images/skillrack-logo.jpg",
    accent: "#57b7e8",
    metrics: [
      { label: "Program count", value: 250, suffix: "+" },
    ],
  },
];
