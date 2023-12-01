import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Button } from "../../components/user";
import * as Yup from "yup";
import { EyeLock } from "../../assets/icons/user";
import { Form, Formik } from "formik";
import { userLogin } from "../../redux/thunk/user/usrMain";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "../../navigation/constants";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { passwordRegExp } from "../../utility/regax";
import "../../styles/user/auth.scss";
import userCredentials, {
  clearCredentials,
  saveCredentials,
  changeRememberMe
} from "../../redux/reducers/userSlices/userCredentials";

const Login = () => {
  const [show, setShow] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const {
    rememberMe: rememberFlag,
    email: rememberedEmail,
    password: rememberedPassword,
  } = useSelector((state) => state.userCredentials);

  //Redux action dispatcher
  const dispatch = useDispatch();

  //Router functions
  const navigate = useNavigate();

  //Routes
  const { usrPrograms, usrResetPassword, usrSignUp } = ROUTES;

  //Formik initial values
  const initValues = {
    email: rememberFlag ? rememberedEmail : "",
    password: rememberFlag ? rememberedPassword : "",
    // refreshToken:""
  };

  //Formik validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("required field"),
    // password: Yup.string()
    //   .required("required field")
    //   .matches(
    //     passwordRegExp,
    //     "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    //   ),
  });

  //Methods

  const onSubmitHandler = (values) => {
    const data = { values };

    dispatch(userLogin(data)).then(({ payload }) => {
      if (payload) {
        if (rememberMe) {
          dispatch(
            saveCredentials({ email: values.email, password: values.password })
          );
        } else {
          dispatch(clearCredentials());
        }
        navigate(usrPrograms);
      }
    });
  };

  function handleChangeRemember(e) {
    setRememberMe(e.target.checked);

    if (e.target.checked) {

      dispatch(changeRememberMe(e.target.checked))
    } else if (e.target.checked === false) {

      dispatch(changeRememberMe(e.target.checked))
    }
  }

  useEffect(() => {


  },[rememberFlag])

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
                        <input
                          type="checkbox"
                          id="remember"
                          checked={rememberFlag}
                          value={rememberFlag}
                          onChange={(e) => handleChangeRemember(e)}
                        />
                        <label htmlFor="remember">Remember Me</label>
                      </div>

                      <Link className="forgotLink" to={usrResetPassword}>
                        Forgot Password?
                      </Link>
                    </div>
                  </Col>

                  <Col md="12">
                    {/* <Button title={"Login"} className="submitBtn" submit={submit} /> */}
                    <Button
                      type="submit"
                      title={"Login"}
                      className="submitBtn"
                      // submit={submit}
                    />
                  </Col>
                  <Col md="12">
                    <p className="newUserLink">
                      New user?
                      <span onClick={() => navigate(usrSignUp)}>Signup</span>
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

export default Login;
