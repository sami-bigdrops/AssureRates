import React from 'react'
import Navbar from '../../asf/navbar'
import Footer from '../../asf/footer'

export default function ContactPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      
    </>
  )
}
