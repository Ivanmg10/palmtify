import { NextRequest, NextResponse } from "next/server";
import { getArtist } from "@/app/utils/apliClient";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name =
    searchParams.get("name") || req.nextUrl.pathname.split("/").pop();

  if (!name)
    return NextResponse.json(
      { error: "Falta el nombre del artista" },
      { status: 400 }
    );

  const artist = await getArtist(name);

  if (!artist)
    return NextResponse.json(
      { error: "Artista no encontrado" },
      { status: 404 }
    );

  return NextResponse.json(artist);
}
