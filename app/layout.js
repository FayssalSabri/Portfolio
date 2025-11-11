import { Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react' 
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Fayssal Sabri - Data Scientist & ML Engineer',
  description:
    'Portfolio of Fayssal Sabri - Data Scientist specializing in Machine Learning, Cloud, and AI',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
