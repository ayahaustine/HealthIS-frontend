"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { type County, getSubCountiesByName } from "@/lib/kenya-data"
import { ClientService, type CreateClientRequest } from "@/lib/client-service"

// Form schema with validation
const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  dateOfBirth: z.date({
    required_error: "Date of birth is required.",
  }),
  phoneNumber: z.string().regex(/^(?:\+254|0)[17]\d{8}$/, {
    message: "Please enter a valid Kenyan phone number (e.g., +254712345678 or 0712345678).",
  }),
  county: z.string({
    required_error: "Please select a county.",
  }),
  subCounty: z.string({
    required_error: "Please select a sub-county.",
  }),
  gender: z.enum(["male", "female"], {
    required_error: "Please select a gender.",
  }),
})

export function RegisterClientForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [counties, setCounties] = useState<County[]>([])
  const [isLoadingCounties, setIsLoadingCounties] = useState(true)

  // Fetch counties data
  useEffect(() => {
    async function fetchCounties() {
      try {
        const response = await fetch("/data/kenya-counties.json")
        const data = await response.json()
        setCounties(data)
      } catch (error) {
        console.error("Error loading counties data:", error)
        toast({
          title: "Error",
          description: "Failed to load counties data. Please refresh the page.",
          variant: "destructive",
        })
      } finally {
        setIsLoadingCounties(false)
      }
    }

    fetchCounties()
  }, [toast])

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      county: "",
      subCounty: "",
      gender: undefined,
    },
  })

  // Watch the county field to update sub-counties
  const selectedCounty = form.watch("county")
  const subCounties = selectedCounty ? getSubCountiesByName(selectedCounty, counties) : []

  // Reset sub-county when county changes
  const handleCountyChange = (value: string) => {
    form.setValue("county", value)
    form.setValue("subCounty", "")
  }

  // Map form gender to API gender format
  const mapGenderToApiFormat = (gender: string): string => {
    return gender === "male" ? "M" : "F"
  }

  // Format date to YYYY-MM-DD
  const formatDateForApi = (date: Date): string => {
    return format(date, "yyyy-MM-dd")
  }

  // Form submission handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)

    try {
      // Format the data for the API
      const clientData: CreateClientRequest = {
        first_name: values.firstName,
        last_name: values.lastName,
        dob: formatDateForApi(values.dateOfBirth),
        phone_number: values.phoneNumber,
        county: values.county,
        sub_county: values.subCounty,
        gender: mapGenderToApiFormat(values.gender),
      }

      // Send the data to the API
      await ClientService.createClient(clientData)

      toast({
        title: "Client registered successfully",
        description: `${values.firstName} ${values.lastName} has been added to the system.`,
        variant: "default",
        className: "bg-green-50 border-green-200",
        duration: 5000,
      })

      // Redirect to clients page
      router.push("/dashboard/clients")
    } catch (error) {
      console.error("Error registering client:", error)
      toast({
        title: "Error",
        description: "There was a problem registering the client. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register New Client</CardTitle>
        <CardDescription>Enter the client's personal information to register them in the system.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      First Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter first name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Last Name */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Last Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Date of Birth */}
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>
                      Date of Birth <span className="text-red-500">*</span>
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone Number */}
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Phone Number <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 0712345678 or +254712345678" {...field} />
                    </FormControl>
                    <FormDescription>Enter a valid Kenyan phone number</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* County */}
              <FormField
                control={form.control}
                name="county"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      County <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select onValueChange={handleCountyChange} value={field.value} disabled={isLoadingCounties}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={isLoadingCounties ? "Loading counties..." : "Select a county"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {counties.map((county) => (
                          <SelectItem key={county.code} value={county.name}>
                            {county.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Sub-County */}
              <FormField
                control={form.control}
                name="subCounty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Sub-County <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={!selectedCounty || subCounties.length === 0 || isLoadingCounties}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              isLoadingCounties
                                ? "Loading counties..."
                                : selectedCounty
                                  ? "Select a sub-county"
                                  : "Select a county first"
                            }
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {subCounties.map((subCounty) => (
                          <SelectItem key={subCounty} value={subCounty}>
                            {subCounty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Gender - Simple, elegant radio buttons */}
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    Gender <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="flex space-x-6">
                      <label
                        className="flex items-center space-x-2 cursor-pointer"
                        onClick={() => field.onChange("male")}
                      >
                        <div
                          className={cn(
                            "h-5 w-5 rounded-full border flex items-center justify-center",
                            field.value === "male" ? "border-primary bg-primary" : "border-gray-300",
                          )}
                        >
                          {field.value === "male" && <div className="h-2.5 w-2.5 rounded-full bg-white"></div>}
                        </div>
                        <span className="text-sm font-medium">Male</span>
                      </label>

                      <label
                        className="flex items-center space-x-2 cursor-pointer"
                        onClick={() => field.onChange("female")}
                      >
                        <div
                          className={cn(
                            "h-5 w-5 rounded-full border flex items-center justify-center",
                            field.value === "female" ? "border-primary bg-primary" : "border-gray-300",
                          )}
                        >
                          {field.value === "female" && <div className="h-2.5 w-2.5 rounded-full bg-white"></div>}
                        </div>
                        <span className="text-sm font-medium">Female</span>
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || isLoadingCounties}>
              {isLoading ? "Registering..." : "Register Client"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
