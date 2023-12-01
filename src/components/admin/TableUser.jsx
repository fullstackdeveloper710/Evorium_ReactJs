import React from "react";
import { Image, Table } from "react-bootstrap";
import { view, trash } from "../../assets/icons/admin";
import { demopic } from "../../assets/images/admin";
import { Link, useNavigate } from "react-router-dom";
import { dateFormater } from "../../utility/methods";
import { ROUTES } from "../../navigation/constants";
import "../../styles/admin/tableUser.scss";
function TableUser({ data, deleteUserHandler }) {
  const navigate = useNavigate();

  const onViewHandler = (id) => {
    navigate(ROUTES.adUserDetail, { state: { id: id } });
  };

  return (
    <>
      <div className="user_table">
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email Address</th>
              <th>Phone Number</th>
              <th>Created On</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 ? (
              data?.map(
                (
                  {
                    full_name,
                    email,
                    phone,
                    profile_pic,
                    createdAt,
                    country_code,
                    _id,
                  },
                  index
                ) => (
                  <tr key={index}>
                    <td>
                      <div className="user_name">
                        <Image
                          src={profile_pic !== "" ? profile_pic : demopic}
                        />
                        <span className="name">{full_name}</span>
                      </div>
                    </td>
                    <td>
                      <div className="email">
                        <Link to="user-listing" className="email_link">
                          {email}
                        </Link>
                      </div>
                    </td>
                    <td>
                      <div className="date">
                        <span>
                          {country_code && phone ? country_code + phone : ""}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="number">
                        <span>{dateFormater(createdAt)}</span>
                      </div>
                    </td>
                    <td>
                      <div className="location">
                        <span>
                          <Image />
                          London, UK
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="actions_btns">
                        <button
                          className="action_btn"
                          onClick={() => onViewHandler(_id)}
                        >
                          <Image src={view} />
                        </button>
                        <button
                          className="action_btn"
                          onClick={() => {
                            deleteUserHandler(_id);
                          }}
                        >
                          <Image src={trash} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )
            ) : (
              <div>Record Not found</div>
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default TableUser;
