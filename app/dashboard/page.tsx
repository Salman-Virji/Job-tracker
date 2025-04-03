"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils"; // from shadcn starter
import { useState } from "react";

export default function Page() {
  const formSchema = z.object({
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
  });

  const [jobs, setJobs] = useState<z.infer<typeof formSchema>[]>([]);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobTitle: "",
      company: "",
      status: "Submitted",
      dateApplied: undefined,
      jobURL: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Submitted:", values);
    setJobs((prevJobs) => [...prevJobs, values]);
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />

            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Job Tracker</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="ml-auto px-4 ">
            <ModeToggle />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" >Hey</div>
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div> */}
          <div className="bg-muted/50   rounded-xl ">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 py-5">
                  <FormField
                    control={form.control}
                    name="jobTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Frontend developer"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company</FormLabel>
                        <FormControl>
                          <Input placeholder="Company" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

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
                            <SelectItem value="In-progress">
                              In-progress
                            </SelectItem>
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
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
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

                  <FormField
                    control={form.control}
                    name="jobURL"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Link</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="(Optional) www.company.com"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="mt-auto flex justify-end">
                    <Button
                      type="submit"
                      className="px-6 py-2 text-sm font-medium shadow-md hover:shadow-2xlg transition-all duration-200"
                    >
                      Save Application
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </div>
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min">
            <h2 className="text-xl font-semibold">Submitted Jobs</h2>
            {jobs.length === 0 && (
              <p className="text-muted-foreground">No jobs yet 😢</p>
            )}
            <ul className="space-y-2">
              {jobs.map((job, index) => (
                <li key={index} className="border rounded-lg p-4">
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
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
