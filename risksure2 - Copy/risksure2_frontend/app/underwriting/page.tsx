"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/ui/status-badge"
import { useApplication } from "@/context/application-context"
import { ArrowRight, ArrowLeft, CheckCircle, AlertTriangle, XCircle } from "lucide-react"

export default function UnderwritingPage() {
  const router = useRouter()
  const { applicationData, setApplicationData } = useApplication()
  const [finalRisk, setFinalRisk] = useState(0)
  const [decision, setDecision] = useState("")

  useEffect(() => {
    setFinalRisk(applicationData.finalRisk)
    setDecision(applicationData.decision)
  }, [applicationData.finalRisk, applicationData.decision])

  const getDecisionIcon = () => {
    switch (decision) {
      case "Approved":
        return <CheckCircle className="h-16 w-16 text-[rgb(103,192,144)]" />
      case "Higher Premium":
        return <AlertTriangle className="h-16 w-16 text-amber-500" />
      case "Manual Review":
        return <XCircle className="h-16 w-16 text-red-500" />
      default:
        return null
    }
  }

  const handleProceed = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    console.log("BUTTON CLICKED - PROCEED")
    if (decision === "Manual Review") {
      // Cannot proceed for manual review
      return
    }
    router.push("/premium")
  }

  return (
    <DashboardLayout title="Underwriting Decision" subtitle="Review and approve the application">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl bg-card p-8 shadow-sm">
          {/* Applicant Info */}
          {applicationData.name && (
            <div className="mb-8 rounded-xl bg-secondary p-4">
              <p className="text-sm text-muted-foreground">Applicant</p>
              <p className="font-medium text-foreground">{applicationData.name}</p>
            </div>
          )}

          {/* Risk Summary */}
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-xl bg-muted p-4 text-center">
              <p className="text-sm text-muted-foreground">Risk Score</p>
              <p className="mt-1 text-2xl font-bold text-foreground">
                {(applicationData.riskScore * 100).toFixed(0)}%
              </p>
            </div>
            <div className="rounded-xl bg-muted p-4 text-center">
              <p className="text-sm text-muted-foreground">Rule Adjustment</p>
              <p className="mt-1 text-2xl font-bold text-foreground">
                +{(applicationData.ruleAdjustment * 100).toFixed(0)}%
              </p>
            </div>
            <div className="rounded-xl bg-primary/10 p-4 text-center">
              <p className="text-sm text-muted-foreground">Final Risk</p>
              <p className="mt-1 text-2xl font-bold text-primary">
                {(finalRisk * 100).toFixed(0)}%
              </p>
            </div>
          </div>

          {/* Applied Rules */}
          {applicationData.appliedRules.length > 0 && (
            <div className="mb-8">
              <h3 className="mb-4 text-lg font-semibold text-foreground">Applied Rules</h3>
              <div className="rounded-xl border border-border">
                {applicationData.appliedRules.map((rule, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b border-border p-4 last:border-b-0"
                  >
                    <span className="text-foreground">{rule.rule}</span>
                    <span className="font-medium text-primary">+{(rule.adjustment * 100).toFixed(0)}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Decision Display */}
          <div className="mb-8 flex flex-col items-center rounded-xl bg-muted p-8">
            {getDecisionIcon()}
            <h2 className="mt-4 text-2xl font-bold text-foreground">Underwriting Decision</h2>
            <div className="mt-3">
              <StatusBadge status={decision} className="px-4 py-2 text-base" />
            </div>
            <p className="mt-4 text-center text-muted-foreground">
              {decision === "Approved" && "The application meets all criteria and is approved for standard premium."}
              {decision === "Higher Premium" && "The application is approved with a higher premium due to elevated risk factors."}
              {decision === "Manual Review" && "The application requires manual review by an underwriter due to high risk factors."}
            </p>
          </div>

          {/* Actions */}
          <form onSubmit={handleProceed} className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => router.push("/risk")}
              className="h-11 rounded-xl"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Risk
            </Button>

            {decision !== "Manual Review" ? (
              <Button
                type="submit"
                className="h-11 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Proceed to Premium Calculation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={() => router.push("/dashboard")}
                className="h-11 rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Return to Dashboard
              </Button>
            )}
          </form>
        </div>
      </div>
    </DashboardLayout>
  )
}
