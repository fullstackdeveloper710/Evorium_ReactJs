import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { ROUTES } from "../../navigation/constants";
import { useSelector } from "react-redux";

const AdPubLayout = () => {
  const { adminAuthtoken } = useSelector((state) => state.adAuth);
  const navigate = useNavigate();
  const { adDashboard } = ROUTES;
  useEffect(() => {
    if (adminAuthtoken) {
      navigate(adDashboard);
    }
  }, [adminAuthtoken]);
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AdPubLayout;
