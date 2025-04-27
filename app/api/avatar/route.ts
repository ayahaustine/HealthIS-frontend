import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const name = searchParams.get("name") || "User"

  // Generate a simple SVG avatar with initials
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2)

  const colors = [
    "#4f46e5", // indigo-600
    "#0891b2", // cyan-600
    "#0d9488", // teal-600
    "#059669", // emerald-600
    "#65a30d", // lime-600
    "#ca8a04", // yellow-600
    "#ea580c", // orange-600
    "#dc2626", // red-600
    "#db2777", // pink-600
    "#9333ea", // purple-600
  ]

  // Use a hash of the name to pick a consistent color
  const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const color = colors[hash % colors.length]

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
      <rect width="40" height="40" fill="${color}" />
      <text x="50%" y="50%" dy=".1em" fill="white" font-family="Arial" font-size="16" font-weight="bold" text-anchor="middle" dominant-baseline="middle">
        ${initials}
      </text>
    </svg>
  `

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  })
}
