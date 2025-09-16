"use client";

import { useEffect, useRef, useState } from "react";
import Nirvana from "../../../../public/nirvana.jpg";
import LateralComponentCards from "../lateral-component-cards/LateralComponentCards";
import LateralComponentTop from "../lateral-component-top/LateralComponentTop";
import { useMeasure } from "react-use";

const playlists = [
  {
    id: "1",
    tittle: "Nirvana",
    description: "Playlist Ivan",
    image: Nirvana,
  },
  {
    id: "2",
    tittle: "Nirvana",
    description: "Playlist Ivan",
    image: Nirvana,
  },
  {
    id: "3",
    tittle: "Nirvana",
    description: "Playlist Ivan",
    image: Nirvana,
  },
  {
    id: "4",
    tittle: "Nirvana",
    description: "Playlist Ivan",
    image: Nirvana,
  },
];

export default function PalmtifyLateralLibrary() {
  const [ref, { width }] = useMeasure<HTMLDivElement>();
  const isSmall = width < 180;

  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Guardar la posición inicial del mouse y ancho
  const dragStartX = useRef(0);
  const startWidth = useRef(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    startWidth.current = containerRef.current?.offsetWidth || 0;

    // Prevenir selección de texto
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - dragStartX.current;
    if (containerRef.current) {
      const newWidth = Math.max(200, startWidth.current + delta); // ancho mínimo 200px
      containerRef.current.style.width = `${newWidth}px`;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={(node: HTMLDivElement) => {
        ref(node);
        containerRef.current = node;
      }}
      className="relative overflow-auto rounded-lg p-5 bg-[#181818] w-[400px] max-w-[400px]"
    >
      <div>
        <LateralComponentTop isSmall={isSmall} />
        <LateralComponentCards playlists={playlists} isSmall={isSmall} />
      </div>

      {/* Handle para redimensionar */}
      <div
        title="Drag to resize"
        onMouseDown={handleMouseDown}
        className="pointer-events-auto absolute h-full top-0 right-0 w-1.5 cursor-ew-resize rounded-full bg-slate-950/20 group-data-dragging:bg-slate-950/40 hover:bg-slate-300/40 hover:transition duration-300"
      />
    </div>
  );
}
