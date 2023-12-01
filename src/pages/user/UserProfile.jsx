import React, { useEffect, useState } from "react";
import { Row, Col, Image } from "react-bootstrap";
import { Button } from "../../components/user";
import { UserIcon, CameraIcon, EyeLock } from "../../assets/icons/user";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import {
  getMyAccount,
  userEditProfile,
} from "../../redux/thunk/user/usrProfile";
import { useDispatch, useSelector } from "react-redux";
import { CustomModal, ImageCropper, Input } from "../../components/common";
import { nameRefExp, passwordRefExp, phoneRegExp } from "../../utility/regax";
import { useCropper, useModal } from "../../utility/hooks";

const UserProfile = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  //Redux state
  const [Initialvalues, setInitialvalues] = useState(false);

  const { userAuthtoken } = useSelector((state) => state.userAuth);
  const { userDetails } = useSelector((state) => state.userProfile);
  //Redux action dispatcher
  const dispatch = useDispatch();

  //Custom hooks
  const { show, handleClose, handleShow } = useModal();
  const { updateCroppedImg, cancelCrop } = useCropper();

  //country selebox options
  const CountryOptions = [
    { value: "India", label: "India" },
    { value: "Italy", label: "Italy" },
    { value: "USA", label: "USA" },
    { value: "China", label: "China" },
    { value: "Canada", label: "Canada" },
    { value: "UK", label: "UK" },
  ];

  //Formik initial values
  const initValues = {
    full_name: userDetails?.full_name ?? "",
    email: userDetails?.email ?? "",
    phone: userDetails?.phone ?? "",
    // password: userDetails?.password ?? "",
    country_code: userDetails?.country_code ?? "",
    profile_pic: null,
    file: null,
  };

  //Formin validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(nameRefExp, "Name can only contain Latin letters.")
      .max(50)
      .required("required field"),
    email: Yup.string().email().required("required field"),
    phone: Yup.string()
      .matches(phoneRegExp, "Enter a valid Phone Number")
      .max(12)
      .required("Enter a valid Phone Number"),

    password: Yup.string()
      .required("required field")
      .matches(
        passwordRefExp,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    country: Yup.string().required("must select country"),
  });

  //Methods
  useEffect(() => {
    const data = {
      userAuthtoken,
      values: {
        full_name: userDetails?.full_name,
      },
    };
    console.log("first", data);
    console.log(data,'DATA IN MY ACCOUNT')
    dispatch(getMyAccount(data));
  }, [userAuthtoken, dispatch]);

  const handleCountryChange = (selectedCountry) => {
    setSelectedCountry(selectedCountry);
  };

  const onSubmitHandler = (values) => {
    const data = {
      userAuthtoken,
      values: {
        ...values,
      },
    };
    console.log("first", values);

    dispatch(userEditProfile(data));
  };

  const handleImageChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    console.log(file, "file");
    if (file) {
      handleShow();
      
    }
    setFieldValue("file", file);
    // console.log(URL.createObjectURL(file), "URL.createObjectURL(file)");
  };

  return (
    <>
      <section className="auth">
        <div className="auth__inner">
          <h1 className="auth__title text-center">Edit Profile</h1>
          <Formik
            enableReinitialize={true}
            initialValues={initValues}
            // validationSchema={validationSchema}
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
              setFieldValue,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={12}>
                    <div className="inputRow">
                      <div className="editProfileUser">
                        <input
                          id="editUser"
                          type="file"
                          accept="image/*"
                          value={values.profile_pic}
                          onChange={(e) => handleImageChange(e, setFieldValue)}
                          
                        />
                        <label for="editUser">
                          <div className="editUser__figure">
                            {values.profile_pic ? (
                              <Image
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  borderRadius: "100%",
                                }}
                                src={values.profile_pic}
                                alt="user_pro"
                              />
                            ) : (
                              <UserIcon 
                              role="img"/>
                            )}
                          </div>
                          <div className="editUser__icon">
                            <CameraIcon onClick={handleShow} />
                          </div>
                        </label>
                      </div>
                    </div>
                    <CustomModal
                      show={show}
                      handleClose={handleClose}
                      modalHead="Image cropper"
                    >
                      <ImageCropper
                        updateCroppedImg={updateCroppedImg}
                        image={"image"}
                        file={values.file}
                        cancelCrop={cancelCrop}
                      />
                    </CustomModal>
                  </Col>

                  <Col md={12}>
                    <div className="inputRow">
                      <input
                        name="full_name"
                        placeholder="Name"
                        type="text"
                        value={values.full_name}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <span style={{ color: "red" }}>
                        {" "}
                        {errors.full_name &&
                          touched.full_name &&
                          errors.full_name}
                      </span>
                    </div>
                  </Col>

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
                      <input
                        name="phone"
                        placeholder="Phone Number"
                        type="text"
                        value={values.phone}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <span style={{ color: "red" }}>
                        {errors.phone && touched.phone && errors.phone}
                      </span>
                    </div>
                  </Col>

                 
                  <Col md={12}>
                    {/* <div className="inputRow"> */}
                    {/* <div className="inputRow__icon"> */}
                    {/* <Select
                       styles={{
                        
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          color : state.isFocused ? 'black' : "black",
                        
                          backgroundColor: state.isFocused ? 'white' : 'white'
                        }),}}
                        placeholder="Country"
                        onBlur={handleBlur}
                        value={selectedCountry}
                        onChange={(selectedOption) => {
                          handleCountryChange(selectedOption);

                          handleChange("country")(selectedOption.value);
                        }}
                        // isSearchable={true}
                        options={CountryOptions}
                        name="country"
                      /> */}

                    {/* <span className="inputRow__iconGroup">
                        <DownArrow />
                      </span>
                      <span style={{ color: "red" }}>
                        {" "}
                        {errors.country && touched.country && errors.country}
                      </span>
                    </div> */}
                    {/* </div> */}
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
                  <Col md="12">
                    <Button
                      type="submit"
                      title={"Save"}
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

export default UserProfile;
