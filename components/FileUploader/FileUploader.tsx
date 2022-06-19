import React, { ChangeEvent } from "react";
import styles from "./FileUploader.module.scss";

interface IFileUploaderProps {
  // TODO: Add props here
}
interface FileUploadOptions {
  private: boolean;
}
function uploadFile(f: File, fileUploadOptions: FileUploadOptions) {
  const fd = new FormData();
  fd.append("file", f);
  Object.entries(fileUploadOptions).forEach(([key, value]) => {
    fd.append(key, value);
  });
  fetch("/api/upload", {
    method: "POST",
    body: fd,
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res);
    });
}
export const FileUploader: React.FC<IFileUploaderProps> = (
  props: IFileUploaderProps
) => {
  function openFileUploadDialog() {
    const input = document.createElement("input");
    input.type = "file";
    input.onchange = (e: Event) => {
      const file = (e as unknown as ChangeEvent<HTMLInputElement>)?.target
        ?.files?.[0];
      if (file) {
        uploadFile(file, { private: Math.random() > 0.5 });
      }
      input.remove();
    };
    document.body.appendChild(input);
    input.click();
    input.remove();
  }
  return (
    <button
      className=" w-16 h-16 rounded-full bg-green-400 hover:bg-green-200 border-lime-600 z-0 fixed"
      style={{
        bottom: `0px`,
        left: `calc(50% - 16px)`,
      }}
      onClick={() => openFileUploadDialog()}
    >
      +
    </button>
  );
};
