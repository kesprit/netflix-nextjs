"use server";
import { revalidatePath } from "next/cache";
import prisma from "./utils/db";
import { get } from "http";
import { getServerSession } from "next-auth";
import { authOptions } from "./utils/auth";

export async function addToWatchlist(fromData: FormData) {
  "use server";
  const movieId = fromData.get("movieId");
  const pathName = fromData.get("pathname") as string;
  const session = await getServerSession(authOptions);

  const data = await prisma.watchList.create({
    data: {
      userId: session?.user?.email as string,
      movieId: Number(movieId),
    },
  });

  revalidatePath(pathName);
}

export async function deleteFromWatchlist(fromData: FormData) {
  "use server";
  const watchListId = fromData.get("watchlistId") as string;
  const pathName = fromData.get("pathname") as string;

  const data = await prisma.watchList.delete({
    where: {
      id: watchListId,
    },
  });

  revalidatePath(pathName);
}
