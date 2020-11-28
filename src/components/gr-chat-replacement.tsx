import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { GrChat } from "react-icons/gr";

/**
 *
 * This addresses a known Grommet bug.
 * https://github.com/grommet/grommet-icons/issues/208
 */

function getFill(fill: string) {
  return css`
    path[fill="none"] {
      stroke: ${fill} !important;
    }
    /* polygon[fill="none"] {
      fill: ${fill} !important;
    } */
  `;
}

export const GrChatReplacement = styled(GrChat)`
  ${(props) => (props.color ? getFill(props.color) : "")}
  height: ${({ size }) => size};
  width: ${({ size }) => size};
`;
