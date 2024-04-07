export const isKeyboardCodeAllowed = (code: string) => {
    return (
      code.startsWith("Key") ||
      code.startsWith("Digit") ||
      code === "Backspace" ||
      code === "Space" ||
      code === "Comma" ||
      code === "Minus" ||
      code === "Period" ||
      code === "Slash" ||
      code === "Backquote" ||
      code === "Quote" ||
      code.startsWith("Backquote")

    );
  };