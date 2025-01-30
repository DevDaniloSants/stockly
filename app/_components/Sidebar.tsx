'use client'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { LayoutGrid, PackageIcon, ShoppingBasket } from 'lucide-react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
    useSidebar,
} from './ui/sidebar'
import { Badge } from './ui/badge'
import { usePathname } from 'next/navigation'
import { useIsMobile } from '../_hooks/use-mobile'

const items = [
    {
        title: 'Dashboard',
        url: '/',
        icon: LayoutGrid,
    },
    {
        title: 'Produtos',
        url: '/products',
        icon: PackageIcon,
    },
    {
        title: 'Vendas',
        url: '/sales',
        icon: ShoppingBasket,
    },
]

const AppSidebar = () => {
    const pathname = usePathname()
    const isMobile = useIsMobile()
    const { open } = useSidebar()

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="relative flex items-center overflow-hidden">
                <Badge className="p-2">
                    <PackageIcon size={18} />
                </Badge>
                {!isMobile && open && (
                    <div className="absolute right-1 top-[12px]">
                        <SidebarTrigger />
                    </div>
                )}
            </SidebarHeader>
            <SidebarContent aria-describedby="sidebar-description">
                <SidebarGroup>
                    <SidebarGroupLabel>Menu</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-1">
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={pathname === item.url}
                                    >
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}

export default AppSidebar
