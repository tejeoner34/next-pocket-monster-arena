export default function ScreenPokeballPlaceholder({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="absolute w-full h-full overflow-hidden">
      <div
        className={`pokeball__top-container absolute w-full h-1/2 top-0 left-0 z-[30010] ${
          isOpen ? 'isOpenTop' : ''
        }`}
      >
        <div className="pokeball-top absolute top-0 bg-red-500 w-full h-full border-b-[10px] border-black"></div>
        <div className="pokeball-center z-[30010] absolute bg-white border-[30px] border-black rounded-full w-52 h-52 mx-auto left-0 right-0 bottom-[-100px] text-center cursor-pointer animate-colorAnimation"></div>
      </div>
      <div
        className={`pokeball-bottom absolute bg-white bottom-0 h-1/2 w-full border-t-[10px] border-black z-[30000] ${
          isOpen ? 'isOpenBottom' : ''
        }`}
      ></div>

      <style jsx>{`
        @keyframes colorAnimation {
          from {
            background-color: white;
          }
          to {
            background-color: rgb(240, 106, 106);
          }
        }

        .animate-colorAnimation {
          animation: colorAnimation 2s infinite ease;
        }

        @keyframes isOpenTop {
          0% {
            top: 0px;
          }
          85% {
            border-bottom: 10px solid black;
          }
          100% {
            top: -1000px;
            border: 0;
          }
        }

        .isOpenTop {
          animation: isOpenTop 1.5s forwards linear;
          animation-delay: 1s;
        }

        @keyframes isOpenBottom {
          0% {
            height: 50vh;
          }
          85% {
            border-top: 10px solid black;
          }
          100% {
            height: 0px;
            border: 0;
          }
        }

        .isOpenBottom {
          animation: isOpenBottom 0.6s forwards linear;
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
}
