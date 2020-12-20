import { useState } from "react";
import RichTextEditor, { EditorValue } from "react-rte";

import parse from "html-react-parser";

import {
  getTextAlignBlockMetadata,
  getTextAlignClassName,
  getTextAlignStyles
} from "../lib/rte-utilities.blockStyleFunctions";

// Copied from react-rte. These types aren't exported.
type ChangeHandler = (value: EditorValue) => any;

type GroupName =
  | "INLINE_STYLE_BUTTONS"
  | "BLOCK_TYPE_BUTTONS"
  | "LINK_BUTTONS"
  | "BLOCK_TYPE_DROPDOWN"
  | "HISTORY_BUTTONS"
  | "IMAGE_BUTTON";

interface StyleConfig {
  label: string;
  style: string;
  className?: string;
}

type StyleConfigList = StyleConfig[];

interface ToolbarConfigProps {
  display: GroupName[];
  extraProps?: Record<string, unknown>;
  INLINE_STYLE_BUTTONS: StyleConfigList;
  BLOCK_TYPE_DROPDOWN: StyleConfigList;
  BLOCK_TYPE_BUTTONS: StyleConfigList;
}

interface RichTextInputProps {
  id: string;
  name: string;
  onChange: {
    (e: React.ChangeEvent<any>): void;
    <T = string | React.ChangeEvent<any>>(
      field: T
    ): T extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
}

export function RichTextInput({ onChange }: RichTextInputProps) {
  const [editorVal, setEditorVal] = useState<{ value: EditorValue }>({
    value: RichTextEditor.createEmptyValue()
  });
  const handleChange: ChangeHandler = (value) => {
    setEditorVal({ value });
    // this.setState({ value });
    // if (onChange) {
    // Send the changes up to the parent component as an HTML string.
    // This is here to demonstrate using `.toString()` but in a real app it
    // would be better to avoid generating a string on each change.
    // REMOVED: value.toString("html")
    console.log("VALUE", value);
    // onChange(value);
    // }
  };

  function _onChangeSource(event: any) {
    const source = event.target.value;
    const oldValue = editorVal.value;
    setEditorVal({
      value: oldValue.setContentFromString(source, "html", {
        customBlockFn: getTextAlignBlockMetadata
      })
    });
  }

  // The toolbarConfig object allows you to specify custom buttons, reorder buttons and to add custom css classes.
  // Supported inline styles: https://github.com/facebook/draft-js/blob/master/docs/Advanced-Topics-Inline-Styles.md
  // Supported block types: https://github.com/facebook/draft-js/blob/master/docs/Advanced-Topics-Custom-Block-Render.md#draft-default-block-render-map
  const toolbarConfig: ToolbarConfigProps = {
    // Optionally specify the groups to display (displayed in the order listed).
    display: [
      "INLINE_STYLE_BUTTONS",
      "BLOCK_TYPE_BUTTONS",
      "LINK_BUTTONS",
      "BLOCK_TYPE_DROPDOWN",
      "HISTORY_BUTTONS"
    ],
    INLINE_STYLE_BUTTONS: [
      { label: "Bold", style: "BOLD", className: "custom-css-class" },
      { label: "Italic", style: "ITALIC" },
      { label: "Underline", style: "UNDERLINE" }
    ],
    BLOCK_TYPE_DROPDOWN: [
      { label: "Normal", style: "unstyled" },
      { label: "Heading Large", style: "header-one" },
      { label: "Heading Medium", style: "header-two" },
      { label: "Heading Small", style: "header-three" }
    ],
    BLOCK_TYPE_BUTTONS: [
      { label: "UL", style: "unordered-list-item" },
      { label: "OL", style: "ordered-list-item" }
    ]
  };

  if (!editorVal) return <div>CAN'T SENSE EDITOR VALUES!</div>;

  return (
    <>
      {parse(
        editorVal.value.toString("html", {
          blockStyleFn: getTextAlignStyles
        })
      )}

      <RichTextEditor
        value={editorVal.value}
        blockStyleFn={getTextAlignClassName}
        onChange={handleChange}
        toolbarConfig={toolbarConfig}
        toolbarOnBottom={true}
      />
    </>
  );
}
