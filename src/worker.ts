import { oneHourInSeconds } from "./utils/discord";
import { renderInviteSVG } from "./utils/svg-renderer";
import { getSupportedLocale } from "./utils/translate";

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    const inviteCode = url.searchParams.get("inviteCode");
    if (!inviteCode) {
      return new Response("Missing invite code", { status: 400 });
    }

    const locale = getSupportedLocale(url.searchParams.get("locale"));
    const svg = await renderInviteSVG({ locale, inviteCode });

    if (!svg) {
      return new Response(
        JSON.stringify({
          error: "Unable to fetch invite information",
        }),
        { status: 500 },
      );
    }

    return new Response(svg, {
      headers: {
        "Cache-Control": `public, max-age=${oneHourInSeconds}`,
        "Content-Type": "image/svg+xml",
      },
    });
  },
};
