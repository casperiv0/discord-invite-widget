import { RESTGetAPIInviteResult, Routes } from "discord-api-types/v10";

interface GetDiscordInviteViaCodeOptions {
  inviteCode: string;
}

const API_BASE_URL = "https://discord.com/api/v10";
const CDN_BASE_URL = "https://cdn.discordapp.com";

export async function getDiscordInviteViaCode(options: GetDiscordInviteViaCodeOptions) {
  const route = Routes.invite(options.inviteCode);

  return fetch(`${API_BASE_URL}${route}?with_counts=true`).then((res) =>
    res.json(),
  ) as Promise<RESTGetAPIInviteResult>;
}

export async function fetchDiscordGuildIconBase64(guildId: string, iconId: string) {
  const iconUrl = getDiscordGuildIconUrl(guildId, iconId);

  const buffer = await fetch(iconUrl).then((res) => res.arrayBuffer());
  return buffer;
}

export function getDiscordGuildIconUrl(guildId: string, iconId: string) {
  return `${CDN_BASE_URL}/icons/${guildId}/${iconId}${iconId.startsWith("a_") ? ".gif" : ".jpg"}`;
}
