import { setCurrentStep } from '@/state/stepSlice'
import { RootState } from '@/state/store'
import { createFileRoute } from '@tanstack/react-router'
import { useDispatch, useSelector } from 'react-redux'

export const Route = createFileRoute('/game/step/$step/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { step } = Route.useParams()
  const { steps, currentStep } = useSelector((state: RootState) => state.step)
  const dispatch = useDispatch()
  if (!steps.find(s => s.key.toString() === step)) {
    return <div>Invalid step</div>
  }


  if (Number(step) > 1 && !steps.find(s => s.key === Number(step) - 1)?.completed) {
    return <div>Step {Number(step) - 1} must be completed first</div>
  }

  dispatch(setCurrentStep(step))

  return <div>Hello "/game/$step/"! {step} {currentStep}</div>
}
