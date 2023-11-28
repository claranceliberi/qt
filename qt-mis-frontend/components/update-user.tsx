"use client"


import { useGetProjects } from "@/services/projects"
import { useGetUsers, useUpdateUser } from "@/services/users"
import { useMemo } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { IUser, userSchema } from "@/types/schema"
import { zodResolver } from "@hookform/resolvers/zod"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"


import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { useCreateUser } from "@/services/users"
import { useToast } from "./ui/use-toast"

export function UpdateUserForm({user}:{user:IUser}) {

    const updateUser = useUpdateUser();
    const {toast} = useToast()
    
  const userForm = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress,
        phoneNumber: user.phoneNumber,
        gender: user.gender,
        status: user.status,
        password:user.password,
    },
  })

    function onSubmit(values: z.infer<typeof userSchema>) {

        console.log('submit')
        updateUser.mutate(values,{
            onSuccess: ()=>{
                toast({
                    title:"User update successfully"
                })
            },
            onError: (err)=>{
                toast({
                    title:err.message
                })
            }
        })
      }

  return (
   
        <Form {...userForm}>
            <form onSubmit={userForm.handleSubmit(onSubmit,(errors) => console.log(errors))} className=" space-y-8">


                <div className="grid grid-cols-2 gap-4">
                <FormField
                    control={userForm.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Clarance Liberi" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={userForm.control}
                    name="lastName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Ntwari" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                <FormField
                    control={userForm.control}
                    name="emailAddress"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="info@claranceliberi.me" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={userForm.control}
                    name="phoneNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                                <Input placeholder="0780449999" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                </div>


                <div className="grid grid-cols-2 gap-4">
                <FormField
          control={userForm.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Male" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {['MALE','FEMALE'].map(g  => ({value:g,label:g})).map((gender) => (
                    <SelectItem key={gender.value} value={gender.value} className="capitalize">
                      {gender.label}
                    </SelectItem>
                  ))}
                  
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

                    </div>
   
   

              <Button type="submit">Update</Button>

            </form>
        </Form>

  )
}