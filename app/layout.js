'use client'
import "./globals.css"
import { ThemeProvider } from 'next-themes'
import Header from '../components/header'
import Footer from "../components/footer"

export default function RootLayout({ children }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute='class'>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
