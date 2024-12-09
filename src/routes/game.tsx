import { Bag } from '@/components/Bag/Bag'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { createFileRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/game')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <SidebarProvider defaultOpen={false}>
      <Bag />
      <SidebarTrigger className="fixed right-4 top-4 text-white text-lg" />
      <main className="text-white">

        <Outlet />
      </main>
      <Link to="/" className="fixed bottom-4 left-4 text-white hover:underline">Exit game</Link>
    </SidebarProvider>
  )
}
