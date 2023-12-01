import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Button from "./Button";
import BtnGroup from "./BtnGroup";

const CmsEditor = ({ content, handleChange, handleSave, onCancelHandler }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  return (
    <div className="cms_container">
      <ReactQuill
        value={content}
        onChange={handleChange}
        modules={modules}
        formats={formats}
      />
      <div className="mt-4 d-flex justify-content-end">
        <BtnGroup className="common_btns">
          <Button
            title={content !== "" ? "Update" : "Add"}
            type="submit"
            className="primary_btn"
            onClick={handleSave}
          />
          <Button
            title="cancel"
            type="button"
            className="secondry_btn"
            onClick={onCancelHandler}
          />
        </BtnGroup>
      </div>
    </div>
  );
};

export default CmsEditor;
