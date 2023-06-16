import { oneHourInSeconds } from "./utils/discord";
import { renderInviteSVG } from "./utils/svg-renderer";

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    const inviteCode = url.searchParams.get("inviteCode");
    if (!inviteCode) {
      return new Response("Missing invite code", { status: 400 });
    }

    const svg = await renderInviteSVG({ inviteCode });

    return new Response(svg, {
      headers: {
        "Cache-Control": `public, max-age=${oneHourInSeconds}`,
        "Content-Type": "image/svg+xml",
      },
    });
  },
};
