"use client"

import {ColumnDef} from "@tanstack/react-table"
import { JobFormValues } from "@/components/job-form"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"


export const columns: ColumnDef<JobFormValues> [] = [
    {
        accessorKey:"jobTitle",
        header: () => <div className="">Job Title/ Role</div>,
    },

    {
        accessorKey:"company",
        header:"Company",
    },

    {
        accessorKey:"status",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Status
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
    },

    {
        accessorKey:"jobURL",
        header:"Job URL",
    },

    {
        accessorKey:"dateApplied",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Date Applied
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
          cell: ({ row }) => {
            const rawDate = row.getValue("dateApplied") as string | Date
            const parsedDate = new Date(rawDate)
            return format(parsedDate, "PPP") // Apr 3, 2025
          },
    },
]