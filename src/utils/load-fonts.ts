import { SatoriOptions } from "satori/wasm";

export async function loadFonts(): Promise<SatoriOptions["fonts"]> {
  return [
    {
      name: "Whitney",
      weight: 400,
      style: "normal",
      data: await (
        await fetch(
          "https://github.com/Dev-CasperTheGhost/discord-invite-widget/raw/main/assets/fonts/whitneybook.otf",
        )
      ).arrayBuffer(),
    },

    {
      name: "Whitney",
      weight: 500,
      style: "normal",
      data: await (
        await fetch(
          "https://github.com/Dev-CasperTheGhost/discord-invite-widget/raw/main/assets/fonts/whitneymedium.otf",
        )
      ).arrayBuffer(),
    },
    {
      name: "Whitney",
      weight: 600,
      style: "normal",
      data: await (
        await fetch(
          "https://github.com/Dev-CasperTheGhost/discord-invite-widget/raw/main/assets/fonts/whitneysemibold.otf",
        )
      ).arrayBuffer(),
    },
    {
      name: "Whitney",
      weight: 700,
      style: "normal",
      data: await (
        await fetch(
          "https://github.com/Dev-CasperTheGhost/discord-invite-widget/raw/main/assets/fonts/whitneybold.otf",
        )
      ).arrayBuffer(),
    },
  ];
}
