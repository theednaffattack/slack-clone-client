export const Leaf = ({ attributes, children, leaf }: any) => {
  if (leaf.bold) {
    children = <strong {...attributes}>{children}</strong>;
  }

  if (leaf.code) {
    children = (
      <pre
        style={{
          backgroundColor: "#eee",
          fontFamily:
            "Consolas, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif",
          maxHeight: "600px",
          overflow: "auto",
          padding: "5px"
          // width: "650px"
        }}
      >
        <code
          {...attributes}
          style={{
            backgroundColor: "#eee",
            fontFamily:
              "Consolas, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif",
            maxHeight: "600px",
            overflow: "auto",
            padding: "5px"
            // width: "650px"
          }}
        >
          {children}
        </code>
      </pre>
    );
  }

  if (leaf.italic) {
    children = <em {...attributes}>{children}</em>;
  }

  if (leaf.underline) {
    children = <u {...attributes}>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};
