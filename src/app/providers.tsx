'use client'

import { ThemeProvider } from '@/components/theme-provider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import AuthProvider from '@/lib/auth'

type ProviderProps = {
    children: React.ReactNode
}

export default function Providers({ children }: ProviderProps) {
    const [queryClient] = useState(() => new QueryClient())

    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </AuthProvider>
        </QueryClientProvider>
    )
}