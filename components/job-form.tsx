

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { useState } from "react"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"

import supabase from "@/lib/supabase"
import { error } from "console"



const formSchema = z.object({
  id: z.string().uuid().optional(),
  jobTitle: z.string().min(2).max(50),
  company: z.string().min(2).max(50),
  status: z.enum([
    "Submitted",
    "In-progress",
    "Rejected-No Interview",
    "Rejected-After Interview",
    "Offer",
  ]),
  dateApplied: z.coerce.date(),
  jobURL: z.string().optional(),
})

export type JobFormValues = z.infer<typeof formSchema>

export default function JobForm({
  onSubmitJob,
}: {
  onSubmitJob: (data: JobFormValues) => void
}) {
  
  const form = useForm<JobFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      
      jobTitle: "",
      company: "",
      status: "Submitted",
      dateApplied: undefined,
      jobURL: "",
    },
  })

  const onSubmit = async (values: JobFormValues) => {
    // 1. Get the logged-in user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()
  
    if (!user) {
      alert("You must be logged in to submit.")
      return
    }

    
  
    // 2. Insert job into Supabase
    const { data,error } = await supabase.from("jobs").insert([
      {
        
        job_title: values.jobTitle,
        company: values.company,
        status: values.status,
        date_applied: values.dateApplied,
        job_url: values.jobURL || null,
        user_id: user.id,
      },
    ])
    .select("*")
    .single()
    
    // 3. Handle success/failure
    if (error) {
      console.error("Error saving job:", error.message)
      alert("Something went wrong")
    } else {
      alert("Job saved successfully!")
      onSubmitJob({
        id: data.id,
        jobTitle: data.job_title,
        company: data.company,
        status: data.status,
        dateApplied: new Date(data.date_applied),
        jobURL: data.job_url ?? "",
      });
      form.reset() // optional: clear the form after saving
    }
  }
  

  // onSubmitJob(values)
    // form.reset() 

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Job Title */}
          <FormField
            control={form.control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Frontend Developer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Company */}
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Google" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Status */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Submitted">Submitted</SelectItem>
                    <SelectItem value="In-progress">In-progress</SelectItem>
                    <SelectItem value="Rejected-No Interview">
                      Rejected-No Interview
                    </SelectItem>
                    <SelectItem value="Rejected-After Interview">
                      Rejected-After Interview
                    </SelectItem>
                    <SelectItem value="Offer">Offer</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date Applied */}
          <FormField
            control={form.control}
            name="dateApplied"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date Applied</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? format(field.value, "PPP") : "Pick a date"}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Job URL */}
          <FormField
            control={form.control}
            name="jobURL"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Link</FormLabel>
                <FormControl>
                  <Input placeholder="(Optional) www.company.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button type="submit" className="px-6 py-2 text-sm font-semibold shadow">
            Save Application
          </Button>
        </div>
      </form>
    </Form>
  )
}
