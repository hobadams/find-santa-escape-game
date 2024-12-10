import { Bag } from '@/components/Bag/Bag'
import { Clue } from '@/components/Clue/Clue'
import Timer from '@/components/Timer/Timer'
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
      <header className="flex justify-start fixed left-0 top-0 w-auto z-10 bg-black/90 py-2 px-4 rounded-lg">
        <div className="flex items-center justify-between gap-4">
          <SidebarTrigger />
          <Clue />
          <Timer />
        </div>
      </header>


      <main className="fixed left-0 top-0 text-white w-full h-full min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 overflow-y-auto">

        <Outlet />
      </main>
      <Link href="/" className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }), 'fixed bottom-4 left-4 z-10')}>Exit game</Link>

    </SidebarProvider>
  )
}
