'use client'

import React, { useState } from 'react'
import { RIBBON } from '@/lib/constant'

export default function Ribbon() {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="ribbon w-full px-4 py-2 pl-6 pr-3 md:px-0 md:py-0 md:pr-0 md:pl-0 bg-[#FAFAFA] md:bg-white">
      <div className="ribbon-content w-full">
        <div className="md:hidden">
          <div className="flex items-center justify-between py-2 px-1 relative" >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {isExpanded ? (
                RIBBON.ITEMS.map((item, index) => (
                  <div
                    key={index}
                    className="text-[0.8rem] font-medium text-black-color font-poppins-util"
                  >
                    {item.label}
                  </div>
                ))
              ) : (
                RIBBON.ITEMS.slice(0, 2).map((item, index) => (
                  <div
                    key={index}
                    className="text-[0.8rem] font-medium text-black-color font-poppins-util"
                  >
                    {item.label}
                  </div>
                ))
              )}
            </div>
            <button
              onClick={toggleExpanded}
              className="flex items-start md:hidden absolute right-0 top-2.5 justify-start ml-2 p-1 transition-transform duration-300 flex-shrink-0"
              aria-label={isExpanded ? 'Collapse menu' : 'Expand menu'}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="9"
                viewBox="0 0 16 9"
                fill="none"
                className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
              >
                <path
                  d="M1 1L6.90545 6.77421C7.43906 7.29595 8.29171 7.29595 8.82532 6.77421L14.7308 1"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
          
         
        </div>

        <div className="hidden md:block mx-10">
          <div className="flex flex-row justify-between items-center bg-white" >
            {RIBBON.ITEMS.map((item, index) => (
              <div 
                key={index} 
                className="text-[0.8rem] lg:text-[1rem] xl:text-[1.05rem] font-medium text-black-color font-poppins-util px-13.8 py-3 "
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>

        
      </div>
    </div>
  )
}