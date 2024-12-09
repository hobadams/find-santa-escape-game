import { Backpack } from "lucide-react"
import { DialogHeader, Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "../ui/dialog"
import { useSelector } from "react-redux"
import { RootState } from "@/state/store"

export function Bag() {
  const { items } = useSelector((state: RootState) => state.bag)
  return (
    <Dialog>


      <DialogTrigger className="fixed z-10 top-4 right-10">
        <Backpack />
        <span className="sr-only">Check your bag</span>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Your bag</DialogTitle>
          <DialogDescription>
            {items.map((item) => <p key={item}>{item}</p>)}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>


  )
}
