"use client";
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
import { useState, useEffect } from "react";

import JobForm, { JobFormValues } from "@/components/job-form";

import { columns } from "@/app/applicationtable/columns";

import { DataTable } from "@/app/applicationtable/data-table";

import supabase from "@/lib/supabase";
import AuthButtons from "@/components/AuthButtons";

export default function Page() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  }, []);

  const [jobs, setJobs] = useState<JobFormValues[]>([]);

  function handleAddJob(data: JobFormValues) {
    setJobs((prev) => [...prev, data]);
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
        <div className={`flex flex-1 flex-col gap-4 p-4 pt-0 ${!user ?  "bg-grey-200 pointer-events-none opacity-60" :"" }`}>
          
            
          
          {!user && (
            <p className="text-sm text-gray-500 italic mt-2">
              Please log in to access this feature
            </p>
          )}
          {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" >Hey</div>
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div> */}
          <div className="bg-muted/50   rounded-xl px-5 py-5 ">
            <JobForm onSubmitJob={handleAddJob} />
          </div>
          <div className="bg-muted/50 flex flex-col flex-1 rounded-xl overflow-hidden p-2">
            <div className="flex-1 overflow-auto">
              <DataTable columns={columns} data={jobs} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
