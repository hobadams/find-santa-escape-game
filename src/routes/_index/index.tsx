import { RootState } from '@/state/store'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useDispatch, useSelector } from 'react-redux'
import { setName } from '@/state/configSlice'
import { useResetApp } from '@/hooks/useResetApp'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Music } from 'lucide-react'
import { useEffect } from 'react'

export const Route = createFileRoute('/_index/')({
  component: Index,
})

function Index() {
  const { name } = useSelector((state: RootState) => state.config)
  const { resetApp } = useResetApp()

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded text-center">
        <img src="/images/logo.webp" alt="Escape Room" className="w-[300px] h-[300px] mx-auto mb-8 rounded-full" />

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
      <div className="fixed bottom-4 right-4 flex justify-end items-end flex-col gap-4">
        <a href="https://open.spotify.com/playlist/0X5baMRrz5QDNcC1mWvBNk?si=5130ee72e1d540f5" target='_blank' className={cn(buttonVariants({ size: 'sm' }))}>
          <Music />
          <span>Here are some spooooooooky songs</span>
        </a>
        <a href="https://open.spotify.com/playlist/3ggRyPeN5BcQSBJ2UB6G8L?si=349c12717657490a" target='_blank' className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }))}>
          <Music />
          <span>Here are some Christmas songs</span>
        </a>
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
      navigate({ to: '/intro' })
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">New Game</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle className="sr-only">Eddy the Elf</DialogTitle>
        <form onSubmit={handleNameChange} className="mt-8">
          <Input type="text" name="name" placeholder='Enter your name' required maxLength={10} minLength={3} />
          <Button type="submit" className='mt-4 w-full'>Start your adventure</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
