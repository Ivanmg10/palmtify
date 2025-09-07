import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") || req.nextUrl.pathname.split("/").pop();

  if (!id)
    return NextResponse.json(
      { error: "Falta el ID del artista" },
      { status: 400 }
    );

  try {
    const response = await fetch(
      `https://theaudiodb.com/api/v1/json/123/album.php?i=${encodeURIComponent(
        id
      )}`
    );

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json(
        { error: "Error en TheAudioDB", body: text },
        { status: response.status }
      );
    }

    const data = await response.json();
    if (!data.album)
      return NextResponse.json(
        { error: "No hay álbumes para este artista" },
        { status: 404 }
      );

    return NextResponse.json(data.album);
  } catch (error) {
    return NextResponse.json(
      { error: "Error llamando a TheAudioDB" },
      { status: 500 }
    );
  }
}
