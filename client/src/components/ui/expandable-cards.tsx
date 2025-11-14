// components/ui/expandable-cards.tsx
"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "../../hooks/use-outside-click";

type Card = {
  title: string;
  description: string;
  location: string;
  price: string;
  pricePerNight: number;
  src: string;
  ctaText: string;
  ctaLink: string;
  content: React.ReactNode | (() => React.ReactNode);
};

interface ExpandableCardDemoProps {
  cards: Card[];
  searchData?: any;
}

export function ExpandableCardDemo({ cards, searchData }: ExpandableCardDemoProps) {
  const [active, setActive] = useState<Card | null>(null);
  const navigate = useNavigate();
  const id = useId();
  const ref = useRef(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }
    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  // Fixed handleBookNow function - excludes non-serializable content
  const handleBookNow = (card: Card) => {
    const hotelId = card.title.toLowerCase().replace(/\s+/g, '-');
    
    // Extract only serializable data, exclude the content function
    const hotelData = {
      title: card.title,
      description: card.description,
      location: card.location,
      price: card.price,
      pricePerNight: card.pricePerNight,
      src: card.src,
      ctaText: card.ctaText,
      ctaLink: card.ctaLink
    };
    
    navigate(`/booking/${hotelId}`, {
      state: {
        hotel: hotelData,
        searchData: searchData
      }
    });
  };

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <img

                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-medium text-neutral-700 dark:text-neutral-200 text-base"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.div
                      layoutId={`location-${active.title}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400 text-sm mt-1"
                    >
                      📍 {active.location}
                    </motion.div>
                    <motion.div
                      layoutId={`price-${active.title}-${id}`}
                      className="text-green-600 font-semibold text-lg mt-2"
                    >
                      ₹{active.pricePerNight.toLocaleString()}
                      <span className="text-sm text-neutral-500 font-normal"> per night</span>
                    </motion.div>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400 text-base mt-2"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  <motion.button
                    layoutId={`button-${active.title}-${id}`}
                    onClick={() => handleBookNow(active)}
                    className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black mt-4 md:mt-0"
                  >
                    {active.ctaText}
                  </motion.button>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-scrollbar:none]"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <ul className="max-w-9xl mx-auto w-full gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, index) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={card.title}
            onClick={() => setActive(card)}
            className="p-6 flex flex-col justify-between hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer transition-all duration-300 border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-sm hover:shadow-lg"
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="flex gap-4 flex-col w-full">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <img
                  width={100}
                  height={100}
                  src={card.src}
                  alt={card.title}
                  className="h-60 w-full rounded-lg object-cover object-top"
                />
              </motion.div>
              <div className="flex justify-center items-center flex-col">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left text-base"
                >
                  {card.title}
                </motion.h3>
                <motion.div
                  layoutId={`location-${card.title}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400 text-center md:text-left text-sm mt-1"
                >
                  📍 {card.location}
                </motion.div>
                <motion.div
                  layoutId={`price-${card.title}-${id}`}
                  className="text-green-600 font-semibold text-lg mt-2"
                >
                  {card.price}
                  <span className="text-sm text-neutral-500 font-normal"> per night</span>
                </motion.div>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400 text-center md:text-left text-base mt-2"
                >
                  {card.description}
                </motion.p>
                <motion.button
                  layoutId={`button-${card.title}-${id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBookNow(card);
                  }}
                  className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black mt-4 md:mt-0"
                >
                  {card.ctaText}
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="m0 0h24v24H0z" fill="none" />
      <path d="m18 6l-12 12" />
      <path d="m6 6l12 12" />
    </motion.svg>
  );
};
