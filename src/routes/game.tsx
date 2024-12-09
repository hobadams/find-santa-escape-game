import { AppSidebar } from '@/components/AppSidebar/AppSidebar'
import { Bag } from '@/components/Bag/Bag'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/game')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <main className="text-white">
        <SidebarTrigger className="text-white" />
        <Bag />
        <Outlet />
      </main>
    </SidebarProvider>
  )
}
