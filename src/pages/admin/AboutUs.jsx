import React, { useEffect } from "react";
import { CmsEditor } from "../../components/common";
import { useCmsEditor } from "../../utility/hooks";
import { useDispatch, useSelector } from "react-redux";
import {
  addAdminAboutUs,
  getAdminAboutUs,
} from "../../redux/thunk/admin/adCms";
import "../../styles/admin/aboutUs.scss";

const AboutUs = () => {
  //Redux state
  const { adminAuthtoken } = useSelector((state) => state.adAuth);
  const {
    aboutUs: { data },
  } = useSelector((state) => state.adCms);

  //Redux action dispatcher
  const dispatch = useDispatch();

  //Custom hooks
  const { content, handleChange, handleSave, onCancelHandler } = useCmsEditor({
    key:"about_us",
    values: {
      value: data?.about_us ?? "",
      content_id: data?._id,
    },
    action: addAdminAboutUs,
  });

  //Methods
  useEffect(() => {
    const data = {
      adminAuthtoken,
    };
    dispatch(getAdminAboutUs(data));
  }, []);
  return (
    <div className="about_us_section">
      <h3>About Us</h3>
      <CmsEditor
        content={content}
        handleChange={handleChange}
        handleSave={handleSave}
        onCancelHandler={onCancelHandler}
      />
    </div>
  );
};

export default AboutUs;
