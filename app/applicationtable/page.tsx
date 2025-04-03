import { columns } from "./columns"
import { JobFormValues } from "@/components/job-form"
import { DataTable } from "./data-table"

async function getData(): Promise<JobFormValues[]> {
  // Fetch data from your API here.
  return [
    {
      jobTitle: "Frontend developer",
      company: "google",
      status: "Submitted",
      dateApplied: new Date("2/3/2024"),
      jobURL: "www.google.com"
    },
    // ...
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
