"use client";
import { useEffect,useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { JobFormValues } from "@/components/job-form";
import { ArrowUpDown, MoreVerticalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

export const columns = (
  handleDelete: (id: string) => void
): ColumnDef<JobFormValues>[] => [
  {
    accessorKey: "jobTitle",
    header: () => <div className="">Job Title/ Role</div>,
  },

  {
    accessorKey: "company",
    header: "Company",
  },

  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "jobURL",
    header: "Job URL",
    cell: ({ row }) => {
      const url = row.getValue("jobURL") as string
      const isValid = url && /\.(com|net|org|io|dev|ca|co|ai)(\/|$)/.test(url)
  
      return isValid ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="block max-w-[100px] truncate underline  text-sm"
          title={url} // Tooltip on hover
        >
          {url}
        </a>
      ) : (
        <a
          
          target="_blank"
          rel="noopener noreferrer"
          className="block max-w-[100px] truncate  text-sm"
          title={url} // Tooltip on hover
        >
          {url}
        </a>
      )
    },
  },

  {
    accessorKey: "dateApplied",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date Applied
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const rawDate = row.getValue("dateApplied") as string | Date;
      const parsedDate = new Date(rawDate);
      return format(parsedDate, "PPP"); // Apr 3, 2025
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const job = row.original;
      const [open, setOpen] = useState(false);

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
                size="icon"
              >
                <MoreVerticalIcon />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              <DropdownMenuItem>Edit... (coming soon)</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  setOpen(true);
                }}
                className="text-red-600"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete this application entry.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>NO!</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    handleDelete(job.id!);
                    setOpen(false);
                  }}
                >
                  Yes, delete it
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      );
    },
  },
];
