import { Footer, Navbar } from '@/components'
import { Manrope } from 'next/font/google'
import './globals.css'

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' })

export const metadata = {
  title: 'Car Rental',
  description: 'Get the best cars on rent.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`relative ${manrope.variable}`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
