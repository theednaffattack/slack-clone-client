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

export interface ImageProps {
  type?: "image" | "data-image" | "data-image-list";
  url: string;
  file?: File;
}
interface InsertImageProps extends ImageProps {
  editor: ReactEditor;
}

interface InsertMultipleImagesProps {
  editor: ReactEditor;

  imageNodes: ImageProps[] | null;
}

export function insertImage({
  editor,
  file,
  type,
  url
}: InsertImageProps): void {
  const text = { text: "" };
  const image = [
    {
      type: type ? type : "image",
      file,
      url,
      children: [text]
    },
    {
      type: "paragraph",
      children: [text]
    }
  ];

  Transforms.insertNodes(editor, image);
  Transforms.move(editor);
}

export function insertInlineImage({
  editor,
  file,
  type,
  url
}: InsertImageProps): void {
  const text = { text: "" };
  const image = [
    {
      type: type ? type : "data-image-list",
      file,
      url,
      children: [text]
    },
    {
      type: "paragraph",
      children: [text]
    }
  ];

  Transforms.insertNodes(editor, image);
  Transforms.move(editor);
}

export function insertMultipleImages({
  editor,
  imageNodes
}: InsertMultipleImagesProps): void {
  const text = { text: "" };
  const newLine = {
    type: "paragraph",
    children: [text]
  };

  const listNode = [
    {
      type: "data-image-list",
      images: imageNodes?.map((picture) => {
        return {
          type: "data-image-list-node",
          url: picture.url,
          file: picture.file,
          children: [text]
        };
      }),
      children: [text]
    }
    // newLine
  ];

  Transforms.insertNodes(editor, listNode);
  Transforms.move(editor);
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
          // display="block"
          maxWidth="100%"
          maxHeight="20em"
          boxShadow={selected && focused ? "0 0 0 3px #B4D5FF" : "none"}
        />
      </div>
      {children}
    </div>
  );
}

export function ImageInline({
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
