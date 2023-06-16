import twemoji from "twemoji";

interface LoadEmojiOptions {
  text: string;
}

export async function loadEmoji(options: LoadEmojiOptions) {
  const iconCode = getIconCode(options.text);
  const emojiText = await (
    await fetch(`https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/${iconCode}.svg`)
  ).text();

  return `data:image/svg+xml;base64,${btoa(emojiText)}`;
}

const U200D = String.fromCharCode(8205);
const UFE0Fg = /\uFE0F/g;

function getIconCode(char: string) {
  const indexOfChar = char.indexOf(U200D);

  return twemoji.convert.toCodePoint(indexOfChar < 0 ? char.replace(UFE0Fg, "") : char);
}
