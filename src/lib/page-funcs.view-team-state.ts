export type ViewControllerStateType = {
  teamIdShowing: null | string;
  viewerDisplayed: null | string;
};

export type ViewerType = "channel_browser" | "messages_browser";

export type ActionType =
  | { type: "changeTeamId"; payload: string | null }
  | { type: "changeDisplayToMatchRoute"; payload: ViewerType };

export const viewControllerInitialState: ViewControllerStateType = {
  teamIdShowing: null,
  viewerDisplayed: null
};

export function viewControllerReducer(
  state: ViewControllerStateType,
  action: ActionType
): ViewControllerStateType {
  switch (action.type) {
    case "changeTeamId":
      return {
        viewerDisplayed: state.viewerDisplayed,
        teamIdShowing: action.payload
      };

    case "changeDisplayToMatchRoute":
      return {
        viewerDisplayed: action.payload,
        teamIdShowing: state.teamIdShowing
      };

    default:
      return {
        viewerDisplayed: state.viewerDisplayed,
        teamIdShowing: state.teamIdShowing
      };
  }
}

export function viewControllerInit(): ViewControllerStateType {
  return {
    viewerDisplayed: null,
    teamIdShowing: null
  };
}
