'use client'

import { usePathname } from 'next/navigation'
import { Button } from './ui/button'
import Link from 'next/link'

interface SidebarButtonProps {
    children: React.ReactNode
    href: string
}

const SidebarButton = ({ children, href }: SidebarButtonProps) => {
    const pathname = usePathname()

    return (
        <Button
            variant={pathname === href ? 'secondary' : 'ghost'}
            className="justify-start gap-2"
            asChild
        >
            <Link href={href}>{children}</Link>
        </Button>
    )
}

export default SidebarButton
