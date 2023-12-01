import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Button, Alert } from "../../components/user";
import { CheckIcon, EyeLock } from "../../assets/icons/user";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { userSignUp } from "../../redux/thunk/user/usrMain";
import { useDispatch } from "react-redux";
import { Input } from "../../components/common";
import { ROUTES } from "../../navigation/constants";
import SocialMedia from "../common/SocialMedia";
import "../../styles/user/auth.scss";

const Signup = () => {
  const [showPass, setShowPass] = useState(false);
  const [show, setShow] = useState(false);

  //Redux action dispatcher
  const dispatch = useDispatch();

  //Router functions
  const navigate = useNavigate();
  const { usrOtp, usrLogin } = ROUTES;

  //Formik initial state
  const initValues = {
    full_name: "",
    email: "",
    password: "",
    phone: "",
    country_code: "",
  };

  //Formik validation schema
  const validationSchema = Yup.object().shape({
    full_name: Yup.string()
      .matches(
        /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
        "Name can only contain Latin letters."
      )
      .max(50)
      .required("Required field"),
    email: Yup.string().email().required("Required field"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      )
      .required("Required field"),
    phone: Yup.string().required("Required field"),
    country_code: Yup.string().required("Required field"),
  });

  //Methods
  function showClose() {
    setShow(false);
    window.open("/login", "_self");
  }

  const onSubmitHandler = (values) => {
    const data = {
      ...values,
    };
    dispatch(userSignUp(data)).then(({ payload }) => {
      if (payload) {
        setShow(true);
        navigate(usrOtp, {
          state: {
            id: payload.user_id,
            otp: payload.otp,
          },
        });
      }
    });
  };

  return (
    <>
      <Alert
        title={"Success"}
        body={"Congratulations, you have completed your registration!"}
        btnTitle={"Done"}
        icon={<CheckIcon />}
        showClose={showClose}
        show={show}
      />

      <section className="auth">
        <div className="auth__inner">
          <h1 className="auth__title text-center">Sign Up to your account</h1>

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
                    <Input
                      className="inputRow"
                      type="text"
                      placeholder="Name"
                      name="full_name"
                      value={values.full_name}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={
                        errors.full_name &&
                        touched.full_name &&
                        errors.full_name
                      }
                    />
                  </Col>

                  <Col md={12}>
                    <Input
                      className="inputRow"
                      type="email"
                      placeholder="E-mail"
                      name="email"
                      value={values.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={errors.email && touched.email && errors.email}
                    />
                  </Col>

                  <Col md={12}>
                    <div className="inputRow">
                      <div className="inputRow__icon">
                        <input
                          name="password"
                          placeholder="Enter Password"
                          type={showPass ? "text" : "password"}
                          value={values.password}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />

                        <span
                          className="inputRow__iconGroup"
                          onClick={(e) => {
                            e.preventDefault();
                            setShowPass(!showPass);
                          }}
                        >
                          {showPass ? <EyeLock /> : <EyeLock />}
                        </span>
                      </div>
                      <span style={{ color: "red" }}>
                        {errors.password && touched.password && errors.password}
                      </span>
                    </div>
                  </Col>

                  <Col md={12}>
                    <Input
                      className="inputRow"
                      type="text"
                      placeholder="Country Code"
                      name="country_code"
                      value={values.country_code}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={
                        errors.country_code &&
                        touched.country_code &&
                        errors.country_code
                      }
                    />
                  </Col>
                  <Col md={12}>
                    <Input
                      className="inputRow"
                      type="text"
                      placeholder="Phone Number"
                      name="phone"
                      value={values.phone}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={errors.phone && touched.phone && errors.phone}
                    />
                  </Col>

                  <Col md="12">
                    <Button
                      type="submit"
                      title={"Sign Up"}
                      className="submitBtn"
                      // submit={submit}
                    />
                  </Col>

                  <Col md="12">
                    <p className="newUserLink">
                      Already Have an Account?
                      <span onClick={() => navigate(usrLogin)}>Login</span>
                    </p>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
          <SocialMedia />
        </div>
      </section>
    </>
  );
};

export default Signup;
