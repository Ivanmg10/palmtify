import {
  formatMilliseconds,
  formatSeconds,
  msToSeconds,
} from "@/app/utils/timeUtils";
import {
  IconArrowBigLeftLineFilled,
  IconArrowBigRightLineFilled,
  IconArrowsShuffle,
  IconPlayerPlayFilled,
  IconRepeat,
  IconPlayerPauseFilled,
} from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import "./style.css";

interface FooterCenterProps {
  duration: number;
}

export default function FooterCenter({ duration }: FooterCenterProps) {
  const seconds = msToSeconds(duration);
  const [currentDuration, setCurrentDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advanceTime = () => {
    setIsPlaying(true);

    // Evitar múltiples intervalos
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      setCurrentDuration((prev) => {
        if (prev >= seconds) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const resetTime = () => {
    setCurrentDuration(0);
  };

  const stopTime = () => {
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    setCurrentDuration(0);
    stopTime();
    advanceTime();

    return () => {
      stopTime();
    };
  }, [duration]);

  const buttonsClassName =
    "m-auto hover:scale-105 hover:text-white transition duration-300";

  return (
    <div className="min-w-1/5 flex flex-col items-center gap-3">
      <div className="flex flex-row items-between gap-6">
        <IconArrowsShuffle stroke={2} size={24} className={buttonsClassName} />
        <div className="flex flex-row items-center gap-6">
          <button onClick={resetTime}>
            <IconArrowBigLeftLineFilled
              stroke={2}
              size={24}
              className={buttonsClassName}
            />
          </button>
          <button onClick={() => (isPlaying ? stopTime() : advanceTime())}>
            {isPlaying ? (
              <IconPlayerPauseFilled
                stroke={2}
                size={33}
                className="m-auto bg-white text-black rounded-full p-2 hover:scale-110 transition duration-200"
              />
            ) : (
              <IconPlayerPlayFilled
                stroke={2}
                size={33}
                className="m-auto bg-white text-black rounded-full p-2 hover:scale-110 transition duration-200"
              />
            )}
          </button>
          <IconArrowBigRightLineFilled
            stroke={2}
            size={24}
            className={buttonsClassName}
          />
        </div>
        <IconRepeat stroke={2} size={24} className={buttonsClassName} />
      </div>

      <div className="w-full flex flex-row items-center gap-2 text-xs">
        <p className="text-sm text-[#b3b3b3]">
          {formatSeconds(currentDuration)}
        </p>
        <div className="w-full h-1 bg-[#404040] rounded-lg relative flex items-center">
          {/* Barra de progreso */}
          <div
            className="h-1 bg-[#b3b3b3] rounded-lg absolute left-0 top-0"
            style={{ width: `${(currentDuration / seconds) * 100}%` }}
          ></div>

          {/* Input invisible */}
          <input
            type="range"
            min={0}
            max={seconds}
            value={currentDuration}
            onChange={(e) => setCurrentDuration(Number(e.target.value))}
            className="absolute top-0 left-0 w-full h-1 opacity-0 cursor-pointer"
          />
        </div>
        <p className="text-sm text-[#b3b3b3]">{formatMilliseconds(duration)}</p>
      </div>
    </div>
  );
}
