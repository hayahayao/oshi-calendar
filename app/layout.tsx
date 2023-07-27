import './globals.css'
import Providers from './providers'
import Header from '@/app/components/Header/Header'
import Footer from '@/app/components/Footer'

export const metadata = {
  title: 'Oshi Calendar | 推しカレンダー',
  description: `Try to analyze my oshi's calendar!`,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Header />
          <div className="hero flex-auto bg-base-200">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
