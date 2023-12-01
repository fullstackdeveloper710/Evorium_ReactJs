import React from "react";
import { Col, Row, Image } from "react-bootstrap";
import { trash } from "../../assets/icons/admin";
import { useDispatch, useSelector } from "react-redux";
import {
  addAdminCategory,
  deleteAdminCategory,
  getAdminCategories,
} from "../../redux/thunk/admin/adCategories";
import { dateFormater } from "../../utility/methods";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { BtnGroup, Button, ConfirmPopUp, Input } from "../../components/common";
import ReactDataTable from "../../components/common/DataTable";
import { useConfirmation, useFetch, usePagination } from "../../utility/hooks";
import { totalItems, itemsPerPage } from "../../utility/methods";
import "../../styles/admin/categories.scss";
function Categories() {
  //Redux state
  const { adminAuthtoken } = useSelector((state) => state.adAuth);
  const { adminCategories } = useSelector((state) => state.adCategories);
  const { data, count } = adminCategories;

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
    action: deleteAdminCategory,
  });

  useFetch({ action: getAdminCategories, currentPage, itemsPerPage });

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

  //Methods
  // useEffect(() => {
  //   const data = {
  //     adminAuthtoken,
  //     values: {
  //       pageNo: 1,
  //       pageSize: 4,
  //     },
  //   };
  //   dispatch(getAdminCategories(data));
  // }, [adminAuthtoken, dispatch]);

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
    dispatch(addAdminCategory(data));
  };

  const onCancelHandler = (resetForm) => {
    resetForm();
  };

  const columns = [
    { name: "S.No.", selector: (row, index) => index + 1 },
    {
      name: "Category Name",
      selector: (row) => row.title,
    },
    {
      name: "Created On",
      selector: (row) => dateFormater(row?.createdAt),
    },
    {
      name: "Action",
      selector: (row) => (
        <BtnGroup className="delete_action">
          <Button
            title={<Image src={trash} />}
            type="button"
            className="action_btn delete_btn"
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
      <h3 className="title">Categories</h3>
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
                  <Button title="add" type="submit" className="primary_btn" />
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
        subHeader={true}
        header="Categories Logs"
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

export default Categories;
