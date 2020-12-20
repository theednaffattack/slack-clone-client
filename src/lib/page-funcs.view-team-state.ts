import { User } from "../generated/graphql";

export type ViewControllerStateType = {
  teamIdShowing: null | string;
  viewerDisplaying: {
    viewing: null | string;
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
  | "channel_browser"
  | "messages_browser"
  | "team_browser";

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
    };

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
