import { useCallback, useMemo } from "react";
import { createEditor, Node } from "slate";
import { Editable, Slate, withReact } from "slate-react";

import { Element } from "./rte.element";
import { Leaf } from "./rte.leaf";

interface PreviewProps {
  formValue: Node[];
}

export function Preview({ formValue }: PreviewProps) {
  const editor = useMemo(() => withReact(createEditor()), []);
  const renderElement = useCallback((props: any) => <Element {...props} />, []);

  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  return (
    <Slate
      editor={editor}
      value={formValue}
      onChange={(value) => console.log("VIEWER CHANGE", value)}
    >
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        readOnly
        placeholder="Enter some plain text..."
      />
    </Slate>
  );
}
