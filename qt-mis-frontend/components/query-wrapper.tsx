'use client'

import {
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


interface Props {
    children: React.ReactNode
}


export function QueryWrapper({ children }: Props) {
    const queryClient = new QueryClient()
    return (
      <QueryClientProvider client={queryClient} >
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      
    )
  }