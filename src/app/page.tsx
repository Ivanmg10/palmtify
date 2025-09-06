import PalmtifyHeader from "./components/palmtify-header/MainHeader";
import HomePage from "./components/palmtify-home-page/HomePage";
import PalmtifyLateralLibrary from "./components/palmtify-lateral-library/LateralLibrary";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <PalmtifyHeader />

      <main className="p-4 grid cols-2 gap-4 bg-[#121212]">
        <div className="flex gap-2">
          {/* Sección izquierda - Libreria - 30% */}
          <PalmtifyLateralLibrary />

          {/* Sección derecha - Home Page - 70% */}
          <HomePage />
        </div>
      </main>
    </div>
  );
}
