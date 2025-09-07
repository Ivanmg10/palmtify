import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name =
    searchParams.get("name") || req.nextUrl.pathname.split("/").pop();

  if (!name)
    return NextResponse.json(
      { error: "Falta el nombre del artista" },
      { status: 400 }
    );

  try {
    const response = await fetch(
      `https://theaudiodb.com/api/v1/json/123/search.php?s=${encodeURIComponent(
        name
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
    if (!data.artists)
      return NextResponse.json(
        { error: "Artista no encontrado" },
        { status: 404 }
      );

    return NextResponse.json(data.artists[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Error llamando a TheAudioDB" },
      { status: 500 }
    );
  }
}
