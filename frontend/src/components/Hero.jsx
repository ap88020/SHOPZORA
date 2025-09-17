import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { motion, AnimatePresence } from "framer-motion";

const Hero = () => {
  const heroImages = [assets.hero_img, assets.hero_img_2,assets.hero_img_3,assets.hero_img_4,assets.hero_img_5];
  const [index , setIndex] = useState(0)
  const Nextindex = (i) => (i+1) % heroImages.length;
  useEffect(() => {
    heroImages.map((img) => {
      const image = new Image();
      image.src = img
    })
  },[])

  useEffect(()=>{
    const interval = setInterval(() => {
      setIndex((prev) => Nextindex(prev))
    },4000)
    return () => clearInterval(interval)
  },[])

  return (
    <div className="flex flex-col sm:flex-row border border-gray-400 h-96 sm:h-96">
      {/* hero left side */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0 border">
        <div className="text-[#414141]">
          <div className="flex items-center justify-center gap-2">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            <p className="font-medium text-sm md:text-base">OUR BESTSELLER</p>
          </div>
          <h1 className="inconsolata-custom  text-3xl sm:py-3 lg:text-5xl leading-relaxed text-pink-800">
            Latest Arrivel
          </h1>
          <div className="flex items-center gap-2">
            <p className="font-bold text-sm md:text-base">SHOP NOW</p>
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
          </div>
        </div>
      </div>
      {/* hero right side  */}
      {/* <img className='w-full sm:w-1/2' src={assets.hero_img} alt="" /> */}
      <div className="w-full h-full sm:w-1/2 overflow-hidden relative flex items-center justify-center">
  <AnimatePresence>
    <motion.img
      key={index}
      src={heroImages[index]}
      alt={`hero-${index}`}
      className="w-full h-full object-cover absolute z-[-1]"
      initial={{ x: "100%", opacity:0 }}
      animate={{ x: 0, opacity: 1 }} 
      exit={{ x: "-100%", opacity: 0 }} 
      transition={{ duration: 1, ease: "easeInOut" }}
    />
  </AnimatePresence>
</div>

    </div>
  );
};

export default Hero;
