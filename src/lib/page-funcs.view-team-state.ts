export type ViewControllerStateType = {
  teamIdShowing: null | string;
  viewerDisplaying: {
    viewing: null | string;
    dmThreadId: null | string;
    channelId: null | string;
    header: null | any[];
  };
};

export type ViewerType = "channel_browser" | "messages_browser";

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
        header: any | null;
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
