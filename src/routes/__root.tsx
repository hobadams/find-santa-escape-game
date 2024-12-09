import Snowflakes from '@/components/ui/Snowflakes'
import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <div>
      <Snowflakes />
      <main className="relative z-10 w-full h-full">
        <Outlet />
      </main>
    </div>
  ),
})