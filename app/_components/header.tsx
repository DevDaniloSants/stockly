import { ReactNode } from 'react'
import { cn } from '../_lib/utils'

interface HeaderProps {
    children: ReactNode
    className?: string
}

export const HeaderTitle = ({ children, className }: HeaderProps) => {
    return (
        <h1 className={cn('text-xl font-semibold', className)}>{children}</h1>
    )
}
export const HeaderSubtitle = ({ children, className }: HeaderProps) => {
    return (
        <span className={cn('text-xs font-semibold text-slate-500', className)}>
            {children}
        </span>
    )
}
export const HeaderLeft = ({ children, className }: HeaderProps) => {
    return <div className={cn('space-y-1', className)}>{children}</div>
}

export const HeaderRight = ({ children, className }: HeaderProps) => {
    return (
        <div className={cn('ml-auto w-full sm:w-auto', className)}>
            {children}
        </div>
    )
}

const Header = ({ children, className }: HeaderProps) => {
    return (
        <div
            className={cn(
                'flex w-full flex-wrap items-center gap-2 sm:gap-0',
                className
            )}
        >
            {children}
        </div>
    )
}

export default Header
