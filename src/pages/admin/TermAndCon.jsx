import React, { useEffect } from "react";
import { useCmsEditor } from "../../utility/hooks";
import { CmsEditor } from "../../components/common";
import "../../styles/admin/termsAndCond.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  addAdminTermAndConditions,
  getAdminTermAndConditions,
} from "../../redux/thunk/admin/adCms";

const TermAndConditions = () => {
  //Redux state
  const { adminAuthtoken } = useSelector((state) => state.adAuth);
  const {
    termAndConditions: { data },
  } = useSelector((state) => state.adCms);

  //Redux action dispatcher
  const dispatch = useDispatch();

  //Custom hooks
  const { content, handleChange, handleSave, onCancelHandler } = useCmsEditor({
    key:"terms_and_conditions",
    values: {
      value: data?.terms_and_conditions ?? "",
      content_id: data?._id,
    },
    action: addAdminTermAndConditions,
  });

  //Methods

  useEffect(() => {
    const data = {
      adminAuthtoken,
    };
    dispatch(getAdminTermAndConditions(data));
  }, []);

  return (
    <div className="term_condition_section">
      <h3>Term And Conditions</h3>
      <CmsEditor
        content={content}
        handleChange={handleChange}
        handleSave={handleSave}
        onCancelHandler={onCancelHandler}
      />
    </div>
  );
};

export default TermAndConditions;
