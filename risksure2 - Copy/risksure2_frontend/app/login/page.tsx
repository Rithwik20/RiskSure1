"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, Loader2 } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate login delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simple validation
    if (email && password) {
      router.push("/dashboard")
    } else {
      setError("Please enter both email and password")
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-card p-8 shadow-md">
          <div className="mb-8 flex flex-col items-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary">
              <Shield className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="mt-4 text-2xl font-semibold text-foreground">RiskSure</h1>
            <p className="mt-1 text-sm text-muted-foreground">Healthcare Insurance Admin</p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@risksure.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 rounded-xl border-input bg-background"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password" className="text-sm font-medium text-foreground">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 rounded-xl border-input bg-background"
              />
            </div>

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="h-11 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Demo: Enter any email and password to login
          </p>
        </div>
      </div>
    </div>
  )
}
