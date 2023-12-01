import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { BtnGroup, Button, Input } from "../../components/common";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../navigation/constants";
import { addAdminFaq } from "../../redux/thunk/admin/adFaqs";

const AddFaq = () => {
  //Redux state
  const { adminAuthtoken } = useSelector((state) => state.adAuth);

  //Redux action dispatcher
  const dispatch = useDispatch();

  //Router functions
  const navigate = useNavigate();
  const { adFaqList } = ROUTES;

  //Formik initial state
  const initValues = {
    question_title: "",
    answer: "",
  };

  //Yup validation schema
  const validationSchema = Yup.object().shape({
    question_title: Yup.string().required("Question field is required"),
    answer: Yup.string().required("Answer field is required"),
  });

  //Methods
  const onSubmitHandler = (values) => {
    const data = {
      adminAuthtoken,
      values: {
        ...values,
      },
    };
    dispatch(addAdminFaq(data)).then(({ payload }) => {
      if (payload.status) {
        navigate(adFaqList);
      }
    });
  };

  const onCancelHandler = (resetForm) => {
    resetForm();
  };
  return (
    <div className="categories_section">
      <h3 className="title">
        <Link to={adFaqList} className="me-3">
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
            ></path>
          </svg>
        </Link>
        Add New Question
      </h3>
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
                  label="question title"
                  type="text"
                  placeholder="Enter text..."
                  name="question_title"
                  value={values.question_title}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={
                    errors.question_title &&
                    touched.question_title &&
                    errors.question_title
                  }
                />
                <Input
                  className="input_label_wrap"
                  label="answer"
                  type="test"
                  name="answer"
                  placeholder="Enter text..."
                  value={values.answer}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={errors.answer && touched.answer && errors.answer}
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
    </div>
  );
};

export default AddFaq;
