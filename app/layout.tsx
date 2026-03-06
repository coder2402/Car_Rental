import { Footer, Navbar } from '@/components'
import './globals.css'
import { Manrope } from 'next/font/google'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
})

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
    <html lang="en" className={manrope.variable}>
      <body className="relative font-sans">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
