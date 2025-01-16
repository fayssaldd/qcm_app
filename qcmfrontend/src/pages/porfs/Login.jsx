import React, { useState } from 'react'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Loader } from "lucide-react";

import { useUserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import LoginApi from '../../services/LoginApi';
import { PROF_EXAM_ROUTE } from '../../router';

export default function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const {login,setToken, setAuthenticated} = useUserContext()
    const navigate = useNavigate()
    const formSchema = z.object({
        email: z.string().min(2).max(50),
        password: z.string().min(2).max(50),
    })
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "fayssal@gmail.com",
          password: "fayssal@gmail.com",
        },
    })
    const {
        setError,
        formState: { isSubmitting },
    } = form;
    if (isLoading) {
        return <></>;
    }
      
    const onSubmit = async (values)=>{
        await login(values.email, values.password)
        .then((res)=>{
            const {data, status} = res
          if(status === 200){
            setToken(data.token)
            setAuthenticated(true)
            navigate(PROF_EXAM_ROUTE)
          }
        }).catch(err=>{
          const response = err.response;
          setError("email",{
            message:response.data.message
          })
        })

    }
    return (
        <div>
            <div className="max-md:order-1 items-center flex flex-col justify-start lg:col-span-2 md:h-screen w-full border-r-2 md:rounded-br-xl lg:p-12 p-8">
            <div className="text-2xl font-semibold inline-flex italic items-center text-black dark:text-white ">
                <span className="border-b-4 border-primary font-mono italic ">
                Exam
                </span>{" "}
                <span className="text-primary ms-2 font-mono italic border-b-4 border-black dark:border-white">
                {" "}
                QCM
                </span>
            </div>
            <Form {...form}>
                <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 w-96 p-7 rounded-xl mt-28 shadow-2xl border"
                >
                <h2 className=" text-3xl font-bold text-center">Se connecter</h2>
                <Separator className="my-4" />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                        <Input placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                        <Input
                            type={"password"}
                            placeholder="password"
                            {...field}
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <Button disabled={isSubmitting} className="w-full" type="submit">
                    {isSubmitting ? (
                    <Loader className={"mx-2 my-2 animate-spin"} />
                    ) : (
                    "Submit"
                    )}
                </Button>
                </form>
            </Form>
            </div>
        </div>
    )
}
