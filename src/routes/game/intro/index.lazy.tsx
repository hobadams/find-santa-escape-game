import { createLazyFileRoute, Link } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/game/intro/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <h1>Intro</h1>
      <p>some text</p>
      <Link href="/game/step/1">Start</Link>
    </div>
  )
}
