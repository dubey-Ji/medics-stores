import { FaGoogle, FaFacebook } from "react-icons/fa";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CustomSnackbar from "./CustomSnackbar";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userLoginData, setUserLoginData] = useState({
    email: "",
    password: "",
  });
  const [rememberme, setRememberme] = useState(true);
  const [passwordType, setPasswordType] = useState("password");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarState, setSnackbarState] = useState({
    success: true,
    message: "",
  });

  useEffect(() => {
    setTimeout(() => {
      setShowSnackbar(false);
      setSnackbarState({ message: "" });
    }, 1200);
  }, [showSnackbar]);

  useEffect(() => {
    const message = location.state?.message;
    const success = location.state?.success;
    if (success && message) {
      setShowSnackbar(true);
      setSnackbarState({
        success: success,
        message: message,
      });
    } else if (!success && message) {
      setShowSnackbar(true);
      setSnackbarState({
        success: success,
        message: message,
      });
    }
  }, []);

  const handleOnClickSignIn = (e) => {
    e.preventDefault();
    const loginData = async () => {
      try {
        const resp = await axios.request({
          method: "POST",
          url: `${process.env.REACT_APP_SERVER_URI}/auth/login`,
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
          data: {
            email: userLoginData.email,
            password: userLoginData.password,
          },
        });
        const { user, path } = resp.data.data;
        navigate(path);
        return;
      } catch (error) {
        if (error.response) {
          setShowSnackbar(true);
          setSnackbarState({
            message: error.response.data.message,
            success: error.response.data.success,
          });
          return;
        } else if (error.request) {
          // The request was made but no response was received
          console.error(
            `Error occurred while login --> No response received from server`
          );
          setShowSnackbar(true);
          setSnackbarState({
            message: "No response received from server",
            success: false,
          });
          return;
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error(`Error occurred while login --> ${error.message}`);
          setShowSnackbar(true);
          setSnackbarState({
            message: `${error.message}`,
            success: false,
          });
          return;
        }
      }
    };
    loginData();
  };
  const handleGoogleLogin = async (e) => {
    // e.preventDefault();
    const redirectURI = GOOGLE_REDIRECT_URI;
    const scope = GOOGLE_SCOPE;
    localStorage.setItem("isLoginProcess", true);
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${redirectURI}&response_type=code&scope=${scope}`;
  };
  return (
    <>
      <div className="register-container h-screen w-screen bg-[#F4F7FA] box-border">
        <div className="flex items-center py-[32px] flex-col w-4/12 mx-auto">
          <div className="header mb-[3rem] w-[100%]">
            <h1 className="text-[1.5625rem] leading-4 mb-[0.25rem] text-center font-[800] font-[ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji]">
              Sign In
            </h1>
            <p className="text-[#525B75] text-center leading-6 pb-[16px] pt-[10px] font-[Nunito Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol] font-[400]">
              Get access to your account
            </p>
          </div>
          <div className="social-media-login flex flex-col border-5 w-[100%]">
            <button
              className="border-2 mb-[16px] py-[10px] px-[24px] hover:bg-[#e3e6ed] border-[#e3e6ed] rounded-[0.375rem] bg-[#f5f7fa] text-[0.8rem] flex justify-center cursor-pointer"
              onClick={handleGoogleLogin}
            >
              <FaGoogle className="mt-[4px] mr-[10px]" />
              Sign in with google
            </button>
            <button className="border-2  py-[10px] px-[24px] hover:bg-[#e3e6ed] border-[#e3e6ed] rounded-[0.375rem] bg-[#f5f7fa] text-[0.8rem] flex justify-center cursor-pointer">
              <FaFacebook className="mt-[4px] mr-[10px]" />
              Sign in with facebook
            </button>
          </div>
          <div className="mt-[1.5rem] w-[100%]">
            <hr />
          </div>
          <form className="eamil-register w-[100%] mt-[1.5rem]">
            <div className="email-fields mb-[1rem] text-left">
              <label
                htmlFor="email"
                className="pl-[1rem] uppercase leading-tight text-[0.64rem] font-[700] text-[#525b75] inline-block"
              >
                Email Address
              </label>
              <input
                type="text"
                placeholder="name@example.com"
                id="email"
                value={userLoginData.email}
                onChange={(e) => {
                  setUserLoginData((prevValue) => ({
                    ...prevValue,
                    email: e.target.value,
                  }));
                }}
                className="block w-[100%] py-[0.5rem] px-[1rem] text-[0.8rem] font-[600] leading-normal text-[#31374a] bg-[#fff] border-[1px] border-solid border-[#cbd0dd] rounded-[0.375rem]"
              />
            </div>
            <div className="password text-left">
              <label className="pl-[1rem] uppercase leading-tight text-[0.64rem] font-[700] text-[#525b75] inline-block">
                Password
              </label>
              <input
                type={passwordType}
                placeholder="Password"
                value={userLoginData.password}
                onChange={(e) => {
                  setUserLoginData((prevValue) => ({
                    ...prevValue,
                    password: e.target.value,
                  }));
                }}
                className="block w-[100%] py-[0.5rem] px-[1rem] text-[0.8rem] font-[600] leading-normal text-[#31374a] bg-[#fff] border-[1px] border-solid border-[#cbd0dd] rounded-[0.375rem]"
              />
              {passwordType === "password" ? (
                <IoIosEyeOff
                  className="relative bottom-6 left-[36rem]"
                  onClick={() => {
                    setPasswordType("text");
                  }}
                />
              ) : (
                <IoIosEye
                  className="relative bottom-6 left-[36rem]"
                  onClick={() => {
                    setPasswordType("password");
                  }}
                />
              )}
            </div>
            <div className="form-check pl-[1.5em] w-[100%] mb-[2rem] flex flex-wrap justify-between">
              <div className="mb-[1rem]">
                <input
                  type="checkbox"
                  id="termsService"
                  checked={rememberme}
                  onChange={() => {
                    setRememberme(!rememberme);
                  }}
                  className="ml-[-1.5em] cursor-pointer mt-[0.245em] w-[1em] h-[1em] float-left font-['Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol']"
                />
                <label
                  htmlFor="termsServie"
                  className="text-[0.8rem] text-[#525b75] font-[400] leading-tight"
                >
                  Remember me
                </label>
              </div>
              <div>
                <Link
                  to="/forgotpassword"
                  className="font-light text-[0.8rem] text-[#3874ff] hover:underline cursor-pointer"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>
            <button
              className="bg-[#3874ff] text-[#fff] rounded-[0.375rem] w-[100%] px-[1.5rem] py-[0.625rem] text-[0.8rem] font-[700] leading-tight mb-[1rem] border-[1px] hover:bg-[#004dff] cursor-pointer"
              onClick={handleOnClickSignIn}
            >
              Sign In
            </button>

            <div className="text-center">
              <Link
                to="/register"
                className="font-[600] text-[0.8rem] text-[#3874ff] hover:underline cursor-pointer"
              >
                Create an account
              </Link>
            </div>
          </form>
        </div>
      </div>
      {showSnackbar ? (
        <CustomSnackbar
          message={snackbarState.message}
          sucess={snackbarState.success}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default Login;
