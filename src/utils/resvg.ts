import resvg_wasm from "../../node_modules/@resvg/resvg-wasm/index_bg.wasm";
import { initWasm, Resvg } from "@resvg/resvg-wasm";
import { INVITE_WIDTH } from "./svg-renderer";

initWasm(resvg_wasm);

export function svgToPng(svg: string) {
  const pngData = new Resvg(svg, {
    fitTo: {
      mode: "width",
      value: INVITE_WIDTH * 2,
    },
  });

  const png = pngData.render().asPng();

  return png;
}
