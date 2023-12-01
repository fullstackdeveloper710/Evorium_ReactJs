import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Button } from "../../components/user";
import * as Yup from "yup";
import { EyeLock } from "../../assets/icons/user";
import { Form, Formik } from "formik";
import "../../styles/admin/auth.scss";
import { useDispatch, useSelector } from "react-redux";
import { passwordRegExp } from "../../utility/regax";
import { adminLogin } from "../../redux/thunk/admin/adAuth";
import { useNavigate } from "react-router";
import { ROUTES } from "../../navigation/constants";
import { Link } from "react-router-dom";

const AdminLogin = () => {
  const [showPass, setShowPass] = useState(false);

  //Redux action dispatcher
  const dispatch = useDispatch();

  //Router functions
  const navigate = useNavigate();

  //Formik initial state
  const initValues = {
    email: "",
    password: "",
  };

  //Yup validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("required field"),
    // password: Yup.string()
    //   .required("required field")
    //   .matches(
    //     passwordRegExp,
    //     "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    //   ),
  });

  const { adDashboard } = ROUTES;

  //Methods
  const onSubmitHandler = (values) => {
    const data = { values };
    dispatch(adminLogin(data)).then(({ payload }) => {
      if (payload.status) {
        navigate(adDashboard);
      }
    });
  };

  return (
    <>
      <section className="auth">
        <div className="auth__inner">
          <h1 className="auth__title text-center">Login into the account</h1>
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
                    <div className="authRemember">
                      <div className="remember-text">
                        <input type="checkbox" id="remember" />
                        <label htmlFor="remember">Remember Me</label>
                      </div>

                      <Link to={"/reset_password"} className="forgotLink">
                        Forgot Password?
                      </Link>
                    </div>
                  </Col>

                  <Col md="12">
                    <Button
                      type="submit"
                      title={"Login"}
                      className="submitBtn"
                      // submit={submit}
                    />
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

export default AdminLogin;
