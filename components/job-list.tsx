import { JobFormValues } from "@/components/job-form"

type JobListProps = {
  jobs: JobFormValues[]
}

export default function JobList({ jobs }: JobListProps) {
  return (
    <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min p-4 space-y-4">
      <h2 className="text-xl font-semibold">Submitted Jobs</h2>
      {jobs.length === 0 ? (
        <p className="text-muted-foreground">No jobs yet 😢</p>
      ) : (
        <ul className="space-y-2">
          {jobs.map((job, index) => (
            <li key={index} className="border rounded-lg p-4 bg-white shadow-sm">
              <p className="font-medium">
                {job.jobTitle} @ {job.company}
              </p>
              <p className="text-sm text-muted-foreground">
                Status: {job.status}
              </p>
              <p className="text-sm text-muted-foreground">
                Date: {job.dateApplied.toLocaleDateString()}
              </p>
              {job.jobURL && (
                <a
                  href={job.jobURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline text-sm"
                >
                  View Posting
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
