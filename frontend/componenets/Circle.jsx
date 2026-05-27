"use client";
import React from "react";
import { easeIn, easeInOut, motion, resolveTransition } from "framer-motion";

export const SVGComponent = () => {
    return (

        <motion.div 
        whileHover={"animate"}
        className="rounded-md flex justify-between items-center mx-auto mt-20 px-20  shadow-md border-gray-100 max-w-5xl ">
            <div className="flex flex-col justify-between ">
                <div className="relative text-[20px] py-1 text-neutral-600 font-medium
                 ">
                    pf(0-15)
                     <SVG1 className="absolute -top-12 left-15 w-200  text-sky-400"/>
                </div>
                <div  className="relative text-[20px] py-2  text-neutral-600 font-medium">
                    Hardness mg/L
                     <SVG2 className="absolute -top-11 left-30 w-200  text-sky-800"/>
                </div>
                <div  className="relative text-[20px] py-2  text-neutral-600 font-medium">
                    Solids ppm
                     <SVG2 className="absolute -top-11 left-26.5 w-200  text-sky-800"/>
                </div>
                <div  className="relative text-[20px] py-2  text-neutral-600 font-medium">
                    Chloramines ppm
                     <SVG2 className="absolute -top-11 left-33 w-200 text-sky-800"/>
                </div>
                <div  className="relative text-[20px] py-2 text-neutral-600 font-medium ">
                    Sulfate mg/L
                     <SVG2 className="absolute -top-11 left-27 w-200  text-sky-800"/>
                </div>
                <div  className="relative text-[20px] py-2 text-neutral-600 font-medium ">
                    Conductivity μS/cm
                     <SVG2 className="absolute -top-11 left-35 w-200  text-sky-800"/>
                </div>
                <div  className="relative text-[20px] py-2 text-neutral-600 font-medium">
                    Organic Carbon ppm
                     <SVG2 className="absolute -top-11 left-36 w-200  text-sky-800"/>
                </div>
                <div  className="relative text-[20px] py-2 text-neutral-600 font-medium">
                    Trihalomethanes μ/L
                     <SVG2 className="absolute -top-11 left-35   2 w-200  text-sky-800"/>
                </div>
                <div  className="relative text-[20px] py-2 text-neutral-600 font-medium">
                    Turbidity (NTU)
                     <SVG3 className="absolute -top-11 left-12 w-200  text-sky-800"/>
                </div>

            </div>
            {/* hello */}
           <div className="bg-neutral-100/60 relative overflow-hidden h-84 w-36 rounded-xl p-[1.5px] shadow-sm border border-slate-100 flex items-center justify-center">
        
  {/* CHASER 1: THE LEADING BLUE BEAM (Spins faster at 3 seconds) */}
  <div 
    className="absolute inset-0 w-[200%] h-[200%] -top-[50%] -left-[50%] animate-spin bg-[conic-gradient(from_0deg,transparent_40%,#3b82f6_50%,transparent_60%)]"
    style={{     animationDuration:'2s'}}
  />

  {/* CHASER 2: THE LAG CYAN/PURPLE BEAM (Spins slower at 4.5 seconds + starts opposite at 180 degrees) */}
  <div 
    className="absolute inset-0 w-[200%] h-[200%] -top-[50%] -left-[50%] animate-spin bg-[conic-gradient(from_180deg,transparent_40%,#a855f7_50%,transparent_60%)]"
    style={{ animationDelay: '2s', animationDuration:'2s'}}
  />

  {/* LAYER 2: THE UPPER HOOD MASK (Set to z-10 so it floats perfectly on top) */}
  <div className="w-full h-full relative z-10 bg-white rounded-[12px] flex flex-col items-center justify-center p-4 text-[11px] font-bold text-slate-600 select-none">
    <span className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Water polution</span>
    <span className="text-xl font-black text-slate-800">Yes</span>
  </div>

</div>

        </motion.div>
    )
}

