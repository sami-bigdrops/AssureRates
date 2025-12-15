import React from 'react'
import AboutRibbon from './about-section/about-ribbon'
import AboutSection from './about-section/aboutpage'
import ResultPage from './about-section/resultpage'

export default function AboutPage() {
  return (
    <div>
        <AboutRibbon />
        <AboutSection />
        <ResultPage />
    </div>
  )
}