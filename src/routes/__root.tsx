
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { useEffect } from 'react';

export const Route = createRootRoute({
  component: () => (

    <RootComponent />

  ),
})


const preloadImages = (imageUrls: string[]) => {
  imageUrls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
};


const RootComponent = () => {

  useEffect(() => {
    const imagesToPreload = [
      '/images/bag.webp',
      '/images/bedroom.png',
      '/images/bird.webp',
      '/images/blue.webp',
      '/images/carrot.webp',
      '/images/chicken.webp',
      '/images/christmas-ghost.webp',
      '/images/code-clue.png',
      '/images/dancing.webp',
      '/images/doorstep.webp',
      '/images/dove.webp',
      '/images/drum.webp',
      '/images/eddy.webp',
      '/images/egg.webp',
      '/images/entrance-with-ghost.webp',
      '/images/entrance-with-stairs.webp',
      '/images/entrance.webp',
      '/images/flute.webp',
      '/images/fur.webp',
      '/images/ghost.webp',
      '/images/gnome.webp',
      '/images/green.webp',
      '/images/house.webp',
      '/images/jump.webp',
      '/images/kids-room.webp',
      '/images/kitchen.webp',
      '/images/living-room-door.webp',
      '/images/living-room.webp',
      '/images/logo.webp',
      '/images/map.png',
      '/images/milk.webp',
      '/images/naughty-list.png',
      '/images/nice-list.png',
      '/images/pantry-note.webp',
      '/images/pantry.webp',
      '/images/pear.webp',
      '/images/red.webp',
      '/images/rings.webp',
      '/images/santa.webp',
      '/images/snow-globe.webp',
      '/images/swan.webp',
      '/images/upstairs-hallway.webp',
      '/images/yellow.webp',
      // Add more image paths here
    ];
    preloadImages(imagesToPreload);
  }, []);

  return (
    <Outlet />
  )
}