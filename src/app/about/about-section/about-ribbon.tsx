import React from 'react'
import Link from 'next/link'

export default function AboutRibbon() {
  return (
    <div 
      className="w-full py-4 px-6 md:py-3 md:px-12 lg:px-14 xl:px-40"
      style={{
        background: 'linear-gradient(90deg, #07A5EC 0%, #3476DB 100%)'
      }}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-start">
          <nav className="flex items-center text-white font-roboto-util text-sm md:text-base lg:text-lg">
            <Link 
              href="/" 
              className="text-sm lg:text-base xl:text-[1.05rem] font-medium font-roboto-util cursor-pointer"
            >
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-sm lg:text-base xl:text-[1.05rem] font-medium font-roboto-util cursor-pointer">About</span>
          </nav>
        </div>
      </div>
    </div>
  )
}