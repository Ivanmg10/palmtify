import Image from "next/image";
import Nirvana from "../../../../public/nirvana.jpg";

export default function HomePageSliders() {
  const madeForYou = [
    "Nirvana",
    "Metallica",
    "Pink Floyd",
    "Judas Priest",
    "Queen",
    "The Beatles",
    "Led Zeppelin",
    "The Rolling Stones",
  ];

  return (
    <div className="w-full flex flex-col justify-start items-start mt-8 mb-4 ">
      <p className="text-[#B3B3B3]">Made for</p>
      <h1 className="text-white text-2xl font-bold">You</h1>

      <div className="flex flex-row gap-6 flex-wrap ">
        {madeForYou.map((band) => (
          <div
            className="mt-4  hover:bg-[#282828] transition duration-300 p-3 rounded-lg cursor-pointer"
            key={band}
          >
            <Image
              className="object-cover"
              src={Nirvana}
              alt={band}
              width={200}
              height={200}
            />
            <p className="text-[#B3B3B3] mt-3">{band}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
