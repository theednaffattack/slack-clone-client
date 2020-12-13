import { Image } from "@chakra-ui/react";
import imageExtensions from "image-extensions";
import isUrl from "is-url";
import { Transforms } from "slate";
import {
  ReactEditor,
  RenderElementProps,
  useFocused,
  useSelected
} from "slate-react";

export function withImages(editor: ReactEditor) {
  const { insertData, isVoid } = editor;

  editor.isVoid = (element) => {
    return element.type === "image" ? true : isVoid(element);
  };

  editor.insertData = (data) => {
    const text = data.getData("text/plain");
    const { files } = data;

    if (files && files.length > 0) {
      for (const file of Array.from(files)) {
        const reader = new FileReader();
        const [mime] = file.type.split("/");

        if (mime === "image") {
          reader.addEventListener("load", () => {
            const url = reader.result;
            console.log("VIEW URL INFO", { url, type: typeof url });

            insertImage({ editor, url: url as string });
          });

          reader.readAsDataURL(file);
        }
      }
    } else if (isImageUrl(text)) {
      insertImage({ editor, url: text });
    } else {
      insertData(data);
    }
  };

  return editor;
}

interface InsertImageProps {
  editor: ReactEditor;
  type?: "image" | "data-image";
  url: string;
}

export function insertImage({ editor, type, url }: InsertImageProps): void {
  const text = { text: "" };
  const image = { type: type ? type : "image", url, children: [text] };
  Transforms.insertNodes(editor, image);
}

export function ImageElement({
  attributes,
  children,
  element
}: RenderElementProps) {
  const selected = useSelected();
  const focused = useFocused();
  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <Image
          src={element.url as string}
          display="block"
          maxWidth="100%"
          maxHeight="20em"
          boxShadow={selected && focused ? "0 0 0 3px #B4D5FF" : "none"}
        />
      </div>
      {children}
    </div>
  );
}

function isImageUrl(url: string): boolean {
  if (!url) return false;
  if (!isUrl(url)) return false;
  const ext = new URL(url).pathname.split(".").pop();
  return ext ? imageExtensions.includes(ext) : false;
}
