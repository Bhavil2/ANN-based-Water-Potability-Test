import { useState } from 'react'
import './App.css'
import { SVGComponent } from '../componenets/Circle'
import { FormData } from '../componenets/form'
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='absolute min-h-screen  w-full  bg-linear-to-b from-white via-sky-200 to-slate-100'>
      <div className=' w-full py-22 px-4 md:px-8 font-sans   '>
          <div className='text-6xl font-medium max-w-xl tracking-tight mt-20  mx-auto bg-gradient-to-r from-slate-600 via-blue-800 to-emerald-600  bg-clip-text text-transparent drop-shadow-md leading-15 '>
            Water Potability Command Center 
          </div>
          <div className='text-md text-gray-500 mx-auto max-w-xl pt-6 text-shadow-2xs '>
          Here we can predict whether the water is contaminated or not from the given parameter we are using advanced Ai models for it
          </div>
          <div className='text-4xl text-violet-600 mt-40 text-center'>
          Attributes
          </div>
          <SVGComponent/>
          {/* <form> */}
            
          <FormData/>
          {/* </form> */}
      </div>
      </div>
    </>
  )
}

export default App
