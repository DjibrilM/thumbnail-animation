import { useEffect, useRef, useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { IoChevronForwardOutline } from "react-icons/io5";

import { cn } from "./util/cn";

function App() {
  let [carouselWidth, setCarouselWidth] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  let innerCarousel = useRef<HTMLDivElement>();
  const [images, setImages] = useState<
    { url: string; active: boolean; title: string; desscription: string }[]
  >([
    {
      title: "loki",
      desscription: `
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci doloremque saepe odio et distinctio unde ullam sint quod dicta sunt inventore corrupti, magni eaque in, perferendis ipsum commodi laudantium minima!
      `,
      url: "https://wallpaperaccess.com/full/9070071.png",
      active: false,
    },
    {
      title: "Avengers",
      desscription: `
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci doloremque saepe odio et distinctio unde ullam sint quod dicta sunt inventore corrupti, magni eaque in, perferendis ipsum commodi laudantium minima!
      `,
      url: "https://wallpaperaccess.com/full/9070068.jpg",
      active: false,
    },
    {
      title: "GTA the movie",
      desscription: `
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci doloremque saepe odio et distinctio unde ullam sint quod dicta sunt inventore corrupti, magni eaque in, perferendis ipsum commodi laudantium minima!
      `,
      url: "https://wallpaperaccess.com/full/9070086.png",
      active: false,
    },
    {
      title: "Batman",
      desscription: `
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci doloremque saepe odio et distinctio unde ullam sint quod dicta sunt inventore corrupti, magni eaque in, perferendis ipsum commodi laudantium minima!
      `,
      url: "https://wallpaperaccess.com/full/9070125.jpg",
      active: false,
    },
  ]);

  useEffect(() => {
    function getCarouselWidth() {
      const carousel = document.querySelector(".carousel") as HTMLDivElement;
      const resizeObserver = new ResizeObserver((entries) => {
        setCarouselWidth(entries[0].contentRect.width);
      });
      resizeObserver.observe(carousel);
    }
    getCarouselWidth();

    function setFirstActive() {
      const prevListState = images;
      prevListState[0].active = true;
      setImages(prevListState);
    }
    setFirstActive();
  }, []);

  function scrollY(index: number) {
    const prevListState = images.map((el) => {
      return { ...el, active: false };
    });
    prevListState[index].active = true;
    setImages(prevListState);
    innerCarousel.current!.style.transform = `translateX(-${
      carouselWidth * index
    }px)`;
  }

  return (
    <>
      <div className="w-full  flex flex-col px-3 items-center justify-center mt-10">
        <div className="max-w-[1000px]  carousel scroll-smooth  flex overflow-hidden w-full relative h-[600px] border rounded-lg">
          <div
            ref={(element: HTMLDivElement) => (innerCarousel.current = element)}
            className="flex duration-500"
            style={{ width: carouselWidth * images.length + "px" }}
          >
            {images.map((el, index) => {
              return (
                <div
                  key={"carousel-image-key-" + index}
                  style={{ width: carouselWidth + "px" }}
                  className="w-full h-full"
                >
                  <img
                    style={{
                      transform: el.active ? "scale(1.5)" : "scale(0.7)",
                      filter: el.active ? "blur(0px)" : "blur(50px)",
                    }}
                    className="w-full duration-500  h-full object-cover"
                    src={el.url}
                    alt=""
                  />
                </div>
              );
            })}
          </div>

          <div className="absolute bottom-0 py-4 px-6 left-0 right-0 bg-black/40 z-40">
            <h1 className="text-white text-3xl">
              {images[currentIndex].title}
            </h1>
            <p className="text-white/75">{images[currentIndex].desscription}</p>
          </div>
        </div>

        <div className="flex gap-5 items-center">
          <button
            onClick={() => {
              const nextIndex = currentIndex - 1;
              setCurrentIndex(nextIndex);
              scrollY(nextIndex);
            }}
            disabled={currentIndex === 0}
            className="h-10 flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-30 duration-200 text-white bg-black/60 w-10 rounded-full"
          >
            <FiChevronLeft />
          </button>
          <div className="flex gap-3 w-full items-center mt-5 max-w-[1000px]">
            {images.map((url, index) => (
              <div
                onClick={() => {
                  setCurrentIndex(index);
                  scrollY(index);
                }}
                key={"thumbnail-" + index}
                className={cn(
                  "w-full border-[3px] border-transparent duration-100  cursor-pointer h-[150px] overflow-hidden rounded-lg",
                  {
                    "border-black": currentIndex === index,
                  }
                )}
              >
                <img
                  className="object-cover hover:scale-125 duration-300 h-full w-full"
                  src={url.url}
                />
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              const nextIndex = currentIndex + 1;
              setCurrentIndex(nextIndex);
              scrollY(nextIndex);
            }}
            disabled={currentIndex === images.length - 1}
            className="h-10 flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-30 duration-200 text-white bg-black/60 w-10 rounded-full"
          >
            <IoChevronForwardOutline />
          </button>
        </div>

        {/* <div className="w-full px-5 max-w-[400px] mt-7 flex gap-2  items-center justify-center ">
          {images.map((el, index) => {
            return (
              <Controller
                ontransitionEnd={() => onTransitionEnd(index)}
                active={el.active}
                onClick={() => scrollY(index)}
              />
            );
          })}
        </div> */}
      </div>
    </>
  );
}

export default App;
