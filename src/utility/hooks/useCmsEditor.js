import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useCmsEditor = ({ action, values,key }) => {
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const { adminAuthtoken } = useSelector((state) => state.adAuth);

  useEffect(() => {
    setContent(values.value);
  }, [values.value]);

  const handleChange = (value) => {
    setContent(value);
  };

  const handleSave = () => {
    if (content.trim() !== "") {
      const data = {
        adminAuthtoken,
        values: {
          [key]:content,
          ...values,
        },
      };
      delete data.values.value
      if (!data.values.content_id) {
        delete data.values.content_id;
      }
      dispatch(action(data));
    } else {
      alert("Content cannot be empty. Please enter some text before saving.");
    }
  };

  const onCancelHandler = () => {
    setContent(values.value);
  };

  return {
    content,
    handleChange,
    handleSave,
    onCancelHandler,
  };
};

export default useCmsEditor;
