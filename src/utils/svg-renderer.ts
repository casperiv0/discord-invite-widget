import { fetchDiscordGuildIconBase64, getDiscordInviteViaCode } from "./discord";
import satori from "satori";
import { loadFonts } from "./load-fonts";

interface RenderInviteSVGOptions {
  inviteCode: string;
}

const PADDING = 16;
const ICON_SIZE = 50;

const HEADER_FONT_SIZE = 13;
const HEADER_LINE_HEIGHT = 16;
const HEADER_MARGIN_BOTTOM = 12;

const SERVER_NAME_SIZE = 16;
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
                  children: "You've been invited to join a server",
                  style: {
                    fontSize: HEADER_FONT_SIZE,
                    color: COLORS.header,
                    height: HEADER_LINE_HEIGHT,
                    textTransform: "uppercase",
                    fontWeight: 700,
                    marginBottom: HEADER_MARGIN_BOTTOM,
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
                      type: "img",
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
                              children: invite.guild.name,
                              style: {
                                fontSize: SERVER_NAME_SIZE,
                                color: COLORS.serverName,
                                height: SERVER_NAME_LINE_HEIGHT,
                                fontWeight: 600,
                                marginBottom: SERVER_NAME_MARGIN_BOTTOM,
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
                                          children: `${invite.approximate_presence_count} Online`,
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
                                          children: `${invite.approximate_member_count} Members`,
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
                            children: "Join",
                            style: {
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "center",
                              width: BUTTON_WIDTH,
                              height: BUTTON_HEIGHT,
                              borderRadius: 3,
                              backgroundColor: COLORS.online,
                              color: "#ffffff",
                              fontSize: 16,
                              fontWeight: 600,
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
          fontFamily: "Roboto",
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
