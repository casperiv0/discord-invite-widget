# Discord Invite Widget

> **Note**
> Original code is from [invidget](https://github.com/SwitchbladeBot/invidget). This repo is a fork of the original repo with some changes to make it work with Cloudflare Workers and uses TypeScript.

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/casperiv0/discord-invite-widget)

## Usage

```md
[![Discord Server Invite](https://invite.casperiv.dev?inviteCode=XXXXXXX)](https://discord.gg/XXXXXXX)
```

## Query Parameters

| Name         | Description                                                                         | Required |
| :----------- | :---------------------------------------------------------------------------------- | :------- |
| `inviteCode` | The invite code of the server                                                       | **Yes**  |
| `locale`     | The locale for the widget. Supported locales: `en-US`, `en-GB`, `fr-FR`, `nl`, `dk` | No       |
| `format`     | Supports `svg` and `png`                                                            | No       |

## Examples

[![SnailyCAD](https://invite.casperiv.dev?inviteCode=eGnrPqEH7U)](https://discord.gg/eGnrPqEH7U)
[![luxalgo](https://invite.casperiv.dev?inviteCode=lux)](https://discord.gg/lux)
[![Discord Developers](https://invite.casperiv.dev?inviteCode=discord-developers)](https://discord.gg/discord-developers)
