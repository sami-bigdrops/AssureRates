'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleContactClick = () => {
    closeMobileMenu();
    router.push('/contact');
  };

  const scrollToSection = (sectionId: string) => {
    const isHomePage = pathname === '/';
    
    if (isHomePage) {
      const element = document.getElementById(sectionId);
      if (element) {
        const navbarHeight = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    } else {
      router.push(`/#${sectionId}`);
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const navbarHeight = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  };
  return (
    <div id="navbar">
      {/* MOBILE / TABLET NAVBAR */}
      <div className="block md:hidden">
        
        
        {/* Main Mobile Navbar */}
        <div className="bg-white px-6 py-7">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" onClick={closeMobileMenu}>
              <Image 
                src="/logo.svg" 
                alt="Assurifii" 
                width={120} 
                height={30} 
                className="h-8 w-auto" 
                priority
              />
            </Link>
            
            {/* Hamburger Menu */}
            <button
              onClick={toggleMobileMenu}
              className="w-9 h-9 flex items-center justify-center hamburger-menu"
              style={{
                borderRadius: '5px',
                background: 'var(--Gradient-2, linear-gradient(90deg, #07A5EC 30.77%, #3476DB 100%))'
              }}
            >
              {isMobileMenuOpen ? (
                <Image 
                  src="/line.svg" 
                  alt="Close menu" 
                  width={20} 
                  height={20} 
                  className="w-6 h-6"
                />
              ) : (
                <Image 
                  src="/cross.svg" 
                  alt="Open menu" 
                  width={20} 
                  height={20} 
                  className="w-5 h-5"
                />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="bg-white">
            <div className="px-4 pb-6 pt-1  flex flex-col justify-center  items-center gap-4">
              <Link 
                href="#work" 
                className="block text-sm font-roboto-util text-heading-color hover:text-[#1B90E4] transition-colors" 
                onClick={(e) => {
                  e.preventDefault();
                  closeMobileMenu();
                  scrollToSection('work');
                }}
              >
                How It Works
              </Link>
              <Link 
                href="#faq" 
                className="block text-sm font-roboto-util text-heading-color hover:text-[#1B90E4] transition-colors" 
                onClick={(e) => {
                  e.preventDefault();
                  closeMobileMenu();
                  scrollToSection('faq');
                }}
              >
                FAQs
              </Link>
              <Link 
                href="/about" 
                className="block text-sm font-roboto-util text-heading-color hover:text-[#1B90E4] transition-colors" 
                onClick={closeMobileMenu}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="block text-sm font-roboto-util text-heading-color hover:text-[#1B90E4] transition-colors" 
                onClick={closeMobileMenu}
              >
               
              </Link>
              <div className="">
                <button 
                  className="w-full text-[0.9rem] text-white-color px-15 py-3 font-medium font-roboto-util cursor-pointer transition-all duration-300"
                  style={{
                    borderRadius: '8px',
                    background: 'var(--Button-1, linear-gradient(90deg, #07A5EC 30.77%, #3476DB 100%))'
                  }}
                  onClick={handleContactClick}
                >
                   Contact
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* DESKTOP NAVBAR */}
      <div className="hidden md:block">
        
        
        {/* Main Desktop Navbar */}
        <div className="bg-white md:bg-[#E8F4FC] px-10 md:py-4 lg:py-5 xl:py-5 xl:px-38  2xl:px-39">
          <div className=" mx-auto flex justify-between items-center">
            {/* Logo */}
            <Link href="/">
              <Image 
                src="/logo.svg" 
                alt="Assurifii" 
                width={120} 
                height={30} 
                className="h-8 md:h-9 lg:h-9 xl:h-10 w-auto" 
                priority
              />
            </Link>
            
            <div className="flex flex-row items-center justify-center gap-10 lg:flex lg:items-center lg:justify-center lg:gap-10 xl:gap-12">
              {/* Navigation Links */}
              <nav className="flex items-center justify-center gap-7 xl:gap-13">
                <Link 
                  href="#work" 
                  className="text-sm xl:text-[0.95rem] font-roboto-util text-heading-color hover:text-[#1B90E4] transition-colors" 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('work');
                  }}
                >
                  How It Works
                </Link>
                <Link 
                  href="#faq" 
                  className="text-sm xl:text-[0.95rem] font-roboto-util text-heading-color hover:text-[#1B90E4] transition-colors" 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('faq');
                  }}
                >
                  FAQs
                </Link>
                  <Link href="/about" className="text-sm xl:text-[0.95rem] font-roboto-util text-heading-color hover:text-[#1B90E4] transition-colors" >
                  About
                </Link>
                
              </nav>
              
              {/* CTA Button */}
              <button
                className=" text-sm  lg:text-base xl:text-[1.1rem] text-white-color py-2.5 px-10 lg:px-12 xl:px-14 lg:py-3 xl:py-3 font-medium cursor-pointer font-roboto-util transition-all duration-300"
                style={{
                  borderRadius: '8px',
                  background: 'var(--Button-1, linear-gradient(90deg, #07A5EC 30.77%, #3476DB 100%))'
                }}
                onClick={() => router.push('/contact')}
              >
                 Contact
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
