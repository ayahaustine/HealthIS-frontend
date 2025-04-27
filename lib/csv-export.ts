export const exportToCSV = async (data: any[], filename: string) => {
  if (!data || data.length === 0) {
    console.warn("No data to export")
    return
  }

  const csvRows = []

  // Get headers
  const headers = Object.keys(data[0])
  csvRows.push(headers.join(","))

  // Get values
  for (const row of data) {
    const values = headers.map((header) => {
      const value = row[header]
      // Handle commas and quotes in values
      const escapedValue = String(value).replace(/"/g, '""')
      return `"${escapedValue}"`
    })
    csvRows.push(values.join(","))
  }

  // Combine rows
  const csvString = csvRows.join("\r\n")

  // Create a download link
  const blob = new Blob([csvString], { type: "text/csv" })
  const url = URL.createObjectURL(blob)

  // Create a temporary link element
  const link = document.createElement("a")
  link.href = url
  link.download = `${filename}.csv`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
