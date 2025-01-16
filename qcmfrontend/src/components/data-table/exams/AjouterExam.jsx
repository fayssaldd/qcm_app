import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader, PlusCircle } from "lucide-react";
import { useToast } from '../../../hooks/use-toast';
import ExamsApi from '../../../services/ExamsApi';



const formSchema = z.object({
    title: z.string(),
    description : z.string(),
    duration: z.string()
});


export default function AjouterExam({fetchData}) {
    const [open , setOpen] = useState(false)
    const form = useForm({
        resolver: zodResolver(formSchema),
    });
    const [isLoading, setIsLoading] = useState(false);
    const {toast} = useToast()
    const {
        setError,
        formState:{isSubmitting},
        reset
    } = form;
   
    const onSubmit = (values) => {
        setIsLoading(true)
        ExamsApi.ajouterExam(values)
        .then((res) => {
            reset();
            fetchData()
            setIsLoading(false)
            toast({
              className: "bg-blue-500 text-white",
              title: "success",
              description: "Exam created successfuly ! ",
            });
            setOpen(false)
        })
        .catch((err) => {
            Object.entries(err.errors).forEach((error) => {
                            const [fieldName, errorMessage] = error;
                            setError(fieldName, {
                              message: errorMessage.join(),
                            });
            });
            console.log(err);
            
            setIsLoading(false)
        });
      
    }

  return (
    <Dialog  open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
      <Button>
        <PlusCircle className="mr-2" /> Create Exam
      </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px] max-sm:w-[350px]">
      <DialogHeader>
        <DialogTitle>Create Exam</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                    <Input placeholder="Title" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                    <Input placeholder="description" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Duration</FormLabel>
                    <FormControl>
                    <Input placeholder="duration" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
          
          <DialogFooter className={"mt-5"}>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader className={"mx-2 my-2 animate-spin"} />
              ) : (
                "Create"
              )}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  </Dialog>
  )
}
