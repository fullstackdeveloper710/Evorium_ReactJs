import React, { useEffect } from "react";
import { demopic2, video_card } from "../../assets/images/admin";
import { view } from "../../assets/icons/admin";
import { Col, Image, Row, Table } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAdminUserDetail } from "../../redux/thunk/admin/adUser";
import "../../styles/admin/userListing.scss";
import { ROUTES } from "../../navigation/constants";
function UserDetails() {
  const location = useLocation();
  const { state } = location;
  const dispatch = useDispatch();

  const { adUserList } = ROUTES;

  useEffect(() => {
    console.log(state.id);
    // dispatch(getAdminUserDetail());
  }, []);

  return (
    <div className="user_listing_section">
      <h3 className="title">
        <Link to={adUserList} className="me-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="25"
            viewBox="0 0 35 25"
            fill="none"
          >
            <path
              d="M34.2508 24.9999C33.9504 24.9999 33.6748 24.8084 33.5568 24.4942C33.4702 24.2662 31.3053 18.8573 23.2113 17.786C21.5253 17.5581 19.5061 17.4411 17.0539 17.4207V24.1625C17.0539 24.4737 16.903 24.7558 16.655 24.9049C16.4084 25.0481 16.1132 25.0276 15.8836 24.8566L0.333258 13.197C0.123332 13.0406 0 12.7776 0 12.5014C0 12.2222 0.123332 11.9679 0.333258 11.8042L15.8901 0.14316C16.1197 -0.0336782 16.4123 -0.0453696 16.6616 0.100778C16.9109 0.249848 17.0592 0.531911 17.0592 0.834436V7.10854C20.4416 7.59959 35 10.5138 35 24.1698C35 24.5658 34.7494 24.9122 34.3978 24.9911C34.3492 24.9999 34.2981 24.9999 34.2508 24.9999Z"
              fill="black"
            />
          </svg>
        </Link>
        John Maria
      </h3>

      <div className="user_details">
        <div className="user_address">
          <span>John Maria</span>
          <span>John@gmail.com</span>
          <span>+1234567890</span>
        </div>
        <div className="user_img">
          <Image src={demopic2} />
        </div>
      </div>

      <div className="user_field_block">
        <Row>
          <Col md={6}>
            <div className="user_listing_inputs">
              <div className="input_label_wrap">
                <label>Phone</label>
                <input type="tel" placeholder="0 123 456 7890" />
              </div>
              <div className="input_label_wrap">
                <label>Email</label>
                <input type="email" placeholder="john@gmail.com" />
              </div>
              <div className="input_label_wrap">
                <label>Address</label>
                <input type="text" placeholder="Address" />
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="latest_uploads_block_2">
              <h4>Programs</h4>
              <div className="card_uploads">
                <div className="left_video_block">
                  <div className="img_block">
                    <Image src={video_card} />
                    <span className="available">Available</span>
                  </div>
                  <div className="text_block">
                    <h3>Basic: how to ride your skateboard comfortly</h3>
                    <p>Andy William </p>
                  </div>
                </div>
                <div className="right_action_icons_block">
                  <span>Completed</span>
                </div>
              </div>
              <div className="card_uploads">
                <div className="left_video_block">
                  <div className="img_block">
                    <Image src={video_card} />
                    <span className="available">Available</span>
                  </div>
                  <div className="text_block">
                    <h3>Basic: how to ride your skateboard comfortly</h3>
                    <p>Andy William </p>
                  </div>
                </div>
                <div className="right_action_icons_block">
                  <span>Completed</span>
                </div>
              </div>
              <div className="card_uploads">
                <div className="left_video_block">
                  <div className="img_block">
                    <Image src={video_card} />
                    <span className="available">Available</span>
                  </div>
                  <div className="text_block">
                    <h3>Basic: how to ride your skateboard comfortly</h3>
                    <p>Andy William </p>
                  </div>
                </div>
                <div className="right_action_icons_block">
                  <span>Completed</span>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <div className="comn_table user_listing_table pt-5">
          <Table striped>
            <thead>
              <tr>
                <th>Payment Id</th>
                <th>Payment Mode</th>
                <th>Date</th>
                <th className="text-center">Price</th>
                <th>Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Id:123456</td>
                <td>Credit Crad</td>
                <td>14 Nov,22</td>
                <td className="text-center">$1</td>
                <td>Completed</td>
                <td className="text-center">
                  <div className="view_action">
                    <Link to="#" className="view_btn">
                      <Image src={view} />
                    </Link>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Id:123456</td>
                <td>Credit Crad</td>
                <td>14 Nov,22</td>
                <td className="text-center">$1</td>
                <td>Completed</td>
                <td className="text-center">
                  <div className="view_action">
                    <Link to="#" className="view_btn">
                      <Image src={view} />
                    </Link>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Id:123456</td>
                <td>Credit Crad</td>
                <td>14 Nov,22</td>
                <td className="text-center">$1</td>
                <td>Completed</td>
                <td className="text-center">
                  <div className="view_action">
                    <Link to="#" className="view_btn">
                      <Image src={view} />
                    </Link>
                  </div>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
