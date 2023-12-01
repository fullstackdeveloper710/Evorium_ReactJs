import React from "react";
import { Col, Row, Image } from "react-bootstrap";
import { trash } from "../../assets/icons/admin";
import { useDispatch, useSelector } from "react-redux";
import {
  addAdminTags,
  deleteAdminTag,
  getAdminTags,
} from "../../redux/thunk/admin/adTags";
import { dateFormater } from "../../utility/methods";
import * as Yup from "yup";
import "../../styles/admin/categories.scss";
import { Form, Formik } from "formik";
import {
  BtnGroup,
  Button,
  ConfirmPopUp,
  Input,
  ReactDataTable,
} from "../../components/common";
import { useConfirmation, useFetch, usePagination } from "../../utility/hooks";
import { itemsPerPage } from "../../utility/methods";
function Tags() {
  //Redux state
  const { adminAuthtoken } = useSelector((state) => state.adAuth);
  const { adminTags } = useSelector((state) => state.adTags);
  const { data, count } = adminTags;

  //Redux action dispatcher
  const dispatch = useDispatch();

  //Custom hooks
  const {
    setId,
    showConfirm,
    handleConfirmShow,
    handleConfirmClose,
    onConfirmHandler,
  } = useConfirmation({
    action: deleteAdminTag,
  });

  const {
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
    setItemsPerPage,
    onSelectPage,
  } = usePagination({ totalItems: count, itemsPerPage });

  useFetch({ action: getAdminTags, currentPage, itemsPerPage });

  //Formik initial state
  const initValues = {
    title: "",
    date: "",
  };

  //Yup validation schema
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Name field is required"),
    date: Yup.string().required("Date field is required"),
  });

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
    dispatch(addAdminTags(data));
  };

  const onCancelHandler = (resetForm) => {
    resetForm();
  };

  const columns = [
    {
      name: "S.No.",
      selector: (row, index) => <div>{index + 1}</div>,
    },
    {
      name: "Tag Name",
      selector: (row) => <div>{row.title}</div>,
    },
    {
      name: "Created On",
      selector: (row) => <div>{dateFormater(row.createdAt)}</div>,
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
    <div className="categories_section tags_section">
      <h3 className="title">Tags</h3>
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
                  label="category name"
                  type="text"
                  placeholder="Enter text..."
                  name="title"
                  value={values.title}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={errors.title && touched.title && errors.title}
                />
                <Input
                  className="input_label_wrap"
                  label="date"
                  type="date"
                  name="date"
                  value={values.date}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={errors.date && touched.date && errors.date}
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
        header="Tags Logs"
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

export default Tags;
