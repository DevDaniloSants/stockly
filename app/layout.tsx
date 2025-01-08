import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Sidebar from './_components/Sidebar'
import { Toaster } from 'sonner'

const inter = Inter({
    subsets: ['latin'],
    display: 'auto',
})

export const metadata: Metadata = {
    title: 'Stockly',
    description: 'Gerenciador de estoque',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} antialiased`}>
                <div className="flex h-full">
                    <Sidebar />
                    {children}
                </div>
                <Toaster />
            </body>
        </html>
    )
}
