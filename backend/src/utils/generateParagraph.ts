import { faker } from "@faker-js/faker";

const generatedWords = () => {
  return faker.word.words(10).toLowerCase();
};

export async function generateParagraph() {
  try {
    const response = await fetch("http://metaphorpsum.com/paragraphs/1/3");

    if (!response.ok) {
      throw new Error();
    }
    const data = await response.text();
    const paragraph = data.split(`\n`).join(" ");

    return paragraph;
  } catch (error) {
    console.log(error);
    return generatedWords()
  }
}
