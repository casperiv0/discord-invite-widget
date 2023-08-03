export const INDEX_PAGE = `
# Discord Invite Widget on Cloudflare Workers

This is a Cloudflare Worker that renders a Discord invite as an SVG image.

## Usage


\`\`\`md
[![Discord Server Invite](https://invite.casperiv.dev?inviteCode=XXXXXXX)](https://discord.gg/XXXXXXX)
\`\`\`


## Query Parameters

| Name         | Description                                                                         | Required |
| :----------- | :---------------------------------------------------------------------------------- | :------- |
| \`inviteCode\` | The invite code of the server                                                       | **Yes**  |
| \`locale\`     | The locale for the widget. Supported locales: \`en-US\`, \`en-GB\`, \`fr-FR\`, \`nl\`, \`dk\` | No       |
| \`format\`     | Supports \`svg\` and \`png\`                                                            | No       |

## GitHub

[GitHub Repository](https://github.com/dev-caspertheghost/discord-invite-widget)
`;
