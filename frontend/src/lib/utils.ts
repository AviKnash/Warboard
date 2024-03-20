import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import pikachu from "/pikachu-icon.png"
import greek from "/greek-icon.png"
import puzzle from "/puzzle-icon.png"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const userComments = [
  {
    name: "Sanduni Wijerathne",
    title: "Bunny",
    description: "Just get better, idiot.",
    imageUrl: pikachu
  },
  {
    name: "John Smith",
    title: "Speedy Typer",
    description: "Practice touch typing regularly to improve your typing speed. Focus on accuracy first, speed will come with practice.",
    imageUrl: greek
  },
  {
    name: "Emily Chen",
    title: "Typing Enthusiast",
    description: " Learn and use proper typing technique, such as keeping your fingers on the home row keys and using the correct fingers for each key.",
    imageUrl: puzzle
  },

];


