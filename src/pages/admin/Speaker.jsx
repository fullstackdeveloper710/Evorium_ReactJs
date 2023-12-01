import React, { useEffect } from "react";
import { Col, Row, Image } from "react-bootstrap";
import { trash } from "../../assets/icons/admin";
import { useDispatch, useSelector } from "react-redux";
import {
  addAdminSpeaker,
  deleteAdminSpeaker,
  getAdminSpeakers,
} from "../../redux/thunk/admin/adSpeakers";
import { dateFormater } from "../../utility/methods";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import {
  Input,
  Button,
  BtnGroup,
  SelectBox,
  ReactDataTable,
  ConfirmPopUp,
} from "../../components/common";
import "../../styles/admin/categories.scss";
import { useConfirmation, useFetch, usePagination } from "../../utility/hooks";
import { totalItems, itemsPerPage } from "../../utility/methods";
function Speaker() {
  //Redux state
  const { adminAuthtoken } = useSelector((state) => state.adAuth);
  const { adminSpeakers } = useSelector((state) => state.adSpeaker);
  const { data, count } = adminSpeakers;

  //Redux action dispatcher
  const dispatch = useDispatch();

  //Custom hooks
  const {
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
    setItemsPerPage,
    onSelectPage,
  } = usePagination({ totalItems: count, itemsPerPage });

  const {
    setId,
    showConfirm,
    handleConfirmShow,
    handleConfirmClose,
    onConfirmHandler,
  } = useConfirmation({
    action: deleteAdminSpeaker,
  });

  useFetch({ action: getAdminSpeakers, currentPage, itemsPerPage });

  //Formik initial state
  const initValues = {
    name: "",
    category: "",
  };

  //Yup validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name field is required"),
    category: Yup.string().required("Category field is required"),
  });

  //Methods
  const onSubmitHandler = (values) => {
    const data = {
      adminAuthtoken,
      values: {
        ...values,
      },
      pagination: {
        pageNo: 1,
        pageSize: 4,
      },
    };
    dispatch(addAdminSpeaker(data));
  };

  const onCancelHandler = (resetForm) => {
    resetForm();
  };

  const options = [
    {
      value: "",
      label: "Select option",
    },
    {
      value: "pro",
      label: "pro",
    },
    {
      value: "free",
      label: "free",
    },
  ];

  const columns = [
    {
      name: "S.No.",
      selector: (row, index) => <div>{index + 1}</div>,
    },
    {
      name: "Speaker Name",
      selector: (row) => <div>{row.name}</div>,
    },
    {
      name: "Categories",
      selector: (row) => <div>{row.category}</div>,
    },
    {
      name: "Created On",
      selector: (row) => (
        <div className="date">
          <span>{dateFormater(row.createdAt)}</span>
        </div>
      ),
    },
    {
      name: "Action",
      selector: (row) => (
        <BtnGroup className="delete_action">
          <Button
            title={<Image src={trash} />}
            type="button"
            className="action_btn delete_btn "
            onClick={() => {
              handleConfirmShow();
              setId(row._id);
            }}
          />
          <ConfirmPopUp
            showConfirm={showConfirm}
            handleConfirmClose={handleConfirmClose}
            onConfirmHandler={onConfirmHandler}
          />
        </BtnGroup>
      ),
    },
  ];

  return (
    <div className="categories_section">
      <h3 className="title">Speakers</h3>
      <Formik
        initialValues={initValues}
        validationSchema={validationSchema}
        onSubmit={onSubmitHandler}
      >
        {({
          values,
          isSubmitting,
          errors,
          touched,
          handleChange,
          handleSubmit,
          handleBlur,
          resetForm,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Input
                  className="input_label_wrap"
                  label="Speaker Name"
                  type="text"
                  placeholder="Enter text..."
                  name="name"
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={errors.name && touched.name && errors.name}
                />
                <SelectBox
                  className="input_label_wrap"
                  name="category"
                  label="Select Categories"
                  value={values.category}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  options={options}
                  error={errors.category && touched.category && errors.category}
                />
                <BtnGroup className="common_btns">
                  <Button
                    title="add"
                    type="submit"
                    className="primary_btn"
                    onClick={onSubmitHandler}
                  />
                  <Button
                    title="cancel"
                    type="button"
                    className="secondry_btn"
                    onClick={() => onCancelHandler(resetForm)}
                  />
                </BtnGroup>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>

      <ReactDataTable
        data={data}
        columns={columns}
        pagination={true}
        header="Speakers Logs"
        subHeader={true}
        paginationFields={{
          currentPage,
          totalPages,
          nextPage,
          prevPage,
          goToPage,
          setItemsPerPage,
          onSelectPage,
        }}
      />
    </div>
  );
}

export default Speaker;
