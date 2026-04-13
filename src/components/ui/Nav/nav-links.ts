import { Home, Star } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type NavLink = {
  label: string
  href: string
  icon: LucideIcon
}

export const navLinks: NavLink[] = [
  {
    label: 'Home',
    href: '/',
    icon: Home,
  },
  {
    label: 'Favourites',
    href: '/favourites',
    icon: Star,
  },
]
