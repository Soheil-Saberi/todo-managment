import type { Metadata } from 'next'
import { ReactNode } from 'react'

import { Providers } from '@/lib/providers'

export const metadata: Metadata = {
  title: 'Todo Management',
  description: 'Eco Task : todo management',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
