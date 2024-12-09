import { RootState } from '@/state/store'
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useSelector } from 'react-redux'

export const Route = createLazyFileRoute('/game/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { currentStep } = useSelector((state: RootState) => state.step)
  const navigate = useNavigate();

  if (currentStep) {
    navigate({ to: `/game/step/${currentStep}` });
  } else {
    navigate({ to: `/game/intro` });
  }
  return <p>...loading</p>
}
