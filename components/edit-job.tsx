"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import JobForm, { JobFormValues } from "@/components/job-form";
import { useState } from "react";

interface EditJobDialogProps {
  job: JobFormValues;
  onUpdate: (updatedJob: JobFormValues) => void;

  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function EditJobDialog({
  job,
  open,
  onUpdate,
  setOpen,
}: EditJobDialogProps) {
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Job</DialogTitle>
          </DialogHeader>

          <JobForm
            isEditMode
            initialValues={job}
            onSubmitJob={(updatedJob) => {
              onUpdate(updatedJob);
              setOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
