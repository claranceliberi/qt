"use client"

import { Button } from "@/components/ui/button"
import React from "react"
import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

export default function IndexPage() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const router = useRouter()
  const [authInfo, setAuthInfo] = React.useState({
    email: "",
    password: "",
  })

  function handleAuthInfoChange(event: React.ChangeEvent<HTMLInputElement>) {
    setAuthInfo((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }))
  }

  async function onSubmit(event: React.SyntheticEvent) { 
    event.preventDefault()
    setIsLoading(true)
    

    const response = await fetch("http://localhost:8080/api/v1/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "accept": "*/*",
      },
      body: JSON.stringify({
        login: authInfo.email,
        password: authInfo.password,
      }),
    })

    const res = await response.json()

    if(response.status === 500) {
      alert(res.error)
    }
    if(response.status === 200){
      localStorage.setItem('qtToken', res.token.accessToken)
      router.push('/dashboard/users')

    }
    
    setIsLoading(false)
  }
  return (
    <section className="container  gap-6 pb-8 pt-6 md:py-10">
      <div className='m-auto max-w-md'>
        <form onSubmit={onSubmit}  className="w-full">
          <div className="grid gap-2">
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                onChange={handleAuthInfoChange}
              />
            </div>
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="password">
                Password
              </Label>
              <Input
                id="password"
                placeholder="********"
                type="password"
                autoCapitalize="none"
                autoComplete="password"
                autoCorrect="off"
                disabled={isLoading}
                onChange={handleAuthInfoChange}
              />
            </div>
            <Button disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign In with Email
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}
