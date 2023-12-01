import React from "react";
import { Row, DropdownButton, Dropdown } from "react-bootstrap";
import { Pagination } from "../../components/admin";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteAdminProgram,
  getAdminProgramById,
  getAdminProgramList,
  searchAdminProgram,
} from "../../redux/thunk/admin/adPrograms";
import { getMinutes } from "../../utility/methods";
import { ROUTES } from "../../navigation/constants";
import "../../styles/admin/programListing.scss";
import { Button, ConfirmPopUp } from "../../components/common";
import {
  useConfirmation,
  useFetch,
  usePagination,
  useSearch,
} from "../../utility/hooks";
import { totalItems, itemsPerPage } from "../../utility/methods";
import { useSelector } from "react-redux";
function ProgramListing() {
  //Redux state
  const { adminAuthtoken } = useSelector((state) => state.adAuth);
  const { adminPrograms } = useSelector((state) => state.adPrograms);
  const { data, count } = adminPrograms;

  //Custom hooks
  const {
    setId,
    showConfirm,
    handleConfirmShow,
    handleConfirmClose,
    onConfirmHandler,
  } = useConfirmation({
    action: deleteAdminProgram,
  });

  const {
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
    setItemsPerPage,
    onSelectPage,
  } = usePagination({
    totalItems: count,
    itemsPerPage,
  });

  const { search, onSearchChange, onSearchHandler } = useSearch({
    action: searchAdminProgram,
  });

  useFetch({ search, action: getAdminProgramList, currentPage, itemsPerPage });

  //Router functions
  const navigate = useNavigate();

  //Constant routes
  const { adAddprogram, adUpdateProgram } = ROUTES;

  //Methods

  const onEditProgram = (id) => {
    const data = {
      adminAuthtoken,
      query: {
        id,
      },
    };
    navigate(adUpdateProgram, {
      state: {
        id: id,
      },
    });
  };

  return (
    <div className="program_listing_section">
      <div className="top_bar">
        <h3 className="title">Videos</h3>
        <div className="search_block">
          <div className="search_input">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={onSearchChange}
            />
            <button
              type="button"
              className="search_btn"
              onClick={onSearchHandler}
            >
              Search
            </button>
          </div>
          <Button
            type="button"
            className="add_btn"
            title="Add New"
            onClick={() => navigate(adAddprogram)}
          />
        </div>
      </div>

      <div className="program_cards_section">
        <Row>
          {data?.length > 0 ? (
            data?.map(
              (
                {
                  _id,
                  speaker,
                  course_type,
                  description,
                  thumbnail_url,
                  video_duration,
                  view_count,
                },
                index
              ) => {
                return (
                  <div className="col5" key={index}>
                    <div className="subs-card free-card">
                      <div className="card-wrapper">
                        <div className="img-wrap">
                          <div className="bg-img">
                            <img src={thumbnail_url} alt="programer" />
                          </div>
                          <span className="free-btn">{course_type}</span>
                          {/* <img src="" className="label-watch"/> */}
                        </div>
                        <div className="bottom-details">
                          {/* btn drop_dow */}
                          <DropdownButton
                            className="btn_programs"
                            id="dropdown-basic-button"
                            title="..."
                          >
                            <Dropdown.Item
                              onClick={() => {
                                handleConfirmShow();
                                setId(_id);
                              }}
                            >
                              Delete
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => onEditProgram(_id)}>
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-2">
                              Cancel
                            </Dropdown.Item>
                          </DropdownButton>
                          {/* btn drop_dow */}
                          <p className="name">{speaker}</p>
                          <Link to="#" className="link-card">
                            {description}
                          </Link>
                          <div className="time-view">
                            <span className="mins">
                              {getMinutes(video_duration)}
                            </span>
                            <span className="views">{view_count}k</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )
          ) : (
            <div>There are no records to display</div>
          )}
        </Row>
        <ConfirmPopUp
          showConfirm={showConfirm}
          handleConfirmClose={handleConfirmClose}
          onConfirmHandler={onConfirmHandler}
        />
      </div>

      {count > 0 && (
        <Pagination
          paginationComponentOptions={{
            currentPage,
            totalPages,
            nextPage,
            prevPage,
            goToPage,
            setItemsPerPage,
            onSelectPage,
          }}
        />
      )}
    </div>
  );
}

export default ProgramListing;
