import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface KPICardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: string
  className?: string
}

export function KPICard({ title, value, icon: Icon, trend, className }: KPICardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-card p-6 shadow-sm",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-foreground">{value}</p>
          {trend && (
            <p className="mt-1 text-sm text-accent">{trend}</p>
          )}
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
          <Icon className="h-6 w-6 text-secondary-foreground" />
        </div>
      </div>
    </div>
  )
}
