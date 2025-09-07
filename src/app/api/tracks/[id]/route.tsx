import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") || req.nextUrl.pathname.split("/").pop();

  if (!id)
    return NextResponse.json(
      { error: "Falta el ID del álbum" },
      { status: 400 }
    );

  try {
    const response = await fetch(
      `https://theaudiodb.com/api/v1/json/123/track.php?m=${encodeURIComponent(
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
    if (!data.track)
      return NextResponse.json(
        { error: "No hay canciones en este álbum" },
        { status: 404 }
      );

    return NextResponse.json(data.track);
  } catch (error) {
    return NextResponse.json(
      { error: "Error llamando a TheAudioDB" },
      { status: 500 }
    );
  }
}
