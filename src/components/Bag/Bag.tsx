import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "../ui/dialog"
import { useSelector } from "react-redux"
import { RootState } from "@/state/store"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, useSidebar } from "../ui/sidebar"
import { BagItem } from "@/state/bagSlice"


type ItemDetails = {
  name: string
  description: string
  image: string
}


const getItemDetails = (item: BagItem): ItemDetails | null => {
  switch (item) {
    case "snow-globe":
      return {
        name: "Your favourite snow globe",
        description: "A beautiful snow globe with a winter scene inside. Your Grandma gave you this.",
        image: "/images/snow-globe.webp",
      }
    case "map":
      return {
        name: "First floor map",
        description: "You found this in the entrance hallway when coming from the main entrance.",
        image: "/images/map.png",
      }

    case "nice":
      return {
        name: "Santa's List",
        description: "It's smudged so we don't know if you're on the naughty or nice list.",
        image: "/images/nice-list.png",
      }

    case "naughty":
      return {
        name: "Santa's List",
        description: "It's smudged so we don't know if you're on the naughty or nice list.",
        image: "/images/naughty-list.png",
      }

    case "carrot":
      return {
        name: "Carrot",
        description: "It has a huge reindeer sized bite out of it...how strange.",
        image: "/images/carrot.webp",
      }

    default:
      return null
  }
}

export function Bag() {
  const { items } = useSelector((state: RootState) => state.bag)
  const { open, setOpen } = useSidebar();

  return (

    <>
      <Sidebar variant="sidebar" className="z-20" side="right">
        <SidebarHeader><h3 className="text-center">Your Bag</h3></SidebarHeader>
        <SidebarContent>
          <div className="grid grid-cols-2 gap-4 p-4">
            {items.map((item) => {
              const itemDetails = getItemDetails(item)
              if (!itemDetails) return null
              return (
                <div key={item} className="border border-dashed border-sidebar-background/90 h-[100px] w-[100px] rounded-full border-2 hover:opacity-80">
                  <Dialog>
                    <DialogTrigger>
                      <img src={itemDetails.image} alt={itemDetails.name} className="w-full h-full rounded-full" />
                    </DialogTrigger>
                    <DialogContent className="text-center">
                      <DialogTitle>{itemDetails.name}</DialogTitle>
                      <DialogDescription>{itemDetails.description}</DialogDescription>
                      <img src={itemDetails.image} alt={itemDetails.name} className="rounded-lg mx-auto" />
                    </DialogContent>
                  </Dialog>
                </div>
              )
            }
            )}
            <div className="border border-dashed border-sidebar-background/90 h-[100px] w-[100px] rounded-full border-2"></div>
            <div className="border border-dashed border-sidebar-background/90 h-[100px] w-[100px] rounded-full border-2"></div>
            <div className="border border-dashed border-sidebar-background/90 h-[100px] w-[100px] rounded-full border-2"></div>
          </div>
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
      {open ? <button onClick={() => setOpen(false)} className="fixed z-10 top-0 left-0 right-0 bottom-0 min-h-screen bg-black/30 text-in" aria-label="close sidebar">&nbsp;</button> : null}
    </>
  )
}
