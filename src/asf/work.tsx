import React from 'react';
import { WORKS } from '@/lib/constant';

export default function Work() {
  return (
    <div id="work" className="work w-full py-10 pb-16 px-6 md:py-12 md:pb-18 lg:px-8 lg:pb-20 lg:pt-14 xl:px-38 xl:pb-26 xl:pt-16  2xl:px-42 ">
      <div className="container mx-auto ">
        <div className="content flex flex-col items-center justify-center gap-5 md:gap-10 xl:gap-12">
          <div className="title-container flex flex-col items-center justify-center gap-3 xl:gap-4 text-center ">
            <div className="title">
              <h1 className="text-3xl md:text-3xl lg:text-4xl xl:text-[2.5rem] max-w-[280px]   md:max-w-full font-bold text-heading-color text-center font-poppins-util xl:leading-[1.15]">
                {WORKS.MAIN_HEADING.part1}{' '}
                <span className="heading-gradient display-inline">
                  {WORKS.MAIN_HEADING.part2}
                </span>
              </h1>
            </div>
            <div className="title-description">
              <p className="text-sm lg:text-base xl:text-lg text-description-color text-center font-roboto-util max-w-3xl md:max-w-full mx-auto">
                {WORKS.SUB_HEADING}
              </p>
            </div>
          </div>

          <div className="work-container grid grid-cols-1 md:grid-cols-3 md:gap-6 lg:grid-cols-3 gap-12 ">
            {WORKS.STEPS.map((work, index) => (
              <div
                key={index}
                className="work-item relative flex flex-col items-center gap-4  xl:gap-4 px-6 pt-6 xl:pt-7 pb-10 xl:pb-16 2xl:pb-16 rounded-[10px] border-2 border-[#1B90E4] bg-white shadow-[4px_4px_4px_0_rgba(52,118,219,0.15)]"
              >
                <h3 className="title text-lg md:text-xl lg:max-w-[170px] xl:text-2xl xl:max-w-[200px] 2xl:max-w-full md:font-bold font-bold text-center text-heading-color font-poppins-util">{work.title}</h3>
                <p className="description text-xs xl:text-sm text-description-color text-center font-normal font-roboto-util" style={{lineHeight: 1.5}}>{work.description}</p>
                <div className="number w-15 h-15 xl:w-17 xl:h-17 color absolute -bottom-8  flex items-center justify-center p-5 rounded-[100px] border-4 border-white bg-[#1ABC9C]">
                  <p className="text-center font-poppins-util text-white text-[23px] xl:text-[26px] font-bold">{work.number}</p>
                </div>
                
              </div>
            ))}
          </div>

          
        </div>
      </div>
    </div>
  );
}

    
  
