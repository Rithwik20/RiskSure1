import { cn } from "@/lib/utils"

type Status = "Approved" | "Higher Premium" | "Manual Review" | string

interface StatusBadgeProps {
  status: Status
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStatusStyles = (status: Status) => {
    switch (status) {
      case "Approved":
        return "bg-[rgb(221,244,231)] text-[rgb(38,102,127)]"
      case "Higher Premium":
        return "bg-amber-100 text-amber-800"
      case "Manual Review":
        return "bg-red-100 text-red-800"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        getStatusStyles(status),
        className
      )}
    >
      {status}
    </span>
  )
}
