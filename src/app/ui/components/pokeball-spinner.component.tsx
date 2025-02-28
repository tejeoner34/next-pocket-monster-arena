import Image from 'next/image';

export default function PokeballSpinner() {
  return (
    <>
      <div className="fixed top-1/2 left-1/2 w-24 h-24 p-4 transform -translate-x-1/2 -translate-y-1/2 z-[20000]">
        <Image
          src="/img/pokeball-pixel.png"
          alt="pokeball"
          width={100}
          height={100}
          className="w-full animate-spinner"
        />
      </div>
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-[10000]"></div>
    </>
  );
}
