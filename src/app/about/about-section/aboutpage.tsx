import React from 'react'
import { ABOUT_PAGE } from '@/lib/constant'
import Image from 'next/image'

export default function AboutPage() {
  const renderTextWithBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g)
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const boldText = part.slice(2, -2)
        return (
          <span key={index} className="font-medium">
            {boldText}
          </span>
        )
      }
      return <span key={index}>{part}</span>
    })
  }
  return (
    <div
      className='about-page w-full h-full py-6 px-6 md:py-8 lg:px-12 lg:py-12 xl:py-16 xl:px-38  2xl:px-42'
      style={{ background: 'linear-gradient(180deg, #E8F4FC 0%, #FFF 15%)' }}
    >
      <div className='container mx-auto'>
        <div className='content w-full h-full flex flex-col items-center justify-center gap-8 md:gap-12 lg:gap-14 xl:gap-20'>
          <div className='title-container flex flex-col items-center justify-center gap-3 xl:gap-4 text-center'>
            <div className='title'>
              <h1 className='text-[2.1rem] md:text-[2.3rem] lg:text-[2.5rem] xl:text-[2.8rem] max-w-[280px] md:max-w-full font-bold text-heading-color text-center font-poppins-util '>
                {ABOUT_PAGE.MAIN_HEADING.part1} <span className='heading-gradient display-inline'>{ABOUT_PAGE.MAIN_HEADING.part2}</span>
              </h1>
            </div>
          </div>

          <div className="about-section-container w-full flex flex-col gap-8 md:gap-12 lg:gap-18 xl:gap-22">
            <div className="flex-1 w-full bg-white flex flex-col justify-center items-center  md:flex-row gap-6 md:gap-10 lg:gap-14 xl:gap-21">
                <div className="image-container w-full h-full md:w-[50%] xl:w-[45%]  md:h-[275px] lg:h-[320px] xl:h-[320px]  rounded-[10px] flex justify-center items-center overflow-hidden">
                    <Image
                    src={`/${ABOUT_PAGE.SECTIONS[0].image}`}
                    alt={ABOUT_PAGE.SECTIONS[0].imageAlt}
                    width={800}
                    height={400}
                    className="w-full h-full object-cover"
                    />
                </div>
                <div className="content-container w-full md:w-[50%] xl:w-[55%] flex flex-col gap-3 md:gap-5 lg:gap-6 xl:gap-7 text-left">
                    <h2 className='text-[1.9rem] md:text-[2.05rem] lg:text-[2.2rem] xl:text-[2.3rem] text-center md:text-left font-bold text-heading-color font-poppins-util' style={{ lineHeight: 1.2 }}>
                        {ABOUT_PAGE.SECTIONS[0].heading.part1} 
                        <span className='heading-gradient'>{ABOUT_PAGE.SECTIONS[0].heading.part2}</span>
                    </h2>
                    <div className="flex flex-col gap-3 md:gap-4 ">
                        <p className='text-[0.82rem] md:text-[0.9rem] lg:text-[1.05rem] xl:text-[1.1rem] text-center md:text-left text-description-color font-roboto-util ' style={{ lineHeight: 1.6 }}>
                            {renderTextWithBold(ABOUT_PAGE.SECTIONS[0].content[0])}
                        </p>
                        <p className='text-[0.82rem] md:text-[0.9rem] lg:text-[1.05rem] xl:text-[1.1rem] text-center md:text-left text-description-color font-roboto-util ' style={{ lineHeight: 1.6 }}>
                            {renderTextWithBold(ABOUT_PAGE.SECTIONS[0].content[1])}
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex-2 w-full bg-white flex flex-col justify-center items-center md:flex-row-reverse gap-6 md:gap-10 lg:gap-14 xl:gap-21">
                <div className="image-container w-full h-full md:w-[50%] xl:w-[45%]  md:h-[275px] lg:h-[320px] xl:h-[320px] rounded-[10px] flex justify-center items-center overflow-hidden">
                    <Image
                    src={`/${ABOUT_PAGE.SECTIONS[1].image}`}
                    alt={ABOUT_PAGE.SECTIONS[1].imageAlt}
                    width={800}
                    height={400}
                    className="w-full h-full object-cover object-center"
                    />
                </div>
                <div className="content-container w-full md:w-[50%] xl:w-[55%] flex flex-col gap-3 md:gap-5 lg:gap-6 xl:gap-7 text-left">
                    <h2 className='text-[1.9rem] md:text-[2.05rem] lg:text-[2.2rem] xl:text-[2.3rem] text-center md:text-left font-bold text-heading-color font-poppins-util' style={{ lineHeight: 1.2 }}>
                        {ABOUT_PAGE.SECTIONS[1].heading.part1} 
                        <span className='heading-gradient'>{ABOUT_PAGE.SECTIONS[1].heading.part2}</span>
                        {ABOUT_PAGE.SECTIONS[1].heading.part3}
                    </h2>
                    <div className="flex flex-col gap-3 md:gap-4 ">
                        <p className='text-[0.82rem] md:text-[0.9rem] lg:text-[1.05rem] xl:text-[1.1rem] text-center md:text-left text-description-color font-roboto-util leading-relaxed' style={{ lineHeight: 1.6 }}>
                            {renderTextWithBold(ABOUT_PAGE.SECTIONS[1].content[0])}
                        </p>
                        <p className='text-[0.82rem] md:text-[0.9rem] lg:text-[1.05rem] xl:text-[1.1rem] text-center md:text-left text-description-color font-roboto-util leading-relaxed' style={{ lineHeight: 1.6 }}>
                            {renderTextWithBold(ABOUT_PAGE.SECTIONS[1].content[1])}
                        </p>
                        <p className='text-[0.82rem] md:text-[0.9rem] lg:text-[1.05rem] xl:text-[1.1rem] text-center md:text-left text-description-color font-roboto-util leading-relaxed' style={{ lineHeight: 1.6 }}>
                            {renderTextWithBold(ABOUT_PAGE.SECTIONS[1].content[2])}
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex-3 w-full bg-white flex flex-col justify-center items-center md:flex-row gap-6 md:gap-10 lg:gap-14 xl:gap-21">
                <div className="image-container w-full h-full md:w-[50%] xl:w-[45%]  md:h-[275px] lg:h-[320px] xl:h-[320px]  rounded-[10px] flex justify-center items-center overflow-hidden">
                    <Image
                    src={`/${ABOUT_PAGE.SECTIONS[2].image}`}
                    alt={ABOUT_PAGE.SECTIONS[2].imageAlt}
                    width={800}
                    height={400}
                    className="w-full h-full object-cover"
                    />
                </div>
                <div className="content-container w-full md:w-[50%] xl:w-[55%] flex flex-col gap-3 md:gap-5 lg:gap-6 xl:gap-7 text-left">
                    <h2 className='text-[1.9rem] md:text-[2.05rem] lg:text-[2.2rem] xl:text-[2.3rem] text-center md:text-left font-bold text-heading-color font-poppins-util' style={{ lineHeight: 1.2 }}>
                        {ABOUT_PAGE.SECTIONS[2].heading.part1} 
                        <span className='heading-gradient'>{ABOUT_PAGE.SECTIONS[2].heading.part2}</span>
                        {ABOUT_PAGE.SECTIONS[2].heading.part3}
                    </h2>
                    <div className="flex flex-col gap-3 md:gap-4 ">
                        <p className='text-[0.82rem] md:text-[0.9rem] lg:text-[1.05rem] xl:text-[1.1rem] text-center md:text-left text-description-color font-roboto-util leading-relaxed' style={{ lineHeight: 1.6 }}>
                            {renderTextWithBold(ABOUT_PAGE.SECTIONS[2].content[0])}
                        </p>
                        <p className='text-[0.82rem] md:text-[0.9rem] lg:text-[1.05rem] xl:text-[1.1rem] text-center md:text-left text-description-color font-roboto-util leading-relaxed' style={{ lineHeight: 1.6 }}>
                            {renderTextWithBold(ABOUT_PAGE.SECTIONS[2].content[1])}
                        </p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}