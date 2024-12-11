import { Basement } from '@/components/puzzles/Bacement/Bacement'
import { Basement2 } from '@/components/puzzles/Basement2/Basement2'
import { Bedroom } from '@/components/puzzles/Bedroom/Bedroom'
import { Entrance } from '@/components/puzzles/Entrance/Entrance'
import { Entrance2 } from '@/components/puzzles/Entrance2/Entrance2'
import { House } from '@/components/puzzles/House/House'
import { KidsRoom } from '@/components/puzzles/KidsRoom/KidsRoom'
import { Kitchen } from '@/components/puzzles/Kitchen/Kitchen'
import { LivingRoom } from '@/components/puzzles/LivingRoom/LivingRoom'
import { Pantry } from '@/components/puzzles/Pantry/Pantry'
import { SewingRoom } from '@/components/puzzles/SewingRoom/SewingRoom'
import { SewingRoom2 } from '@/components/puzzles/SewingRoom2/SewingRoom2'
import { UpstairsHallway } from '@/components/puzzles/UpstairsHallway/UpstairsHallway'
import { setCurrentStep, setStartTime } from '@/state/gameSlice'
import { RootState } from '@/state/store'
import { createFileRoute } from '@tanstack/react-router'
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
      return <Bedroom step={9} />
    case '10':
      return <SewingRoom step={10} />
    case '11':
      return <SewingRoom2 step={11} />
    case '12':
      return <Basement step={12} />
    case '13':
      return <Basement2 step={13} />
    default:
      return <p>step not found</p>
  }
}