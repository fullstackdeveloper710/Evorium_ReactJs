import React from "react";
import { Image } from "react-bootstrap";
import { logo } from "../../assets/images/admin";
import { Link, useLocation } from "react-router-dom";
import { adminSidebarList } from "../../utility/sidebarList";
import { useDispatch } from "react-redux";
import { adminLogout } from "../../redux/reducers/adminSlices/adAuth";
import "../../styles/admin/sidebar.scss";

function SideBar() {
  const location = useLocation();
  const { pathname } = location;

  //Redux action dispatcher
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(adminLogout());
  };
  return (
    <div className="sidebar">
      <div className="brand-log">
        <Link to="#" className="logo_link">
          <Image src={logo} />
        </Link>
      </div>

      <div className="sidebar_links">
        <ul>
          {adminSidebarList.map(
            ({ id, path, title, icon, type, activeFor }, index) => {
              if (type === "link") {
                return (
                  <li
                    key={id}
                    className={activeFor.includes(pathname) && "active"}
                  >
                    <Link to={path}>
                      <Image src={icon} />
                      {title}
                    </Link>
                  </li>
                );
              } else {
                return (
                  <li key={id} onClick={logoutHandler}>
                    <Link to={path}>
                      <Image src={icon} />
                      {title}
                    </Link>
                  </li>
                );
              }
            }
          )}
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
