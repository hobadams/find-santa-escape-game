import { RootState } from '@/state/store'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useSelector } from 'react-redux'

export const Route = createFileRoute('/game/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { currentStep } = useSelector((state: RootState) => state.game)
  const navigate = useNavigate()

  if (currentStep) {
    navigate({ to: `/game/step/${currentStep}` })
  } else {
    navigate({ to: `/intro` })
  }
  return <p>...loading</p>
}
