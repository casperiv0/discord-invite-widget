import { BADGES, fetchDiscordGuildIconBase64, flowStar, getDiscordInviteViaCode } from "./discord";
import satori from "satori";
import { loadFonts } from "./load-fonts";
import { Locale, t } from "./translate";
import { GuildFeature } from "discord-api-types/v10";

interface RenderInviteSVGOptions {
  inviteCode: string;
  locale: Locale;
}

const PADDING = 16;
const ICON_SIZE = 50;

const HEADER_FONT_SIZE = 13;
const HEADER_LINE_HEIGHT = 16;
const HEADER_MARGIN_BOTTOM = 12;

const SERVER_NAME_SIZE = 17;
const SERVER_NAME_LINE_HEIGHT = 20;
const SERVER_NAME_MARGIN_BOTTOM = 2;

const PRESENCE_FONT_SIZE = 14;
const PRESENCE_LINE_HEIGHT = 16;
const PRESENCE_TEXT_MARGIN_RIGHT = 8;

const PRESENCE_DOT_SIZE = 8;
const PRESENCE_DOT_MARGIN_RIGHT = 4;

const INVITE_WIDTH = 430;
const INVITE_HEIGHT = 110;

const BUTTON_WIDTH = 80;
const BUTTON_HEIGHT = 40;

const COLORS = {
  background: "#2f3136",
  serverName: "#ffffff",
  header: "#b9bbbe",
  serverIcon: "#36393f",
  acronymText: "#dcddde",
  presenceText: "#b9bbbe",
  online: "#3ba55c",
  members: "#747f8d",
  joinBtnBackgroundColor: "#2d7d46",
  verifiedBackgroundColor: "#23a559",
  partnerBackgroundColor: "#5865f2",
};

