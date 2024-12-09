import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "../ui/dialog"
import { useSelector } from "react-redux"
import { RootState } from "@/state/store"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, useSidebar } from "../ui/sidebar"

export function Bag() {
  const { items } = useSelector((state: RootState) => state.bag)
  const { open, setOpen } = useSidebar();
  return (

    <>
      <Sidebar variant="sidebar" className="z-20">
        <SidebarHeader>Your Bag</SidebarHeader>
        <SidebarContent>
          {items.map((item) => (
            <Dialog key={item}>
              <DialogTrigger>
                <span>{item}</span>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>{item}</DialogTitle>
                <DialogDescription>Some description</DialogDescription>
              </DialogContent>
            </Dialog>
          ))}
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
      {open ? <button onClick={() => setOpen(false)} className="fixed z-10 top-0 left-0 right-0 bottom-0 min-h-screen bg-black/30 text-in" aria-label="close sidebar">&nbsp;</button> : null}
    </>
  )
}
