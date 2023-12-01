import React, { useEffect } from "react";
import { CmsEditor } from "../../components/common";
import "../../styles/admin/support.scss";
import { useCmsEditor } from "../../utility/hooks";
import { useDispatch, useSelector } from "react-redux";
import {
  addAdminSupport,
  getAdminSupport,
} from "../../redux/thunk/admin/adCms";

const Support = () => {
  //Redux state
  const { adminAuthtoken } = useSelector((state) => state.adAuth);
  const {
    support: { data },
  } = useSelector((state) => state.adCms);

  //Redux action dispatcher
  const dispatch = useDispatch();

  //Custom hooks
  const { content, handleChange, handleSave, onCancelHandler } = useCmsEditor({
    key: "support",
    values: {
      value: data?.support ?? "",
      content_id: data?._id,
    },
    action: addAdminSupport,
  });

  //Methods

  useEffect(() => {
    const data = {
      adminAuthtoken,
    };
    dispatch(getAdminSupport(data));
  }, []);

  return (
    <div className="support_section">
      <h3>Support</h3>
      <CmsEditor
        content={content}
        handleChange={handleChange}
        handleSave={handleSave}
        onCancelHandler={onCancelHandler}
      />
    </div>
  );
};

export default Support;
