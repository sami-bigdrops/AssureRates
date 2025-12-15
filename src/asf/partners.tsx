import React from 'react'
import Image from 'next/image'
import { PARTNERS } from '@/lib/constant'

export default function Partners() {
  return (
    <div
      className="partners w-full py-6 px-4 md:py-4 lg:py-5 lg:px-6 xl:py-1"
      style={{
        background: 'linear-gradient(180deg, #E8F4FC 0%, #FFF 100%)'
      }}
    >
        <div className="container mx-auto ">
            <div className="content w-full h-full flex flex-col items-center justify-center gap-3 md:gap-4 lg:gap-4 xl:gap-5">
            <div className="title-container flex flex-col items-center justify-center gap-2 md:gap-2 lg:gap-2.5 xl:gap-3 text-center ">
            <div className="title ">
              <h1 className="text-3xl md:text-2xl lg:text-3xl xl:text-3xl max-w-[280px] md:max-w-full  font-bold text-heading-color text-center font-poppins-util xl:leading-[1.15]">
                {PARTNERS.MAIN_HEADING.part1} <span className="heading-gradient display-inline">{PARTNERS.MAIN_HEADING.part2}</span>
              </h1>
            </div>
            <div className="title-description">
              <p className="text-sm md:text-sm lg:text-sm xl:text-base text-description-color text-center font-roboto-util max-w-3xl md:max-w-full  mx-auto">
                {PARTNERS.SUB_DESCRIPTION}
              </p>
            </div>
          </div>

          
          <div className="providers w-full h-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-6 lg:gap-7 xl:gap-8">
            {PARTNERS.PROVIDERS.map((provider, index) => {
              return (
                <div key={index} className="provider-item flex items-center justify-center w-auto h-[60px] md:h-[60px] lg:h-[70px] xl:h-[80px] ">
                  <Image 
                    src={`/${provider.logo}`} 
                    alt={provider.alt} 
                    width={200}
                    height={100}
                    className="w-auto h-full object-cover" 
                  />
                </div>
              )
            })}
          </div>



            </div>
        </div>
           
       
     
    </div>
  )
}