import { RESTGetAPIInviteResult, Routes } from "discord-api-types/v10";
export const fiveHoursInSeconds = 60 * 60 * 5;

interface GetDiscordInviteViaCodeOptions {
  inviteCode: string;
}

const API_BASE_URL = "https://discord.com/api/v10" as const;
const CDN_BASE_URL = "https://cdn.discordapp.com" as const;

export async function getDiscordInviteViaCode(options: GetDiscordInviteViaCodeOptions) {
  const route = Routes.invite(options.inviteCode);

  return fetch(`${API_BASE_URL}${route}?with_counts=true`, {
    headers: {
      "Cache-Control": `public, max-age=${fiveHoursInSeconds}`,
    },
  }).then((res) => res.json()) as Promise<RESTGetAPIInviteResult>;
}

export async function fetchDiscordGuildIconBase64(guildId: string, iconId: string) {
  const iconUrl = getDiscordGuildIconUrl(guildId, iconId);

  const buffer = await fetch(iconUrl, {
    headers: { "Cache-Control": `public, max-age=${fiveHoursInSeconds}` },
  }).then((res) => res.arrayBuffer());

  return buffer;
}

export function getDiscordGuildIconUrl(guildId: string, iconId: string) {
  return `${CDN_BASE_URL}/icons/${guildId}/${iconId}${iconId.startsWith("a_") ? ".gif" : ".jpg"}`;
}
