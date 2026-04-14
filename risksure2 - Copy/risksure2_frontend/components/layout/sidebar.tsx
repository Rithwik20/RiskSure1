"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FilePlus,
  Activity,
  Scale,
  Calculator,
  FileText,
  Shield,
} from "lucide-react"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/new-application", label: "New Application", icon: FilePlus },
  { href: "/risk", label: "Risk Scoring", icon: Activity },
  { href: "/underwriting", label: "Underwriting", icon: Scale },
  { href: "/premium", label: "Premium", icon: Calculator },
  { href: "/final", label: "Final Review", icon: FileText },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-card">
      <div className="flex h-16 items-center gap-3 border-b border-border px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
          <Shield className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="text-xl font-semibold text-foreground">RiskSure</span>
      </div>
      <nav className="flex flex-col gap-1 p-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                isActive
                  ? "bg-secondary text-secondary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
