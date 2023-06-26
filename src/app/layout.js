import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/navbar/navbar'
import Footer from '@/components/footer/footer'
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Neo-Vest',
  description: 'Blockchain Vesting DApp',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>          
            <ToastContainer />
            <Navbar />
            {children}
            <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