export const SVG1 =(props) =>{
    return (
<svg
      // 1. Controlled sizing cleanly with Tailwind and changed text color to match your portal theme
      className=" text-sky-400 w-2000px"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="494.407735682065 255 417.803899689256 131.20001220703125"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
     
      
      {/* Horizontal Segment */}
      <g transform="matrix(1, 0, 0, 1, 522.4, 288.6)">
        <path
          strokeWidth="1" // 2. Boosted stroke thickness so it doesn't vanish when scaled down
          d="M 4 0 L 360 0"
          stroke="url(#line-one-gradient)" // 3. Inherits the text-sky-400 class color dynamically
          fill="none"
        />
      </g>
      <defs >
        <motion.linearGradient
        gradientUnits="userSpaceOnUse"
        id="line-one-gradient"
        initial={{
            x1:'-10%',
            x2:'0%'
        }}
        animate={{
            x1:'90%',
            x2:'100%'
        }}
        transition={{
            duration:2,
            repeat:Infinity,
            repeatType:'loop',
            ease:'linear'
        }}>
            <stop stopColor="#f5f5f5"></stop>
            <stop offset="0.33" stopColor="#93c5fd"></stop>
            <stop offset="0.66" stopColor="#93c5fd"></stop>
            {/* <stop offset="0.66" stopColor="#F17463"></stop> */}
            <stop offset="1" stopColor="#f5f5f5"></stop>
        </motion.linearGradient>
      </defs>
      {/* Vertical Segment */}
      <g transform="matrix(1, 0, 0, 1, 882.4, 287)">
        <path
          strokeWidth="1" // 2. Boosted stroke thickness here as well
          d="M 0 1.5 L 0 10"
          stroke="url(#line-one1-gradient)" // 3. Inherits the text-sky-400 class color dynamically
          fill="none"
        />
      </g>
    </svg>
    )
}
export const SVG3 =(props) =>{
    return (
<svg
      // 1. Controlled sizing cleanly with Tailwind and changed text color to match your portal theme
      className=" text-neutral-200 w-2000px"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="494.407735682065 255 417.803899689256 131.20001220703125"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
     
      
      {/* Horizontal Segment */}
      <g transform="matrix(1, 0, 0, 1, 522.4, 288.6)">
        <path
          strokeWidth="1" // 2. Boosted stroke thickness so it doesn't vanish when scaled down
          d="M 26 0 L 360 0"
          stroke="url(#line-one1-gradient)" // 3. Inherits the text-sky-400 class color dynamically
          fill="none"
        />
      </g>

        <g transform="matrix(1, 0, 0, 1, 882.4, 287)">
          <path
            strokeWidth="1" // 2. Boosted stroke thickness here as well
            d="M 0 1.5 L 0 -7"
            stroke="url(#line-one1-gradient)" // 3. Inherits the text-sky-400 class color dynamically
            fill="none"
          />
        </g>
       <defs>
        <motion.linearGradient
        gradientUnits="userSpaceOnUse"
        id="line-one1-gradient"
        initial={{
            x1:'0%',
            x2:'10%'
        }}
        animate={{
            x1:'90%',
            x2:'100%'
        }}
        transition={{
            duration:2,
            repeat:Infinity,
            repeatType:'loop',
            ease:'linear'
        }}>
            <stop stopColor="#f5f5f5"></stop>
            <stop offset="0.33" stopColor="#93c5fd"></stop>
            <stop offset="0.66" stopColor="#93c5fd"></stop>
            {/* <stop offset="0.66" stopColor="#F17463"></stop> */}
            <stop offset="1" stopColor="#f5f5f5"></stop>
        </motion.linearGradient>
      </defs>

      {/* Vertical Segment */}
    </svg>
    )
}
export const SVG2 =(props) =>{
    return (
<svg
      // 1. Controlled sizing cleanly with Tailwind and changed text color to match your portal theme
      className="text-blue-300  "
      xmlns="http://www.w3.org/2000/svg"
      viewBox="494.407735682065 255 417.803899689256 131.20001220703125"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      
      {/* Horizontal Segment */}
      <g transform="matrix(1, 0, 0, 1, 522.4, 288.6)">
        <path
          strokeWidth="1" // 2. Boosted stroke thickness so it doesn't vanish when scaled down
          d="M -12 0 L 347 0"
          stroke="url(#line-one-gradient)" // 3. Inherits the text-sky-400 class color dynamically
          fill="none"
        />
      </g>
      <defs >
        <motion.linearGradient
        gradientUnits="userSpaceOnUse"
        id="line-one-gradient"
        initial={{
            x1:'0%',
            x2:'10%'
        }}
        animate={{
            x1:'90%',
            x2:'100%'
        }}
        transition={{
            duration:2,
            repeat:Infinity,
            repeatType:'loop',
            ease:'linear'
        }}>
            <stop stopColor="#f5f5f5"></stop>
            <stop offset="0.33" stopColor="#93c5fd"></stop>
            <stop offset="0.66" stopColor="#93c5fd"></stop>
            {/* <stop offset="0.66" stopColor="#F17463"></stop> */}
            <stop offset="1" stopColor="#f5f5f5"></stop>
        </motion.linearGradient>
      </defs>
    </svg>
    )
}