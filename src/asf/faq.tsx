'use client'
import React, { useState } from 'react'
import { FAQ } from '@/lib/constant'

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFAQ = (index: number) => {
    setOpenIndex(prev => prev === index ? null : index)
  }

  return (
    <div>
      <div id="faq" className="faq w-full pt-6 px-6 pb-130 md:pb-55 lg:pb-60 xl:pb-80 min-[375px]:pb-135 min-[425px]:pb-140 md:py-12 lg:px-8 lg:py-12 xl:py-16 xl:px-38  2xl:px-42 ">
        <div className="container mx-auto ">
          <div className="content flex flex-col items-center justify-center gap-6 md:gap-8 lg:gap-10 xl:gap-12">
            <div className="title-container flex flex-col items-center justify-center gap-3 xl:gap-4 text-center ">
              <div className="title ">
                <h1 className="text-3xl md:text-3xl lg:text-4xl xl:text-[2.5rem] max-w-[280px] md:max-w-full font-bold text-heading-color text-center font-poppins-util xl:leading-[1.15]">
                  {FAQ.MAIN_HEADING.part1} <span className="heading-gradient display-inline">{FAQ.MAIN_HEADING.part2}</span>
                </h1>
              </div>
              <div className="title-description">
                <p className="text-sm lg:text-base xl:text-lg text-description-color text-center font-roboto-util max-w-3xl md:max-w-full mx-auto">
                  {FAQ.SUB_HEADING}
                </p>
              </div>
            </div>

            <div className="faq-container  w-full md:max-w-[570px] lg:max-w-[630px] xl:max-w-[800px]">
              <div className="flex flex-col gap-4 md:gap-5 lg:gap-6 xl:gap-6">
                {FAQ.QUESTIONS.map((item, index) => {
                  const isOpen = openIndex === index
                  return (
                    <div
                      key={item.id}
                      className="faq-card rounded-[10px] border-2 border-[#1B90E4] bg-white shadow-[4px_4px_4px_0_rgba(52,118,219,0.15)] p-5 md:p-5 xl:p-6 transition-all duration-300"
                    >
                      <div className="faq-question flex items-center justify-between gap-4 cursor-pointer" onClick={() => toggleFAQ(index)}>
                        <h3 className="text-[0.9rem] md:text-base lg lg:text-lg xl:text-xl font-bold text-heading-color font-poppins-util flex-1" style={{lineHeight: '1.5'}}>
                          Q{item.id}. {item.question}
                        </h3>
                        <div
                          className="faq-icon w-7 h-7 md:w-8 md:h-8 xl:w-9 xl:h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300"
                          style={{
                            background: 'var(--Gradient-2, linear-gradient(90deg, #07A5EC 30.77%, #3476DB 100%))'
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="10"
                            viewBox="0 0 18 10"
                            fill="none"
                            className={`w-2.5 h-2.5 md:w-3.5 md:h-3.5 xl:w-4 xl:h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M0.263319 0.332223C-0.0876808 0.700405 -0.0876808 1.29586 0.263319 1.66313L7.70092 9.44768C7.86486 9.62193 8.06219 9.76068 8.28088 9.8555C8.49958 9.95031 8.73508 9.9992 8.97307 9.9992C9.21106 9.9992 9.44656 9.95031 9.66526 9.8555C9.88395 9.76068 10.0813 9.62193 10.2452 9.44768L17.7377 1.60677C17.9052 1.42882 17.9993 1.19316 18.001 0.947657C18.0026 0.702154 17.9117 0.465211 17.7467 0.28495C17.6652 0.195652 17.5665 0.124201 17.4565 0.0750236C17.3466 0.0258456 17.2278 -1.26795e-05 17.1076 -0.000950126C16.9874 -0.00188757 16.8682 0.0221158 16.7576 0.0695736C16.6469 0.117031 16.5471 0.186933 16.4642 0.27495L9.60892 7.45131C9.52694 7.53851 9.42825 7.60795 9.31886 7.6554C9.20947 7.70285 9.09167 7.72732 8.97262 7.72732C8.85357 7.72732 8.73576 7.70285 8.62638 7.6554C8.51698 7.60795 8.4183 7.53851 8.33632 7.45131L1.53502 0.332223C1.45312 0.24505 1.35451 0.175631 1.24519 0.128192C1.13588 0.0807535 1.01815 0.0562892 0.89917 0.0562892C0.780193 0.0562892 0.66246 0.0807535 0.553144 0.128192C0.443829 0.175631 0.345219 0.24505 0.263319 0.332223Z"
                              fill="white"
                            />
                          </svg>
                        </div>
                      </div>
                      {isOpen && (
                        <div className="faq-answer mt-4 md:mt-5 xl:mt-6">
                          <p className="text-[0.81rem] md:text-[0.85rem] lg:text-[0.95rem] xl:text-[1.05rem] text-description-color font-roboto-util leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  )
}