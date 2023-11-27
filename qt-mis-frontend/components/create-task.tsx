"use client"


import { useGetProjects } from "@/services/projects"
import { useGetUsers } from "@/services/users"
import { useMemo } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { taskSchema } from "@/types/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { addDays, format } from "date-fns"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { MultiSelect } from "./ui/multi-select"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { cn } from "@/lib/utils"
import { Calendar } from "./ui/calendar"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { CalendarIcon } from "@radix-ui/react-icons"
import { Textarea } from "./ui/textarea"

export function CreateTaskForm() {

    const userData = useGetUsers({page:1,limit:100})
    const projectData = useGetProjects({page:1,limit:100})

    const users = useMemo(() => userData?.data?.data.content.map(user => ({
        value:user.id,
        label:user.fullName
    })) ?? [], [userData.data])
    const projects = useMemo(() => projectData?.data?.data.content.map(project => ({
        value:project.id,
        label:project.name
    })) ?? [], [projectData.data])

    const now = new Date();

    
  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
        name: "",
        description: "",
        priority: 'NORMAL',
        status:'ACTIVE',
        projectsId: [],
        assigneesId: [],
        startDate: now.toString(),
        endDate: addDays(now, 7).toString(),
    },
  })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof taskSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
      }

  return (
   
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Task Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Review project status..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="projectsId"
                        render={({ field: { ...field } }) => (
                            <FormItem className="mb-5">
                            <FormLabel>Projects</FormLabel>
                            <MultiSelect
                                selected={field.value}
                                options={projects}
                                {...field} />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="assigneesId"
                        render={({ field: { ...field } }) => (
                            <FormItem className="mb-5">
                            <FormLabel>Assignees</FormLabel>
                            <MultiSelect
                                selected={field.value}
                                options={users}
                                {...field} />
                            </FormItem>
                        )}
                    />
                </div>

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Task Description</FormLabel>
                            <FormControl>
                                <Textarea
                                placeholder="Provide a detailed description of the task...."
                                className="resize-none"
                                {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                You can <span>@mention</span> other project and assignees.
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
   
                    <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                            <FormLabel>Start</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[240px] pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                    )}
                                    >
                                    {field.value ? (
                                        format(new Date(field.value), "PPP")
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
                                    disabled={(date) =>
                                            date > new Date() || date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription>
                                        When the task starts.
                                    </FormDescription>
                                    <FormMessage />
                                    </FormItem>
                                )}
                    />
                    <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                            <FormLabel>End</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[240px] pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                    )}
                                    >
                                    {field.value ? (
                                        format(new Date(field.value), "PPP")
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
                                    disabled={(date) =>
                                            date > new Date() || date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription>
                                        When the task starts.
                                    </FormDescription>
                                    <FormMessage />
                                    </FormItem>
                                )}
                    />
              <Button type="submit">Submit</Button>

            </form>
        </Form>

  )
}


GIT_AUTHOR_DATE='Mon Nov 27 19:11:02 2023 +0200' GIT_COMMITTER_DATE='Mon Nov 27 19:11:02 2023 +0200' git commit -m 'feat: new tasks apis'