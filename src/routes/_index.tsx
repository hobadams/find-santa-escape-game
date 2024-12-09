import Snowflakes from '@/components/ui/Snowflakes'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_index')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <Snowflakes />
      <main className="relative z-10 w-full h-full">
        <Outlet />
      </main>
    </div>
  )
}
