"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { KPICard } from "@/components/dashboard/kpi-card"
import { StatusBadge } from "@/components/ui/status-badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { FileText, CheckCircle, AlertTriangle, Plus, Loader2 } from "lucide-react"

interface Application {
  id: number
  name: string
  risk_score: number
  decision: string
  premium: number
}

// Mock data for demonstration
const mockApplications: Application[] = [
  { id: 1, name: "John Smith", risk_score: 0.35, decision: "Approved", premium: 6750 },
  { id: 2, name: "Sarah Johnson", risk_score: 0.72, decision: "Higher Premium", premium: 8600 },
  { id: 3, name: "Michael Brown", risk_score: 0.95, decision: "Manual Review", premium: 0 },
  { id: 4, name: "Emily Davis", risk_score: 0.28, decision: "Approved", premium: 6400 },
  { id: 5, name: "Robert Wilson", risk_score: 0.65, decision: "Higher Premium", premium: 8250 },
]

export default function DashboardPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch("http://localhost:5000/applications")
        if (response.ok) {
          const data = await response.json()
          setApplications(data)
        } else {
          // Use mock data if API is not available
          setApplications(mockApplications)
        }
      } catch {
        // Use mock data if API fails
        setApplications(mockApplications)
      } finally {
        setIsLoading(false)
      }
    }

    fetchApplications()
  }, [])

  const totalApplications = applications.length
  const approvedCount = applications.filter((a) => a.decision === "Approved").length
  const manualReviewCount = applications.filter((a) => a.decision === "Manual Review").length

  return (
    <DashboardLayout title="Dashboard" subtitle="Overview of insurance applications">
      <div className="flex flex-col gap-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <KPICard
            title="Total Applications"
            value={totalApplications}
            icon={FileText}
          />
          <KPICard
            title="Approved"
            value={approvedCount}
            icon={CheckCircle}
          />
          <KPICard
            title="Manual Review"
            value={manualReviewCount}
            icon={AlertTriangle}
          />
        </div>

        {/* Applications Table */}
        <div className="rounded-2xl bg-card p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Recent Applications</h2>
            <Link href="/new-application">
              <Button className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="mr-2 h-4 w-4" />
                New Application
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-12 text-destructive">
              {error}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-muted-foreground">Name</TableHead>
                  <TableHead className="text-muted-foreground">Risk Score</TableHead>
                  <TableHead className="text-muted-foreground">Decision</TableHead>
                  <TableHead className="text-right text-muted-foreground">Premium</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell className="font-medium text-foreground">
                      {application.name}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {(application.risk_score * 100).toFixed(0)}%
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={application.decision} />
                    </TableCell>
                    <TableCell className="text-right text-foreground">
                      {application.premium > 0
                        ? `$${application.premium.toLocaleString()}`
                        : "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
