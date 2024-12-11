import { Entrance } from '@/components/puzzles/Entrance/Entrance'
import { Entrance2 } from '@/components/puzzles/Entrance2/Entrance2'
import { House } from '@/components/puzzles/House/House'
import { KidsRoom } from '@/components/puzzles/KidsRoom/KidsRoom'
import { Kitchen } from '@/components/puzzles/Kitchen/Kitchen'
import { LivingRoom } from '@/components/puzzles/LivingRoom/LivingRoom'
import { Pantry } from '@/components/puzzles/Pantry/Pantry'
import { UpstairsHallway } from '@/components/puzzles/UpstairsHallway/UpstairsHallway'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { setCompleteTime, setCurrentStep, setStartTime, setStepCompleted } from '@/state/gameSlice'
import { RootState } from '@/state/store'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const Route = createFileRoute('/game/step/$step/')({
  component: RouteComponent,
})

export type PuzzleProps = {
  step: number
}

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
    dispatch(setStartTime(new Date().toISOString()))
  }

  switch (step) {
    case '1':
      return <House step={1} />
    case '2':
      return <Entrance step={2} />
    case '3':
      return <Pantry step={3} />
    case '4':
      return <Kitchen step={4} />
    case '5':
      return <LivingRoom step={5} />
    case '6':
      return <Entrance2 step={6} />
    case '7':
      return <UpstairsHallway step={7} />
    case '8':
      return <KidsRoom step={8} />
    case '9':
      return <TestRoom step={9} name="adult room" />
    case '10':
      return <TestRoom step={10} name="cinema room - one percent" />
    case '11':
      return <TestRoom step={11} name="sewing room" />
    case '12':
      return <TestRoom step={12} name="basement" />
    case '13':
      return <Last step={13} name="End" />
    default:
      return <p>step not found</p>
  }
}


const TestRoom = ({ step, name }: { step: number, name: string }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setStepCompleted(step))
  }, [step])


  return (
    <div className="z-10 relative bg-white p-8 mx-auto my-12 w-[500px] flex items-center justify-center flex-col text-black">
      <h1 className="mb-4">{name}</h1>
      <Link href={`/game/step/${step + 1}`} className={cn(buttonVariants())}>Next</Link>
    </div>
  )
}

const Last = ({ step, name }: { step: number, name: string }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setStepCompleted(step))
    dispatch(setCompleteTime(new Date().toISOString()))
  }, [step])


  return (
    <div className="z-10 relative bg-white p-8 mx-auto my-12 w-[500px] flex items-center justify-center flex-col text-black">
      <h1>{name}</h1>
      <Link href={`/complete`} className={cn(buttonVariants())}>Complete</Link>
    </div>
  )
}
