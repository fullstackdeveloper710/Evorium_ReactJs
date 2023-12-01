import React from "react";
import { Button } from "../../components/common";
import { useNavigate } from "react-router";
import "../../styles/common/notFound.scss";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="not_found_section">
      <div className="not_found_container">
        <h1>Not Found</h1>
        <Button
          className="not_found_btn"
          title="Go Back"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        />
      </div>
    </div>
  );
};

export default NotFound;
