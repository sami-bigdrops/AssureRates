'use client'

import React     from 'react';
import Image     from 'next/image';
import Link      from 'next/link';
import { INFO }  from '@/lib/constant';

interface FooterProps {
  hideFloatContainer?: boolean;
}

export default function Footer({ hideFloatContainer = false }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`text-white relative ${hideFloatContainer ? 'p-6 py-10 md:p-9 lg:py-13 lg:px-8 xl:px-38 2xl:px-42 xl:py-18' : 'p-6 py-10 md:p-9 md:pt-50 lg:pt-58 xl:pt-72 lg:py-13 lg:px-8 xl:px-38 2xl:px-42 xl:py-18'}`}
      style={{
        background:
          'var(--Footer-gradient, linear-gradient(0deg, #3476DB 0.06%, #3178DB 34.02%, #2981DF 56.99%, #1B90E4 76.97%, #07A5EC 94.95%, #00AEEF 99.94%))',
      }}
    >
      <div className="container mx-auto">
        {!hideFloatContainer && (
        <div className="footer-float-container md:max-w-[700px] lg:max-w-[820px] xl:max-w-[1040px] mx-auto absolute -top-117 md:-top-38 xl:-top-47 md:left-8 lg:left-26 xl:left-58 min-[375px]:-top-125 min-[425px]:-top-131 left-0 w-full flex flex-col justify-center items-center md:flex-row gap-6 md:gap-10 p-[20px] py-[40px] md:px-[30px] md:py-[50px] xl:py-[60px] xl:px-[40px] rounded-t-[30px] md:rounded-b-[30px] bg-[#E8F4FC] ">
          <div className="footer-float-left md:w-[50%]">
            <div className="title-container flex flex-col items-center justify-center md:justify-start md:items-start gap-4 md:gap-5 xl:gap-5 text-center">
              <div className="title">
                <h1
                  className="text-3xl md:text-3xl lg:text-4xl xl:text-[2.5rem] md:max-w-full xl:max-w-[500px] font-bold text-heading-color text-center md:text-left font-poppins-util"
                  style={{ lineHeight: 1.2 }}
                >
                  {INFO.MAIN_HEADING.part1}{' '}
                  <span className="heading-gradient display-inline">
                    {INFO.MAIN_HEADING.part2}
                  </span>{' '}
                  {INFO.MAIN_HEADING.part3}
                </h1>
              </div>
              <div className="title-description">
                <p className="text-sm lg:text-base xl:text-lg text-description-color text-center font-roboto-util max-w-3xl md:max-w-full xl:max-w-[520px] mx-auto md:text-left">
                  {INFO.SUB_DESCRIPTION}
                </p>
              </div>
              <div className="w-full max-w-[170px] lg:max-w-[240px] xl:max-w-[280px] xl:mt-1 mx-auto md:mx-0 md:flex md:items-start md:justify-start lg:justify-start md:text-left">
                <button
                  className="text-sm w-full max-w-[170px] lg:max-w-[190px] xl:max-w-[210px]  lg:text-base xl:text-[1.1rem] text-white-color py-3 px-4 lg:px-5 lg:py-3.5 xl:py-4 font-medium cursor-pointer font-roboto-util transition-all duration-300"
                  style={{
                    borderRadius: '8px',
                    background:
                      'var(--Button-1, linear-gradient(90deg, #07A5EC 30.77%, #3476DB 100%))',
                  }}
                  onClick={() => {
                    const element = document.getElementById('navbar');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                >
                  {INFO.CTA_BUTTON}
                </button>
              </div>
            </div>
          </div>
          <div className="footer-float-right h-full md:w-[50%] flex items-center justify-center">
            <div className="image-container h-full w-full ">
              <Image
                src={`/${INFO.IMAGE}`}
                alt={INFO.IMAGE_ALT}
                width={1000}
                height={1000}
                className="w-full h-full object-cover "
              />
            </div>
          </div>
        </div>
        )}
        <div className="content flex w-full flex-col items-center justify-center gap-5 md:gap-8 lg:gap-12 xl:gap-12 ">
          <div className="footer-top w-full flex flex-col justify-center items-center gap-4 md:flex-row md:items-start md:justify-start">
            <div className="footer-left w-full flex flex-col justify-center items-center md:flex-row md:items-start md:justify-start gap-7 xl:gap-18 2xl:gap-24">
              <div className="flex flex-col w-full md:w-[30%] xl:w-[35%] justify-center items-center md:items-start md:justify-start gap-3 lg:gap-4 xl:gap-5">
                <div className="footer-logo">
                  <Image
                    src="/logo-white.svg"
                    alt="Platinum Window Expert"
                    width={150}
                    height={30}
                    className="h-10 md:h-9.5 lg:h-12 xl:h-13.5 w-auto"
                  />
                </div>
                <div className="copyright text-center ">
                  <p
                    className="text-sm md:text-[0.85rem] max-w-[200px] lg:max-w-[230px] lg:text-[1rem] xl:text-[1.05rem] md:text-left font-roboto-util font-normal lg:text-sm xl:text-base text-white-color "
                    style={{ lineHeight: 1.6 }}
                  >
                    &copy; {currentYear} Copyright <span className="text-white-color font-semibold">AssureRates.com</span> 
                    {' '}All Rights Reserved
                  </p>
                </div>
              </div>
              <div className="footer-right w-full md:w-[70%] xl:w-[65%] flex flex-col justify-center items-center gap-2">
                <div className="footer-grid w-full flex flex-row justify-center items-start md:justify-center md:gap-6 lg:gap-10 xl:gap-12 2xl:gap-14 gap-4">
                  <div className="footer-grid-item flex flex-col justify-center items-center md:flex-row md:items-start md:justify-start gap-3 lg:gap-6 xl:gap-8">
                    <div className="footer-heading">
                      <h2 className="text-[0.85rem] md:text-[0.9rem] lg:text-[1.1rem] xl:text-[1.18rem] font-roboto-util font-semibold lg:text-sm xl:text-base text-white-color">
                        SHOP
                      </h2>
                    </div>
                    <div className="footer-content flex flex-col justify-center items-center gap-2 md:items-start md:justify-start md:gap-3 lg:gap-4 xl:gap-5">
                      <Link 
                        href="https://autoquote.assurerates.com/" 
                        className="text-xs md:text-[0.8rem] lg:text-[0.98rem] xl:text-[1.05rem] font-roboto-util cursor-pointer font-medium lg:text-sm xl:text-base text-white-color hover:opacity-80 transition-opacity duration-300"
                      >
                        Auto Insurance
                      </Link>
                      <Link 
                        href="https://homequotes.assurerates.com/" 
                        className="text-xs md:text-[0.8rem] lg:text-[0.98rem] xl:text-[1.05rem] font-roboto-util cursor-pointer font-medium lg:text-sm xl:text-base text-white-color hover:opacity-80 transition-opacity duration-300"
                      >
                        Home Insurance
                      </Link>
                      <Link 
                        href="https://mortgage.assurerates.com/" 
                        className="text-xs md:text-[0.8rem] lg:text-[0.98rem] xl:text-[1.05rem] font-roboto-util cursor-pointer font-medium lg:text-sm xl:text-base text-white-color hover:opacity-80 transition-opacity duration-300"
                      >
                        Mortgage
                      </Link>
                      <Link 
                        href="https://life.assurerates.com/" 
                        className="text-xs md:text-[0.8rem] lg:text-[0.98rem] xl:text-[1.05rem] font-roboto-util cursor-pointer font-medium lg:text-sm xl:text-base text-white-color hover:opacity-80 transition-opacity duration-300"
                      >
                        Life Insurance
                      </Link>
                    </div>
                  </div>
                  <div className="footer-grid-item flex flex-col justify-center items-center md:flex-row md:items-start md:justify-start gap-3 lg:gap-6">
                    <div className="footer-heading">
                      <h2 className="text-[0.85rem] md:text-[0.9rem] lg:text-[1.1rem] xl:text-[1.18rem] font-roboto-util font-semibold lg:text-sm xl:text-base text-white-color">
                        COMPANY
                      </h2>
                    </div>
                    <div className="footer-content flex flex-col justify-center items-center gap-2 md:items-start md:justify-start md:gap-3 lg:gap-4 xl:gap-5">
                      <Link 
                        href="/about" 
                        className="text-xs md:text-[0.8rem] lg:text-[0.98rem] xl:text-[1.05rem] font-roboto-util font-medium lg:text-sm xl:text-base text-white-color hover:opacity-80 transition-opacity duration-300"
                      >
                        About
                      </Link>
                      <Link 
                        href="/contact" 
                        className="text-xs md:text-[0.8rem] lg:text-[0.98rem] xl:text-[1.05rem] font-roboto-util font-medium lg:text-sm xl:text-base text-white-color hover:opacity-80 transition-opacity duration-300"
                      >
                        Contact
                      </Link>
                    </div>
                  </div>
                  <div className="footer-grid-item flex flex-col justify-center items-center md:flex-row md:items-start md:justify-start gap-3 lg:gap-6 ">
                    <div className="footer-heading">
                      <h2 className="text-[0.85rem] md:text-[0.9rem] lg:text-[1.1rem] xl:text-[1.18rem] font-roboto-util font-semibold lg:text-sm xl:text-base text-white-color">
                        PRIVACY
                      </h2>
                    </div>
                    <div className="footer-content flex flex-col justify-center items-center gap-2 md:items-start md:justify-start md:gap-3 lg:gap-4 xl:gap-5">
                      <a
                        href="/privacy-policy"
                        className="text-xs md:text-[0.8rem] lg:text-[0.98rem] xl:text-[1.05rem] font-roboto-util font-medium lg:text-sm xl:text-base text-white-color cursor-pointer hover:opacity-80 transition-opacity duration-300"
                      >
                        Privacy Policy
                      </a>
                      <a
                        href="/terms-of-use"
                        className="text-xs md:text-[0.8rem] lg:text-[0.98rem] xl:text-[1.05rem] font-roboto-util font-medium lg:text-sm xl:text-base text-white-color cursor-pointer hover:opacity-80 transition-opacity duration-300"
                      >
                        Terms of Use
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-line w-full h-[0.5px] bg-[#E8F4FC] mt-1 mb-1" />

          <div className="footer-bottom">
            <div className="footer-text">
              <p className="text-xs md:text-[0.75rem] lg:text-[0.98rem] xl:text-[1.05rem] font-inter text-center md:text-left font-roboto-util font-normal lg:text-sm xl:text-base text-white "
                 style={{ lineHeight: 1.5 }}
              >
                Disclaimer: The advertisers appearing on this website are clients from which AssureRates receives compensation (“Sponsors”). Compensation may impact where the Sponsors appear on this website (including the order in which they appear). Our websites do not, and are not intended to, provide a comprehensive list of all companies that may provide the products and services you are seeking.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
