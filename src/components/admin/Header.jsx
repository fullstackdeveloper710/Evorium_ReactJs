import React, { useState } from "react";
import { Image, Dropdown, DropdownButton } from "react-bootstrap";
import { notification } from "../../assets/icons/admin";
import { burger } from "../../assets/images/admin";
import "../../styles/admin/header.scss";

function Header() {
  const [show, setShow] = useState(false);
  return (
    <div className="header_admin">
      <div className="title_block">
        <h3>Welcome,, Maria!</h3>
        <p>Ready to jump back in?</p>
      </div>
      <div className="right_notifications">
        <div className="notification_message">
          <Image src={notification} />
          <span className="messages">8</span>
        </div>
        <div className="my_account_drop_down">
          <DropdownButton id="dropdown-basic-button" title="My Account">
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </DropdownButton>
        </div>

        <div
          className="mobile_burger d-block d-md-none"
          onClick={() => setShow(!show)}
        >
          <Image src={burger} className="toggle_burger" />
        </div>
      </div>
    </div>
  );
}

export default Header;
