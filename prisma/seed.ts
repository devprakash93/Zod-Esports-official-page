import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/lib/auth";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Clear existing data (optional, useful for clean seeds)
  await prisma.player.deleteMany({});
  await prisma.tournament.deleteMany({});
  await prisma.news.deleteMany({});

  // Admin user
  const hashedPassword = await hashPassword("password123");
  await prisma.user.upsert({
    where: { email: "admin@teamzod.com" },
    update: {},
    create: {
      email: "admin@teamzod.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  // Active roster
  const activePlayers = [
    { name: "Aarav Singh", ign: "ZOD•REAPER", role: "IGL", image: "/src/assets/player-1.jpg", kd: 5.4, finishes: 1820, accuracy: 38, headshot: 22.5, matches: 337, winRate: 18.5, mvp: 22, status: "active", insta: "https://instagram.com/reaper.ig", yt: "https://youtube.com/@reapergaming" },
    { name: "Kabir Mehta", ign: "ZOD•FROST", role: "Assaulter", image: "/src/assets/player-2.jpg", kd: 4.8, finishes: 2140, accuracy: 41, headshot: 28.1, matches: 445, winRate: 14.2, mvp: 18, status: "active", insta: "https://instagram.com/frost.plays", yt: "https://youtube.com/@frostbgmi" },
    { name: "Rohit Verma", ign: "ZOD•GHOST", role: "Sniper", image: "/src/assets/player-3.jpg", kd: 4.1, finishes: 1410, accuracy: 47, headshot: 35.0, matches: 343, winRate: 16.1, mvp: 14, status: "active", insta: "https://instagram.com/ghost.zod", yt: "https://youtube.com/@ghostzod" },
    { name: "Aditya Rao", ign: "ZOD•BLAZE", role: "Support", image: "/src/assets/player-4.jpg", kd: 3.6, finishes: 1290, accuracy: 36, headshot: 18.2, matches: 358, winRate: 19.8, mvp: 9, status: "active", insta: "https://instagram.com/blaze.zod", yt: "https://youtube.com/@blaze.zod" },
    { name: "Vikrant Joshi", ign: "ZOD•SENSEI", role: "Coach", image: "/src/assets/player-5.jpg", kd: 0, finishes: 0, accuracy: 0, headshot: 0, matches: 0, winRate: 0, mvp: 0, status: "active", insta: "https://instagram.com/sensei.zod", yt: "https://youtube.com/@sensei.zod" },
  ];

  for (const player of activePlayers) {
    await prisma.player.upsert({
      where: { ign: player.ign },
      update: {
        insta: player.insta,
        yt: player.yt,
        headshot: player.headshot,
        matches: player.matches,
        winRate: player.winRate
      },
      create: player,
    });
  }

  // Tournaments
  const tournaments = [
    { name: "BGMI Masters Series 2026", placement: "1st", prize: "₹40,00,000", date: "Mar 2026", status: "won" },
    { name: "BGIS Grand Finals", placement: "2nd", prize: "₹25,00,000", date: "Feb 2026", status: "won" },
    { name: "Skyesports Champions", placement: "3rd", prize: "₹12,00,000", date: "Jan 2026", status: "won" },
    { name: "Battlegrounds Mobile Open Challenge", placement: "Live", prize: "₹50,00,000", date: "Apr 2026", status: "live" },
    { name: "ESL Snapdragon Pro Series", placement: "Upcoming", prize: "₹30,00,000", date: "May 2026", status: "upcoming" },
  ];

  for (const tournament of tournaments) {
    await prisma.tournament.create({ data: tournament });
  }

  // News
  const news = [
    { title: "ZOD claim BGMI Masters Series 2026 crown", date: "Mar 28, 2026", category: "Tournament", excerpt: "A clinical final-day performance saw TEAM ZOD finish atop the table with a 12-point lead." },
    { title: "Player Spotlight: ZOD•REAPER on leading the pack", date: "Mar 18, 2026", category: "Player", excerpt: "Our IGL talks comms, calling the rotates, and the mindset behind a 5.4 KD season." },
    { title: "Roster move: Welcoming ZOD•BLAZE to the active five", date: "Feb 22, 2026", category: "Announcement", excerpt: "After a stellar tryout cycle, BLAZE joins the squad as our new Support player." },
  ];

  for (const item of news) {
    await prisma.news.create({ data: item });
  }

  // Scrims
  const scrims = [
    { date: "2026-04-28", lobby: "T1 Custom Scrims", placement: 1, points: 28, kills: 18, mvp: "ZOD•FROST" },
    { date: "2026-04-28", lobby: "T1 Custom Scrims", placement: 3, points: 15, kills: 10, mvp: "ZOD•REAPER" },
    { date: "2026-04-27", lobby: "T1 Custom Scrims", placement: 1, points: 24, kills: 14, mvp: "ZOD•GHOST" },
  ];

  for (const item of scrims) {
    await prisma.scrim.create({ data: item });
  }

  // Merch
  const merch = [
    { name: "ZOD Official Jersey 2026", description: "The official jersey worn by the team during the BMPS run.", price: 1499, image: "/src/assets/gallery-2.jpg", status: "AVAILABLE" },
    { name: "ZOD Tactical Hoodie", description: "Premium black hoodie with neon red accents and stealth branding.", price: 2499, image: "/src/assets/gallery-1.jpg", status: "AVAILABLE" },
  ];

  for (const item of merch) {
    await prisma.merch.create({ data: item });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
