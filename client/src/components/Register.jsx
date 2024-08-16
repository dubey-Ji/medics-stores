import { FaGoogle, FaFacebook } from "react-icons/fa";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CustomSnackbar from "./CustomSnackbar";
import useUserRegisterationDataValidation from "../utils/useUserRegisterationDataValidation";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [userRegisterationData, setUserRegisterationData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    phoneNumber: "",
  });
  const [termsAndConditions, setTermsAndConditions] = useState(null);
  const [passwordType, setPasswordType] = useState("password");
  const [cpasswordType, setCpasswordType] = useState("password");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarState, setSnackbarState] = useState({
    success: true,
    message: "",
  });

  const validateUserRegisterationData = useUserRegisterationDataValidation();

  useEffect(() => {
    setTimeout(() => {
      setShowSnackbar(false);
    }, 1200);
  }, [showSnackbar]);
  const handleOnClickRegisteration = async (e) => {
    e.preventDefault();
    const data = validateUserRegisterationData(userRegisterationData);
    if (!data.success) {
      setShowSnackbar(true);
      setSnackbarState({
        message: data.message,
        success: false,
      });
      return;
    }

    const resp = await fetch(
      `${process.env.REACT_APP_SERVER_URI}/auth/register`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(userRegisterationData),
      }
    );
    const json = await resp.json();
    if (!json.success) {
      setShowSnackbar(true);
      setSnackbarState({
        message: json.message,
        success: false,
      });
      return;
    }
    navigate("/login");
    return;
  };
  const handleGoogleRegisteration = async (e) => {
    const redirectURI = process.env.REACT_APP_GOOGLE_REDIRECT_URI;
    const scope = process.env.REACT_APP_GOOGLE_SCOPE;
    localStorage.setItem("isRegisterationProcess", true);
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${redirectURI}&response_type=code&scope=${scope}`;
  };
  return (
    <>
      <div className="register-container h-screen w-screen bg-[#F4F7FA] box-border">
        <div className="flex items-center py-[32px] flex-col w-4/12 mx-auto">
          <div className="header mb-[3rem] w-[100%]">
            <h1 className="text-[1.5625rem] leading-4 mb-[0.25rem] text-center font-[800] font-[ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji]">
              Sign Up
            </h1>
            <p className="text-[#525B75] text-center leading-6 pb-[16px] pt-[10px] font-[Nunito Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol] font-[400]">
              Create your account today
            </p>
          </div>
          <div className="social-media-login flex flex-col border-5 w-[100%]">
            <button
              className="border-2 mb-[16px] py-[10px] px-[24px] hover:bg-[#e3e6ed] border-[#e3e6ed] rounded-[0.375rem] bg-[#f5f7fa] text-[0.8rem] flex justify-center cursor-pointer"
              onClick={handleGoogleRegisteration}
            >
              <FaGoogle className="mt-[4px] mr-[10px]" />
              Sign up with google
            </button>
            <button className="border-2  py-[10px] px-[24px] hover:bg-[#e3e6ed] border-[#e3e6ed] rounded-[0.375rem] bg-[#f5f7fa] text-[0.8rem] flex justify-center cursor-pointer">
              <FaFacebook className="mt-[4px] mr-[10px]" />
              Sign up with facebook
            </button>
          </div>
          <div className="mt-[1.5rem] w-[100%]">
            <hr />
          </div>
          <form className="eamil-register w-[100%]">
            <div className="name-fields mb-[1rem] text-left">
              <label
                htmlFor="name"
                className="pl-[1rem] uppercase leading-tight text-[0.64rem] font-[700] text-[#525b75] inline-block"
              >
                Name
              </label>
              <input
                type="text"
                placeholder="Name"
                id="name"
                value={userRegisterationData.name}
                onChange={(e) => {
                  setUserRegisterationData((prevValue) => ({
                    ...prevValue,
                    name: e.target.value,
                  }));
                }}
                className="block w-[100%] py-[0.5rem] px-[1rem] text-[0.8rem] font-[600] leading-normal text-[#31374a] bg-[#fff] border-[1px] border-solid border-[#cbd0dd] rounded-[0.375rem]"
              />
            </div>
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
                value={userRegisterationData.email}
                onChange={(e) => {
                  setUserRegisterationData((prevValue) => ({
                    ...prevValue,
                    email: e.target.value,
                  }));
                }}
                className="block w-[100%] py-[0.5rem] px-[1rem] text-[0.8rem] font-[600] leading-normal text-[#31374a] bg-[#fff] border-[1px] border-solid border-[#cbd0dd] rounded-[0.375rem]"
              />
            </div>
            <div className="email-fields mb-[1rem] text-left">
              <label
                htmlFor="phoneNumber"
                className="pl-[1rem] uppercase leading-tight text-[0.64rem] font-[700] text-[#525b75] inline-block"
              >
                Phone Number
              </label>
              <input
                type="text"
                placeholder="+91 1234567891"
                id="phoneNumber"
                value={userRegisterationData.phoneNumber}
                onChange={(e) => {
                  setUserRegisterationData((prevValue) => ({
                    ...prevValue,
                    phoneNumber: e.target.value,
                  }));
                }}
                className="block w-[100%] py-[0.5rem] px-[1rem] text-[0.8rem] font-[600] leading-normal text-[#31374a] bg-[#fff] border-[1px] border-solid border-[#cbd0dd] rounded-[0.375rem]"
              />
            </div>
            <div className="password-fields w-[100%] mb-[1rem] flex flex-wrap">
              <div className="password w-6/12 pr-[1.5rem]">
                <label className="pl-[1rem] uppercase leading-tight text-[0.64rem] font-[700] text-[#525b75] inline-block">
                  Password
                </label>
                <input
                  type={passwordType}
                  placeholder="Password"
                  value={userRegisterationData.password}
                  onChange={(e) => {
                    setUserRegisterationData((prevValue) => ({
                      ...prevValue,
                      password: e.target.value,
                    }));
                  }}
                  className="block w-[100%] py-[0.5rem] px-[1rem] text-[0.8rem] font-[600] leading-normal text-[#31374a] bg-[#fff] border-[1px] border-solid border-[#cbd0dd] rounded-[0.375rem]"
                />
                {passwordType === "password" ? (
                  <IoIosEyeOff
                    className="relative bottom-6 left-[11.5em]"
                    onClick={() => {
                      setPasswordType("text");
                    }}
                  />
                ) : (
                  <IoIosEye
                    className="relative bottom-6 left-[11.5em]"
                    onClick={() => {
                      setPasswordType("password");
                    }}
                  />
                )}
              </div>
              <div className="confirm-password w-6/12 pl-[1.5rem]">
                <label className="pl-[1rem] uppercase leading-tight text-[0.64rem] font-[700] text-[#525b75] inline-block">
                  Confirm Password
                </label>
                <input
                  type={cpasswordType}
                  placeholder="Confirm Password"
                  value={userRegisterationData.cpassword}
                  onChange={(e) => {
                    setUserRegisterationData((prevValue) => ({
                      ...prevValue,
                      cpassword: e.target.value,
                    }));
                  }}
                  className="block w-[100%] py-[0.5rem] px-[1rem] text-[0.8rem] font-[600] leading-normal text-[#31374a] bg-[#fff] border-[1px] border-solid border-[#cbd0dd] rounded-[0.375rem]"
                />
                {cpasswordType === "password" ? (
                  <IoIosEyeOff
                    className="relative bottom-6 left-[11.5em]"
                    onClick={() => {
                      setCpasswordType("text");
                    }}
                  />
                ) : (
                  <IoIosEye
                    className="relative bottom-6 left-[11.5em]"
                    onClick={() => {
                      setCpasswordType("password");
                    }}
                  />
                )}
              </div>
            </div>
            <div className="form-check mb-[1rem] pl-[1.5em]">
              <input
                type="checkbox"
                id="termsService"
                onChange={() => {
                  setTermsAndConditions(!termsAndConditions);
                }}
                className="ml-[-1.5em] cursor-pointer mt-[0.245em] w-[1em] h-[1em] float-left font-['Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol']"
              />
              <label
                htmlFor="termsServie"
                className="text-[0.8rem] text-[#525b75] font-[700] leading-tight"
              >
                I accept the{" "}
                <span className="text-[#3874ff] hover:underline cursor-pointer">
                  terms
                </span>{" "}
                and{" "}
                <span className="text-[#3874ff] hover:underline cursor-pointer">
                  privacy policy
                </span>
              </label>
            </div>
            {!termsAndConditions ? (
              <button
                disabled
                className="bg-[#3874ff] text-[#fff] rounded-[0.375rem] w-[100%] px-[1.5rem] py-[0.625rem] text-[0.8rem] font-[700] leading-tight mb-[1rem] border-[1px]"
              >
                Sign up
              </button>
            ) : (
              <button
                className="bg-[#3874ff] text-[#fff] rounded-[0.375rem] w-[100%] px-[1.5rem] py-[0.625rem] text-[0.8rem] font-[700] leading-tight mb-[1rem] border-[1px] hover:bg-[#004dff] cursor-pointer"
                onClick={handleOnClickRegisteration}
              >
                Sign up
              </button>
            )}
            <div className="text-center">
              <Link
                to="/login"
                className="font-[700] text-[0.8rem] text-[#3874ff]"
              >
                Sign in to an existing account
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

export default Register;
