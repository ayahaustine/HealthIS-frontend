"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

interface TargetGaugeProps {
  title: string
  description?: string
  percentage: number
  change?: number
  message?: string
}

export function TargetGauge({ title, description, percentage, change, message }: TargetGaugeProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        <div className="flex items-center space-x-2">
          <button className="rounded-md p-1.5 hover:bg-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-500"
            >
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
              <circle cx="5" cy="12" r="1" />
            </svg>
          </button>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex flex-col items-center">
          <div className="w-48 h-48 mb-4">
            <CircularProgressbar
              value={percentage}
              text={`${percentage}%`}
              styles={buildStyles({
                textSize: "16px",
                pathColor: "#4F46E5",
                textColor: "#1F2937",
                trailColor: "#E5E7EB",
                pathTransitionDuration: 0.5,
              })}
            />
          </div>
          {change !== undefined && (
            <div className={`text-sm font-medium ${change >= 0 ? "text-green-600" : "text-red-600"}`}>
              {change >= 0 ? "+" : ""}
              {change}%
            </div>
          )}
          {message && <p className="text-center text-sm text-gray-600 mt-4">{message}</p>}
        </div>
      </CardContent>
    </Card>
  )
}
