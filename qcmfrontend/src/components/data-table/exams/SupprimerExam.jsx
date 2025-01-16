import React, { useState } from "react";
import { ArrowUpDown, Loader, MoreHorizontal, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import ExamsApi from "../../../services/ExamsApi";



export default function SupprimerExam({ids,fetchData}) {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
  return (
    <>
    <AlertDialog>
      <AlertDialogTrigger
        onClick={() => {
          setOpen(true);
        }}
      >
        <Button variant="destructive" className="ms-4 ">
          <Trash2 className="sm:mr-2" />
          <span className="max-md:hidden">Delete Selections</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px] max-sm:w-[350px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
          Are you sure you want to delete this entry? This action is irreversible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className={"bg-red-500 hover:bg-red-600"}
            onClick={async () => {
                const deletingLoader = toast.loading("Deletion progress...");
                ExamsApi.supprimerExamsSelected(ids).then(res=>{
                    fetchData()
                    toast("Exam selected well delete", {
                      className: "!bg-red-500 !text-white",
                      description: (
                          <span className="text-white">Deleted successfuly</span>
                      ),
                    });
                    toast.dismiss(deletingLoader);   
                    setIsLoading(false)
                }).catch(err=>{
                console.log(err);
                setIsLoading(false)
                })
            

            }}
          >
            {isLoading ? (
              <Loader className={"mx-2 my-2 animate-spin"} />
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </>
  )
}

