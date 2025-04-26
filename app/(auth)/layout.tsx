import type React from "react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col p-10">
        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">{children}</div>
      </div>

      {/* Right side - Branding */}
      <div
        className="hidden lg:block lg:w-1/2 text-white p-10 relative overflow-hidden"
        style={{ backgroundColor: "#161950" }}
      >
        {/* Grid Background */}
        <div className="absolute inset-0 z-0 opacity-20">
          <img src="/images/shape/grid-01.svg" alt="Grid Background" className="w-full h-full object-cover" />
        </div>

        {/* Content */}
        <div className="h-full flex flex-col items-center justify-center relative z-10">
          <div className="mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-[#465FFF] p-2 rounded-lg mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <h1 className="text-2xl font-bold">HealthIS</h1>
            </div>
            <p className="text-center max-w-md mx-auto">
              Comprehensive Health Information System - Streamline patient care with our secure, integrated platform for
              healthcare providers
            </p>
          </div>

          <div className="flex gap-8">
            <div className="bg-white bg-opacity-10 rounded-lg p-6 text-center backdrop-blur-sm">
              <div className="text-2xl font-bold">1M+</div>
              <div className="text-sm">Patient Records</div>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-6 text-center backdrop-blur-sm">
              <div className="text-2xl font-bold">500+</div>
              <div className="text-sm">Healthcare Providers</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
