'use client'

import { useIsMobile } from '../_hooks/use-mobile'
import { SidebarTrigger } from './ui/sidebar'

const Navbar = () => {
    const isMobile = useIsMobile()

    if (isMobile) {
        return (
            <nav className="flex h-12 w-full items-center justify-between bg-white px-4">
                <h1>Stockly</h1>
                <SidebarTrigger />
            </nav>
        )
    }
}

export default Navbar
