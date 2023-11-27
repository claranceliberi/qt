"use client"
import { MainNav } from '@/components/main-nav'
import { UserNav } from '@/components/user-nav'

interface DashboardLayoutProps {
    children: React.ReactNode
  }

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
       <>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div >{children}</div>
        </div>
      </div>
    </>
        
    )
  }
  