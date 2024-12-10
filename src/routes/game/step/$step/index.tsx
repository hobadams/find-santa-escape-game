import { Entrance } from '@/components/puzzles/Entrance/Entrance'
import { House } from '@/components/puzzles/House/House'
import { LivingRoom } from '@/components/puzzles/LivingRoom/LivingRoom'
import { setCurrentStep, setStartTime } from '@/state/gameSlice'
import { RootState } from '@/state/store'
import { createFileRoute } from '@tanstack/react-router'
import { useDispatch, useSelector } from 'react-redux'

export const Route = createFileRoute('/game/step/$step/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { step } = Route.useParams()
  const { steps, startTime } = useSelector((state: RootState) => state.game)
  const dispatch = useDispatch()
  if (!steps.find(s => s.key.toString() === step)) {
    return <div>Invalid step</div>
  }


  if (Number(step) > 1 && !steps.find(s => s.key === Number(step) - 1)?.completed) {
    return <div>Step {Number(step) - 1} must be completed first</div>
  }

  dispatch(setCurrentStep(Number(step)))

  if (step === '1' && !startTime) {
    dispatch(setStartTime(new Date()))
  }

  switch (step) {
    case '1':
      return <House />
    case '2':
      return <Entrance />
    case '3':
      return <LivingRoom />
    default:
      return <p>step not found</p>
  }
}
