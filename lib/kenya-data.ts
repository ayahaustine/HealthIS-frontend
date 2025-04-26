// Kenya Counties and Sub-Counties data types
export type SubCounty = string

export type County = {
  name: string
  capital: string
  code: number
  sub_counties: SubCounty[]
}

// This is a placeholder. The actual data will be fetched from the JSON file
export const kenyaCounties: County[] = []

// Helper function to get sub-counties for a given county
export function getSubCountiesByName(countyName: string, counties: County[]): SubCounty[] {
  const county = counties.find((c) => c.name === countyName)
  return county ? county.sub_counties : []
}
