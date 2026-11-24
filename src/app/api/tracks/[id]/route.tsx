import { NextRequest, NextResponse } from "next/server";
import { getTracksByAlbum } from "@/app/utils/apliClient";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") || req.nextUrl.pathname.split("/").pop();

  if (!id)
    return NextResponse.json(
      { error: "Falta el ID del álbum" },
      { status: 400 }
    );

  const tracks = await getTracksByAlbum(id);

  if (tracks.length === 0)
    return NextResponse.json(
      { error: "No hay canciones en este álbum" },
      { status: 404 }
    );

  return NextResponse.json(tracks);
}
