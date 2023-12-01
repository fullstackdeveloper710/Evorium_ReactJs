import React from "react";
import { Outlet } from "react-router";
import { FooterEvorium, Header } from "../../components/user";

const UserPubLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <FooterEvorium />
    </div>
  );
};

export default UserPubLayout;
