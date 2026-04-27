import player1 from "@/assets/player-1.jpg";
import player2 from "@/assets/player-2.jpg";
import player3 from "@/assets/player-3.jpg";
import player4 from "@/assets/player-4.jpg";
import player5 from "@/assets/player-5.jpg";

export const teamStats = {
  wins: 47,
  tournaments: 86,
  prize: "₹1.2Cr+",
  fans: "320K+",
};

export type Player = {
  id: string;
  name: string;
  ign: string;
  role: string;
  image: string;
  kd: number;
  finishes: number;
  accuracy: number;
  mvp: number;
  status: "active" | "past";
};

export const roster: Player[] = [
  { id: "zod-reaper", name: "Aarav Singh", ign: "ZOD•REAPER", role: "IGL", image: player1, kd: 5.4, finishes: 1820, accuracy: 38, mvp: 22, status: "active" },
  { id: "zod-frost", name: "Kabir Mehta", ign: "ZOD•FROST", role: "Assaulter", image: player2, kd: 4.8, finishes: 2140, accuracy: 41, mvp: 18, status: "active" },
  { id: "zod-ghost", name: "Rohit Verma", ign: "ZOD•GHOST", role: "Sniper", image: player3, kd: 4.1, finishes: 1410, accuracy: 47, mvp: 14, status: "active" },
  { id: "zod-blaze", name: "Aditya Rao", ign: "ZOD•BLAZE", role: "Support", image: player4, kd: 3.6, finishes: 1290, accuracy: 36, mvp: 9, status: "active" },
  { id: "zod-sensei", name: "Vikrant Joshi", ign: "ZOD•SENSEI", role: "Coach", image: player5, kd: 0, finishes: 0, accuracy: 0, mvp: 0, status: "active" },
];

export const pastMembers: Player[] = [
  { id: "zod-viper", name: "Imran Khan", ign: "ZOD•VIPER", role: "Assaulter", image: player2, kd: 4.2, finishes: 980, accuracy: 39, mvp: 7, status: "past" },
  { id: "zod-storm", name: "Neeraj Patel", ign: "ZOD•STORM", role: "Sniper", image: player3, kd: 3.8, finishes: 760, accuracy: 44, mvp: 5, status: "past" },
];

export const tournaments = [
  { name: "BGMI Masters Series 2026", placement: "1st", prize: "₹40,00,000", date: "Mar 2026", status: "won" as const },
  { name: "BGIS Grand Finals", placement: "2nd", prize: "₹25,00,000", date: "Feb 2026", status: "won" as const },
  { name: "Skyesports Champions", placement: "3rd", prize: "₹12,00,000", date: "Jan 2026", status: "won" as const },
  { name: "Battlegrounds Mobile Open Challenge", placement: "Live", prize: "₹50,00,000", date: "Apr 2026", status: "live" as const },
  { name: "ESL Snapdragon Pro Series", placement: "Upcoming", prize: "₹30,00,000", date: "May 2026", status: "upcoming" as const },
];

export const scrims = [
  { date: "26 Apr", lobby: "Tier-1 Pro Scrims", placement: 1, points: 84, mvp: "ZOD•REAPER" },
  { date: "25 Apr", lobby: "Tier-1 Pro Scrims", placement: 2, points: 72, mvp: "ZOD•FROST" },
  { date: "24 Apr", lobby: "Wildcard Lobby", placement: 1, points: 91, mvp: "ZOD•GHOST" },
  { date: "23 Apr", lobby: "Tier-1 Pro Scrims", placement: 4, points: 58, mvp: "ZOD•FROST" },
  { date: "22 Apr", lobby: "Open Trial Lobby", placement: 1, points: 88, mvp: "ZOD•BLAZE" },
];

export const news = [
  { id: "n1", title: "ZOD claim BGMI Masters Series 2026 crown", date: "Mar 28, 2026", category: "Tournament", excerpt: "A clinical final-day performance saw TEAM ZOD finish atop the table with a 12-point lead." },
  { id: "n2", title: "Player Spotlight: ZOD•REAPER on leading the pack", date: "Mar 18, 2026", category: "Player", excerpt: "Our IGL talks comms, calling the rotates, and the mindset behind a 5.4 KD season." },
  { id: "n3", title: "Roster move: Welcoming ZOD•BLAZE to the active five", date: "Feb 22, 2026", category: "Announcement", excerpt: "After a stellar tryout cycle, BLAZE joins the squad as our new Support player." },
  { id: "n4", title: "Inside the bootcamp: 14 hours, 7 days a week", date: "Feb 02, 2026", category: "Behind the scenes", excerpt: "We open the doors to the ZOD facility ahead of the 2026 grand season." },
];

export const upcomingMatch = {
  event: "Battlegrounds Mobile Open Challenge — Grand Finals",
  opponent: "vs. Top 16 squads",
  // 7 days from now-ish; computed at render time
  daysFromNow: 7,
};