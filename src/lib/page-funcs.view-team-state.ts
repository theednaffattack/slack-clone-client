import { User } from "../generated/graphql";

export type ViewControllerStateType = {
  teamIdShowing: null | string;
  viewerDisplaying: {
    viewing: ViewerType | null;
    dmThreadId: null | string;
    channelId: null | string;
    header: null | HeaderProps;
  };
};

interface UserType {
  id: User["id"];
  name: User["name"];
  username: User["username"];
}

interface HeaderProps {
  name: string | null;
  invitees: UserType[];
}

export type ViewerType =
  | "channel"
  | "channel_browser"
  | "direct_messages"
  | "messages_browser"
  | "teams_browser"
  | "team_detail"
  | "single_team_browser"
  | "teams_invite_member";

export type ParsedUrlParam = string | null;

export type ActionType =
  | { type: "changeTeamId"; payload: string | null }
  | {
      type: "changeDisplayToMatchRoute";
      payload: {
        action: ParsedUrlParam;
        channelId: ParsedUrlParam;
        threadId: ParsedUrlParam;
        viewing: ViewerType;
        header: HeaderProps;
      };
    }
  | { type: "display_invite_team_member" };

export const viewControllerInitialState: ViewControllerStateType = {
  teamIdShowing: null,
  viewerDisplaying: {
    channelId: null,
    dmThreadId: null,
    header: null,
    viewing: null
  }
};

export function viewControllerReducer(
  state: ViewControllerStateType,
  action: ActionType
): ViewControllerStateType {
  switch (action.type) {
    case "changeTeamId":
      return {
        viewerDisplaying: state.viewerDisplaying,
        teamIdShowing: action.payload
      };

    case "display_invite_team_member":
      return {
        teamIdShowing: state.teamIdShowing,
        viewerDisplaying: {
          channelId: null,
          dmThreadId: null,
          header: null,
          viewing: "teams_invite_member"
        }
      };

    case "changeDisplayToMatchRoute":
      return {
        viewerDisplaying: {
          channelId: action.payload.channelId,
          dmThreadId: action.payload.threadId,
          header: action.payload.header,
          viewing: action.payload.viewing
        },
        teamIdShowing: state.teamIdShowing
      };

    default:
      return {
        viewerDisplaying: state.viewerDisplaying,
        teamIdShowing: state.teamIdShowing
      };
  }
}

export function viewControllerInit(): ViewControllerStateType {
  return {
    viewerDisplaying: {
      channelId: null,
      dmThreadId: null,
      header: null,
      viewing: null
    },
    teamIdShowing: null
  };
}
