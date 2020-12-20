import { ReactEditor } from "slate-react";
import { insertImage } from "./rte.with-images";

export function withUploadedImages(editor: ReactEditor) {
  const { insertData, isVoid } = editor;

  editor.isVoid = (element) => {
    return element.type === "data-image" ? true : isVoid(element);
  };

  editor.insertData = (data) => {
    // const text = data.getData("text/plain");
    const { files } = data;

    if (files && files.length > 0) {
      for (const file of Array.from(files)) {
        const reader = new FileReader();
        const [mime] = file.type.split("/");

        if (mime === "image") {
          reader.addEventListener("load", () => {
            const url = reader.result;

            insertImage({
              editor,
              type: "data-image",
              url: url as string,
              file: file
            });
          });

          reader.readAsDataURL(file);
        }
      }
      // } else if (isImageUrl(text)) {
      //   insertImage({ editor, url: text });
    } else {
      insertData(data);
    }
  };

  return editor;
}
