import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AppSidebar from './_components/Sidebar'
import { Toaster } from 'sonner'
import { SidebarProvider } from './_components/ui/sidebar'
import Navbar from './_components/navbar'

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
        <html lang="pt-br">
            <body className={`${inter.className} antialiased`}>
                <SidebarProvider>
                    <AppSidebar />
                    <div className="flex w-full flex-col">
                        <Navbar />
                        <div className="flex justify-center">{children}</div>
                    </div>
                    <Toaster />
                </SidebarProvider>
            </body>
        </html>
    )
}
