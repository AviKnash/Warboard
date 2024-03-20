import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import pikachu from "../../public/pikachu-icon.png"
import greek from "../../public/greek-icon.png"
import puzzle from "../../public/puzzle-icon.png"


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
  // {
  //   name: "David Johnson",
  //   title: "Keyboard Ninja",
  //   description: "Learn proper finger placement and keyboard shortcuts to increase efficiency. Take regular breaks to avoid fatigue and maintain focus.",
  //   imageUrl: ""
  // },
  // {
  //   name: "Sophia Rodriguez",
  //   title: "Swift Typist",
  //   description: "Utilize typing tutors and exercises to strengthen your typing skills. Experiment with different typing techniques and find what works best for you.",
  //   imageUrl: ""
  // },
  // {
  //   name: "Peter Canter",
  //   title: "Swift Typist",
  //   description: "Utilize typing tutors and exercises to strengthen your typing skills. Experiment with different typing techniques and find what works best for you.",
  //   imageUrl: ""
  // }
];


