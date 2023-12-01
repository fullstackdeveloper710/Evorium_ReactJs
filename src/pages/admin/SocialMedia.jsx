import React, { useEffect } from "react";
import "../../styles/admin/socialMedia.scss";
import { CmsEditor } from "../../components/common";
import { useCmsEditor } from "../../utility/hooks";
import { useDispatch, useSelector } from "react-redux";
import {
  addAdminSocialLinks,
  getAdminSocialLinks,
} from "../../redux/thunk/admin/adCms";

const SocialMedia = () => {
  //Redux state
  const { adminAuthtoken } = useSelector((state) => state.adAuth);
  const {
    socialLinks: { data },
  } = useSelector((state) => state.adCms);

  //Redux action dispatcher
  const dispatch = useDispatch();

  //Custom hooks
  const { content, handleChange, handleSave, onCancelHandler } = useCmsEditor({
    key:"social_media_link",
    values: {
      value: data?.social_media_link ?? "",
      content_id: data?._id,
    },
    action: addAdminSocialLinks,
  });

  //Methods

  useEffect(() => {
    const data = {
      adminAuthtoken,
    };
    dispatch(getAdminSocialLinks(data));
  }, []);

  return (
    <div className="social_media_section">
      <h3>Social Media</h3>
      <CmsEditor
        content={content}
        handleChange={handleChange}
        handleSave={handleSave}
        onCancelHandler={onCancelHandler}
      />
    </div>
  );
};

export default SocialMedia;
