import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Button, Alert } from "../../components/user";
import { EmailIcon } from "../../assets/icons/user";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { forgotPassword, resetPassword } from "../../redux/thunk/user/usrMain";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { ROUTES } from "../../navigation/constants";

const ResetPassword = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initValues = {
    email: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Enter your E-mail"),
  });

  function submit() {
    // localStorage.setItem('login',true)

    setShow(true);
  }
  function showClose() {
    setShow(false);
    window.open("/create_new_password", "_self");
  }

  const { usrCreatePassword, usrLogin } = ROUTES;

  const onSubmitHandler = (values) => {
    const data = {
      ...values,
    };
    dispatch(forgotPassword(data)).then(({ payload }) => {
      if (payload.status) {
        navigate(usrCreatePassword);
      }
    });
    setShow(true);
  };

  return (
    <>
      <Alert
        title={"Check your email"}
        icon={<EmailIcon />}
        body={"We have sent a password recover instructions to your email."}
        btnTitle={"Done"}
        showClose={showClose}
        show={show}
      />

      <section className="auth">
        <div className="auth__inner">
          <h1 className="auth__title mb-0">Reset Password</h1>
          <p className="auth__subTitle">
            Enter the email address you used when you joined and we’ll send you
            instructions to reset your password
          </p>

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
            }) => (
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={12}>
                    <div className="inputRow">
                      <input
                        name="email"
                        placeholder="E-mail"
                        type="email"
                        value={values.email}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <span style={{ color: "red" }}>
                        {errors.email && touched.email && errors.email}
                      </span>
                    </div>
                  </Col>

                  <Col md="12">
                    <Button
                      type="submit"
                      title={"Save Changes"}
                      className="submitBtn"
                      // submit={submit}
                    />
                    {/* <Button title={"Send"} className="submitBtn" submit={submit} /> */}
                  </Col>
                  <Col md="12">
                    <p className="newUserLink">
                      Remember your Password?
                      <span onClick={() => navigate(usrLogin)}>Login</span>
                    </p>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </>
  );
};

export default ResetPassword;
