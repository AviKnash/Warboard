import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import pikachu from "/pikachu-icon.png";
import greek from "/greek-icon.png";
import puzzle from "/puzzle-icon.png";
import { faker } from "@faker-js/faker";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const generatedWords = () => {
  return faker.word.words(10).toLowerCase();
};

export const userComments = [
  {
    name: "Sanduni Wijerathne",
    title: "Bunny",
    description: "Just get better, idiot.",
    imageUrl: pikachu,
  },
  {
    name: "John Smith",
    title: "Speedy Typer",
    description:
      "Practice touch typing regularly to improve your typing speed. Focus on accuracy first, speed will come with practice.",
    imageUrl: greek,
  },
  {
    name: "Emily Chen",
    title: "Typing Enthusiast",
    description:
      " Learn and use proper typing technique, such as keeping your fingers on the home row keys and using the correct fingers for each key.",
    imageUrl: puzzle,
  },
];

export async function generateParagraph() {
  try {
    const response = await fetch("http://metaphorpsum.com/paragraphs/1");

    if (!response.ok) {
      throw new Error();
    }
    const data = await response.text();
    const paragraph = data.split(`\n`).join(" ");

    return paragraph;
  } catch (error) {
    console.log(error);
    return generatedWords();
  }
}

export const formatPercentage = (percentage: number) => {
  return percentage.toFixed(0) + "%";
};

export const countErrors = (actual: string, expected: string) => {
  const expectedCharacters = expected.split("");

  return expectedCharacters.reduce((errors, expectedChar, i) => {
    const actualChar = actual[i];
    if (actualChar !== expectedChar) {
      errors++;
    }
    return errors;
  }, 0);
};

export const calculateAccuracyPercentage = (errors: number, total: number) => {
  if (total > 0) {
    const corrects = total - errors;
    return (corrects / total) * 100;
  }

  return 0;
};
