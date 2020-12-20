import type { CustomBlockObject } from "draft-js-import-html";
import { CSSProperties } from "react";

export const getTextAlignClassName = (contentBlock: any) => {
  switch (contentBlock.getData().get("textAlign")) {
    case "ALIGN_LEFT":
      return "text-align--left";

    case "ALIGN_CENTER":
      return "text-align--center";

    case "ALIGN_RIGHT":
      return "text-align--right";

    case "ALIGN_JUSTIFY":
      return "text-align--justify";

    default:
      return "";
  }
};

interface BlockStyleFn {
  style: {
    textAlign: CSSProperties["textAlign"];
  };
}

export const getTextAlignStyles = (
  contentBlock: any
): BlockStyleFn | Record<string, unknown> => {
  switch (contentBlock.getData().get("textAlign")) {
    case "ALIGN_LEFT":
      return {
        style: {
          textAlign: "left"
        }
      };

    case "ALIGN_CENTER":
      return {
        style: {
          textAlign: "center"
        }
      };

    case "ALIGN_RIGHT":
      return {
        style: {
          textAlign: "right"
        }
      };

    case "ALIGN_JUSTIFY":
      return {
        style: {
          textAlign: "justify"
        }
      };

    default:
      return {};
  }
};
export type CustomBlockFn = (
  element: HTMLElement
) => undefined | null | CustomBlockObject;

export const getTextAlignBlockMetadata: CustomBlockFn = (element) => {
  switch (element.style.textAlign) {
    case "right":
      return {
        data: {
          textAlign: "ALIGN_RIGHT"
        }
      };

    case "center":
      return {
        data: {
          textAlign: "ALIGN_CENTER"
        }
      };

    case "justify":
      return {
        data: {
          textAlign: "ALIGN_JUSTIFY"
        }
      };

    case "left":
      return {
        data: {
          textAlign: "ALIGN_LEFT"
        }
      };

    default:
      return {};
  }
};
