import { RootState } from '@/state/store'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useDispatch, useSelector } from 'react-redux'
import { setName } from '@/state/configSlice'
import { useResetApp } from '@/hooks/useResetApp'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

export const Route = createFileRoute('/_index/')({
  component: Index,
})

function Index() {
  const { name } = useSelector((state: RootState) => state.config)
  const { resetApp } = useResetApp()

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded text-center">
        <h1 className="text-2xl font-bold mb-8">Find Santa!!</h1>

        <div className="flex flex-col gap-2 min-w-[400px]">
          {!name ? (
            <NameForm />
          ) : (
            <Link to="/game" className={cn(buttonVariants(), 'w-full')}>
              Continue Game
            </Link>
          )}

          {name ? (
            <Button
              onClick={() => resetApp()}
              className="w-full"
              variant="link"
            >
              Start a new game
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  )
}

const NameForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleNameChange = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault() // Prevent the default form submission behavior

    const form = event.currentTarget
    const input = form.elements.namedItem('name') as HTMLInputElement // Explicitly cast to HTMLInputElement
    const name = input?.value

    if (name) {
      dispatch(setName(name))
      navigate({ to: '/game' })
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">New Game</Button>
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleNameChange} className="mt-8">
          <Input type="text" name="name" placeholder='Enter your name' required maxLength={10} minLength={3} />
          <Button type="submit" className='mt-4 w-full'>Start your adventure</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
