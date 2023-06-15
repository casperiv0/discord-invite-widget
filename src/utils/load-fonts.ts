import { SatoriOptions } from "satori/wasm";

export async function loadFonts(): Promise<SatoriOptions["fonts"]> {
  return [
    {
      name: "Roboto",
      weight: 400,
      style: "normal",
      data: await (
        await fetch(
          "https://github.com/google/fonts/raw/main/apache/roboto/static/Roboto-Regular.ttf",
        )
      ).arrayBuffer(),
    },
    {
      name: "Roboto",
      weight: 600,
      style: "normal",
      data: await (
        await fetch(
          "https://github.com/google/fonts/raw/main/apache/roboto/static/Roboto-Medium.ttf",
        )
      ).arrayBuffer(),
    },
    {
      name: "Roboto",
      weight: 700,
      style: "normal",
      data: await (
        await fetch("https://github.com/google/fonts/raw/main/apache/roboto/static/Roboto-Bold.ttf")
      ).arrayBuffer(),
    },
  ];
}
