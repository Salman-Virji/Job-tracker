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
import EditJobDialog from "@/components/edit-job";
import { SectionCards } from "@/components/section-cards";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";

export default function Page() {
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
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Analytics</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="ml-auto px-4 ">
            <ModeToggle />
          </div>
        </header>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                 <ChartAreaInteractive /> 
              </div>
              {/* <DataTable data={data} /> */}
            </div>
          </div>
        </div>

        {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3 gap-4 p-4 pt-0">
          <div className="bg-muted/50 aspect-video rounded-xl">Hey</div>
          <div className="bg-muted/50 aspect-video rounded-xl" />
          <div className="bg-muted/50 aspect-video rounded-xl" />
          
        </div>

        <div className="bg-muted/50 flex flex-col flex-1 rounded-xl overflow-hidden  gap-4 p-4 pt-0"></div> */}
      </SidebarInset>
    </SidebarProvider>
  );
}
