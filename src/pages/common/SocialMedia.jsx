import React, { useCallback, useRef, useState } from "react";
import { LoginSocialGoogle, LoginSocialFacebook } from "reactjs-social-login";

// CUSTOMIZE ANY UI BUTTON
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import { Col } from "react-bootstrap";
import { GoogleIcon } from "../../assets/icons/user";
import {
  userFacebookLogin,
  userGoogleLogin,
} from "../../redux/thunk/user/usrMain";
import { ROUTES } from "../../navigation/constants";
import { useLocation, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
// import GoogleLogin from "@leecheuk/react-google-login";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { decodeJwt } from "jose";

const REDIRECT_URI = "http://localhost:3000";

const SocialMedia = () => {
  const [provider, setProvider] = useState("");
  const [profile, setProfile] = useState();
  const [ID_TOKEN, setIDToken] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();

  const { state } = location;

  const onLoginStart = useCallback((profile) => {
    const val = "";
  }, []);

  const onLogoutFailure = useCallback(() => {
    alert("logout fail");
  }, []);

  const onLogoutSuccess = useCallback(() => {
    setProfile(null);
    setProvider("");
    alert("logout success");
  }, []);

  const { usrPrograms } = ROUTES;

  const onSubmitHandler = (values) => {
    const data = {
      values: {
        idToken: values.credential,
        // email:values.email,
        // full_name:values.given_name,
        // profile_pic:values.picture,
      },
    };
    dispatch(userGoogleLogin(data));
  };
  // facebook
  const onSubmitHandlerFacebook = (values) => {
    const data = {
      values: {
        access_token: values.access_token,
        email: values.email,
        full_name: values.given_name,
        profile_pic: values.picture,
      },
    };
    dispatch(userFacebookLogin(data));
  };

  return (
    <>
      <Col md={12} onSubmit={onSubmitHandler}>
        <div className="auth__socialWrap" style={{ display: "flex" }}>
          {/* <div className="auth__socialWrap__icon" > */}

          <div
            className={`auth__socialWrap__icon ${
              provider && profile ? "hide" : ""
            }`}
          >
            <ul>
              <li>
                <LoginSocialFacebook
                  // isOnlyGetToken
                  appId="1083604836218636"
                  // onLoginStart={onLoginStart}
                  onLogoutSuccess={onLogoutSuccess}
                  onResolve={({ provider, data }) => {
                    setProvider(provider);
                    setProfile(data);

                    onSubmitHandlerFacebook(data);
                  }}
                  onReject={(err) => {
                    console.log(err);
                  }}
                  // redirect_uri={REDIRECT_URI}
                >
                  <FacebookLoginButton text="" />
                </LoginSocialFacebook>
              </li>

              <li>
                {" "}
                <GoogleOAuthProvider clientId="821353603223-d3vutqm04fu88jl0jmju9ts19a5kp290.apps.googleusercontent.com">
                  <GoogleLogin
                    // clientId="821353603223-d3vutqm04fu88jl0jmju9ts19a5kp290.apps.googleusercontent.com"
                    onSuccess={(credentialResponse, data) => {
                      const { credential } = credentialResponse;
                      const payload = credential
                        ? decodeJwt(credential)
                        : undefined;
                      if (payload) {
                        console.log(payload, "payload-----------------");
                      }
                      console.log(
                        credentialResponse,
                        data,
                        "credentialResponse"
                      );
                      setIDToken(credentialResponse);

                      onSubmitHandler(credentialResponse, data);
                    }}
                    cookiePolicy={"single_host_origin"}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                    // redirect_uri={REDIRECT_URI}
                  />
                </GoogleOAuthProvider>
                {/* <GoogleOAuthProvider
                            

                  clientId="821353603223-d3vutqm04fu88jl0jmju9ts19a5kp290.apps.googleusercontent.com">  */}
                {/* <GoogleLogin
                  // ref={googleRef}
                  clientId={"821353603223-ue9aberp764eb2tjsd8ikau2bm4hsldg.apps.googleusercontent.com"}
                  onLogoutFailure={onLogoutFailure}
                  
                  onLoginStart={onLoginStart}
                  onLogoutSuccess={onLogoutSuccess}
                  onResolve={({ provider, data, idToken }) => {
                    console.log(idToken,"data dda")
                    setProvider(provider);
                    setProfile(data);
                    console.log(data, "data here from google");
                    console.log(provider, "provider");
                    onSubmitHandler(data);
                  }}
                  onReject={(err) => {
                    console.log("hbhbdhd", err);
                  }}
                  redirect_uri={REDIRECT_URI}
                >
                  <GoogleLoginButton
                  text=""
                  />
                 
                </GoogleLogin>  */}
                {/* </GoogleOAuthProvider> */}
              </li>
            </ul>
          </div>
        </div>
        {/* </div> */}
      </Col>
    </>
  );
};

export default SocialMedia;