export async function renderInviteSVG(options: RenderInviteSVGOptions) {
  const invite = await getDiscordInviteViaCode({ inviteCode: options.inviteCode });
  const fonts = await loadFonts();

  if (!invite.guild) {
    return null;
  }

  const guildIconBase64 = invite.guild.icon
    ? await fetchDiscordGuildIconBase64(invite.guild.id, invite.guild.icon)
    : undefined;

  const JOIN_SERVER_HEADER_TEXT = t("youHaveBeenInvitedToJoinAServer", options.locale);
  const ONLINE_TEXT = t("online", options.locale);
  const MEMBERS_TEXT = t("members", options.locale);
  const JOIN_BTN_TEXT = t("join", options.locale);
  const NUMBER_FORMATTER = new Intl.NumberFormat(options.locale);

  const formattedOnlineCount = NUMBER_FORMATTER.format(invite.approximate_presence_count || 0);
  const formattedMemberCount = NUMBER_FORMATTER.format(invite.approximate_member_count || 0);

  const isVerified = invite.guild.features.includes(GuildFeature.Verified);
  const isPartnered = invite.guild.features.includes(GuildFeature.Partnered);
  const isCommunity = invite.guild.features.includes(GuildFeature.Community);

  const badge = isVerified
    ? BADGES.VERIFIED_ICON
    : isPartnered
    ? BADGES.PARTNER_ICON
    : isCommunity
    ? BADGES.COMMUNITY
    : null;

  const serverNameChildren = [invite.guild.name] as any[];

  if (badge) {
    const badgeBackgroundColor = isVerified
      ? COLORS.verifiedBackgroundColor
      : isPartnered
      ? COLORS.partnerBackgroundColor
      : "white";

    const fill = isVerified || isPartnered ? "white" : "black";

    serverNameChildren.push({
      type: "svg",
      props: {
        width: 16,
        height: 16,
        style: { marginTop: 2 },
        children: [
          {
            type: "path",
            props: {
              fill: badgeBackgroundColor,
              d: flowStar,
            },
          },
          {
            type: "path",
            props: {
              fill,
              transform: isVerified || isPartnered ? undefined : "translate(3, 3)",
              d: badge,
            },
          },
        ],
      },
    });
  }

  const svg = await satori(
    {
      type: "div",
      props: {
        children: {
          type: "div",
          props: {
            id: "main-container",
            style: {
              display: "flex",
              flexDirection: "column",
              width: INVITE_WIDTH - 2 * PADDING,
              height: INVITE_HEIGHT - 2 * PADDING,
              margin: PADDING,
            },
            children: [
              {
                type: "header",
                props: {
                  children: JOIN_SERVER_HEADER_TEXT,
                  style: {
                    fontSize: HEADER_FONT_SIZE,
                    color: COLORS.header,
                    height: HEADER_LINE_HEIGHT,
                    textTransform: "uppercase",
                    fontWeight: 700,
                    marginBottom: HEADER_MARGIN_BOTTOM,
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  },
                },
              },
              {
                type: "div",
                props: {
                  id: "server-info",
                  style: {
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  },
                  children: [
                    // server icon
                    {
                      type: guildIconBase64 ? "img" : "div",
                      props: {
                        id: "server-icon",
                        src: guildIconBase64,
                        style: {
                          width: ICON_SIZE,
                          height: ICON_SIZE,
                          borderRadius: 16,
                          backgroundColor: COLORS.serverIcon,
                        },
                      },
                    },
                    // server name & co container
                    {
                      type: "div",
                      props: {
                        id: "server-name-container",
                        style: {
                          marginLeft: 14,
                          display: "flex",
                          flexDirection: "column",
                        },
                        children: [
                          // server name title
                          {
                            type: "div",
                            props: {
                              id: "server-name",
                              children: serverNameChildren,
                              style: {
                                fontSize: SERVER_NAME_SIZE,
                                color: COLORS.serverName,
                                height: SERVER_NAME_LINE_HEIGHT,
                                fontWeight: 600,
                                marginBottom: SERVER_NAME_MARGIN_BOTTOM,
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                gap: "2px",
                              },
                            },
                          },
                          {
                            // server members container
                            type: "div",
                            props: {
                              id: "server-members-container",
                              style: {
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                fontWeight: 500,
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                paddingRight: 14,
                              },
                              children: [
                                {
                                  // online members count
                                  type: "flex",
                                  props: {
                                    id: "server-presence-container",
                                    style: {
                                      display: "flex",
                                      flexDirection: "row",
                                      alignItems: "center",
                                    },
                                    children: [
                                      {
                                        type: "div",
                                        props: {
                                          id: "server-presence-dot",
                                          style: {
                                            marginTop: 2,
                                            width: PRESENCE_DOT_SIZE,
                                            height: PRESENCE_DOT_SIZE,
                                            borderRadius: PRESENCE_DOT_SIZE / 2,
                                            backgroundColor: COLORS.online,
                                            marginRight: PRESENCE_DOT_MARGIN_RIGHT,
                                          },
                                        },
                                      },
                                      {
                                        type: "div",
                                        props: {
                                          id: "server-presence-text",
                                          children: `${formattedOnlineCount} ${ONLINE_TEXT}`,
                                          style: {
                                            fontSize: PRESENCE_FONT_SIZE,
                                            color: COLORS.presenceText,
                                            height: PRESENCE_LINE_HEIGHT,
                                            marginRight: PRESENCE_TEXT_MARGIN_RIGHT,
                                            fontWeight: 500,
                                          },
                                        },
                                      },
                                    ],
                                  },
                                },
                                {
                                  // total members count
                                  type: "flex",
                                  props: {
                                    id: "server-members-container",
                                    style: {
                                      display: "flex",
                                      flexDirection: "row",
                                      alignItems: "center",
                                    },
                                    children: [
                                      {
                                        type: "div",
                                        props: {
                                          id: "server-members-dot",
                                          style: {
                                            marginTop: 2,
                                            width: PRESENCE_DOT_SIZE,
                                            height: PRESENCE_DOT_SIZE,
                                            borderRadius: PRESENCE_DOT_SIZE / 2,
                                            backgroundColor: COLORS.presenceText,
                                            marginRight: PRESENCE_DOT_MARGIN_RIGHT,
                                          },
                                        },
                                      },
                                      {
                                        type: "div",
                                        props: {
                                          id: "server-presence-text",
                                          children: `${formattedMemberCount} ${MEMBERS_TEXT}`,
                                          style: {
                                            fontSize: PRESENCE_FONT_SIZE,
                                            color: COLORS.presenceText,
                                            height: PRESENCE_LINE_HEIGHT,
                                            marginRight: PRESENCE_TEXT_MARGIN_RIGHT,
                                            fontWeight: 500,
                                          },
                                        },
                                      },
                                    ],
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                    // join button
                    {
                      type: "div",
                      props: {
                        id: "join-button-container",
                        style: {
                          marginLeft: "auto",
                          display: "flex",
                          flexDirection: "column",
                        },
                        children: {
                          type: "div",
                          props: {
                            id: "join-button",
                            children: JOIN_BTN_TEXT,
                            style: {
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "center",
                              minWidth: BUTTON_WIDTH,
                              height: BUTTON_HEIGHT,
                              borderRadius: 3,
                              backgroundColor: COLORS.joinBtnBackgroundColor,
                              color: "#ffffff",
                              fontSize: 16,
                              fontWeight: 600,
                              padding: "0 16px",
                            },
                          },
                        },
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
        style: {
          display: "flex",
          flexDirection: "column",
          backgroundColor: COLORS.background,
          width: "100%",
          height: "100%",
          borderRadius: 3,
          fontFamily: "Whitney",
        },
      },
    },
    {
      width: INVITE_WIDTH,
      height: INVITE_HEIGHT,
      fonts,
    },
  );

  return svg;
}
