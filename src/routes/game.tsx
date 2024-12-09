import { Bag } from '@/components/Bag/Bag'
import { buttonVariants } from '@/components/ui/button'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { createFileRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/game')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <SidebarProvider defaultOpen={false}>
      <Bag />
      <SidebarTrigger className="fixed right-4 top-4 text-white text-lg z-50" />
      <main className="fixed left-0 top-0 text-white w-full h-full min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 overflow-y-auto">

        <Outlet />
      </main>
      <Link href="/" className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }), 'fixed bottom-4 left-4')}>Exit game</Link>
    </SidebarProvider>
  )
}
