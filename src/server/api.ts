import { createServerFn } from "@tanstack/react-start";
import { prisma } from "./db";

// Helper to serialize dates to strings for TanStack Router
const serialize = (data: any) => JSON.parse(JSON.stringify(data));

// Players / Roster
export const getPlayers = createServerFn({ method: "GET" })
  .handler(async () => {
    return serialize(await prisma.player.findMany({
      orderBy: { kd: "desc" },
    }));
  });

export const getPlayerByIgn = createServerFn({ method: "GET" })
  .inputValidator((ign: string) => ign)
  .handler(async ({ data: ign }) => {
    return serialize(await prisma.player.findUnique({ where: { ign } }));
  });

export const upsertPlayer = createServerFn({ method: "POST" })
  .inputValidator((data: {
    id?: string;
    name: string; ign: string; role: string; image: string;
    kd: number; finishes: number; accuracy: number; headshot: number;
    matches: number; winRate: number; mvp: number; status: string;
    insta?: string; yt?: string;
  }) => data)
  .handler(async ({ data }) => {
    const { id, ...fields } = data;
    if (id) {
      return serialize(await prisma.player.update({ where: { id }, data: fields }));
    }
    return serialize(await prisma.player.create({ data: fields }));
  });

export const deletePlayer = createServerFn({ method: "POST" })
  .inputValidator((id: string) => id)
  .handler(async ({ data: id }) => {
    await prisma.player.delete({ where: { id } });
    return { success: true };
  });

// Tournaments
export const getTournaments = createServerFn({ method: "GET" })
  .handler(async () => {
    return serialize(await prisma.tournament.findMany({
      orderBy: { createdAt: "desc" },
    }));
  });

// Scrims
export const getScrims = createServerFn({ method: "GET" })
  .handler(async () => {
    return serialize(await prisma.scrim.findMany({
      orderBy: { date: "desc" },
    }));
  });

// News
export const getNews = createServerFn({ method: "GET" })
  .handler(async () => {
    return serialize(await prisma.news.findMany({
      orderBy: { createdAt: "desc" },
    }));
  });

// Tryouts (Public submission)
export const submitTryout = createServerFn({ method: "POST" })
  .inputValidator((data: { name: string; ign: string; uid: string; kd: string; contact: string; experience: string }) => data)
  .handler(async ({ data }) => {
    return serialize(await prisma.tryout.create({
      data,
    }));
  });

// Tryouts (Admin view)
export const getTryouts = createServerFn({ method: "GET" })
  .handler(async () => {
    return serialize(await prisma.tryout.findMany({
      orderBy: { createdAt: "desc" },
    }));
  });

export const updateTryoutStatus = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string; status: string }) => data)
  .handler(async ({ data }) => {
    return serialize(await prisma.tryout.update({
      where: { id: data.id },
      data: { status: data.status },
    }));
  });

// Merch
export const getMerch = createServerFn({ method: "GET" })
  .handler(async () => {
    return serialize(await prisma.merch.findMany({
      orderBy: { createdAt: "desc" },
    }));
  });
