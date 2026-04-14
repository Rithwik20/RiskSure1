"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useApplication } from "@/context/application-context"
import { ArrowRight } from "lucide-react"

export default function NewApplicationPage() {
  const router = useRouter()
  const { setApplicationData } = useApplication()
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [sex, setSex] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!name.trim()) newErrors.name = "Name is required"
    if (!age || parseInt(age) <= 0) newErrors.age = "Valid age is required"
    if (!sex) newErrors.sex = "Sex is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleProceed = () => {
    if (validate()) {
      setApplicationData({
        name: name.trim(),
        age: parseInt(age),
        sex,
      })
      router.push("/risk")
    }
  }

  return (
    <DashboardLayout title="New Application" subtitle="Start a new insurance application">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-2xl bg-card p-8 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold text-foreground">Applicant Information</h2>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name" className="text-sm font-medium text-foreground">
                Full Name
              </Label>
              <Input
                id="name"
                placeholder="Enter applicant's full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11 rounded-xl border-input bg-background"
              />
              {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="age" className="text-sm font-medium text-foreground">
                  Age
                </Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="h-11 rounded-xl border-input bg-background"
                />
                {errors.age && <p className="text-sm text-destructive">{errors.age}</p>}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="sex" className="text-sm font-medium text-foreground">
                  Sex
                </Label>
                <Select value={sex} onValueChange={setSex}>
                  <SelectTrigger className="h-11 rounded-xl border-input bg-background">
                    <SelectValue placeholder="Select sex" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
                {errors.sex && <p className="text-sm text-destructive">{errors.sex}</p>}
              </div>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                console.log("NATIVE BUTTON CLICKED")
                handleProceed()
              }}
              className="mt-4 flex items-center justify-center h-11 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Proceed to Risk Assessment
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
