import React, { useEffect } from "react";
import { Header, SideBar } from "../../components/admin";
import { Navigate, Outlet } from "react-router-dom";
import "../../styles/admin/App.scss";
import { useSelector } from "react-redux";
import { ROUTES } from "../../navigation/constants";
import io from "socket.io-client";
function AdPvtLayout() {
  useEffect(() => {
    if ("Notification" in window) {
      // Request permission for notifications
      Notification.requestPermission().then((permission) => {
        // if (permission === "granted") {
        //   new Notification("Hello, World!");
        // }
      });
    }

    const socket = io(`${process.env.REACT_APP_BASE_URL}`);

    socket.on("notification", (userData) => {
      new Notification(userData.msg);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  const { adminAuthtoken } = useSelector((state) => state.adAuth);
  const { adLogin } = ROUTES;
  if (adminAuthtoken) {
    return (
      <div className="main_wrapper">
        <SideBar />
        <div className="right_section">
          <Header />
          <div className="admin-content-section">
            <Outlet />
          </div>
        </div>
      </div>
    );
  } else {
    return <Navigate to={adLogin} />;
  }
}

export default AdPvtLayout;
