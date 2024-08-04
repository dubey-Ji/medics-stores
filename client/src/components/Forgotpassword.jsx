import { Link } from "react-router-dom";
import CustomSnackbar from "./CustomSnackbar";
import { useState } from "react";

const ForgotPassword = () => {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarState, setSnackbarState] = useState({
    success: true,
    message: "",
  });
  return (
    <>
      <div className="register-container h-screen w-screen bg-[#F4F7FA] box-border">
        <div className="flex items-center py-[32px] flex-col w-5/12 mx-auto h-[100vh] justify-center">
          <div className="header mb-[1rem] w-[100%]">
            <h1 className="text-[1.5625rem] leading-4 mb-[0.25rem] text-center font-[600] font-[ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji]">
              Forgot your password?
            </h1>
            <p className="text-[#525B75] text-center leading-6 pb-[16px] pt-[10px] font-[Nunito Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol] font-[1rem] font-[400]">
              Enter your email below and we will send you a reset link
            </p>
          </div>
          <form className="eamil-register w-[100%] mt-[1rem]">
            <div className="flex flex-wrap w-[100%]">
              <div className="email-fields text-left w-10/12 pr-[1rem]">
                <input
                  type="text"
                  placeholder="Email"
                  id="email"
                  className="block w-[100%] py-[0.5rem] px-[1rem] text-[0.8rem] font-[600] leading-normal text-[#31374a] bg-[#fff] border-[1px] border-solid border-[#cbd0dd] rounded-[0.375rem]"
                />
              </div>
              <div>
                <button className="bg-[#3874ff] text-[#fff] rounded-[0.375rem] px-[1.5rem] py-[0.625rem] text-[0.8rem] font-[500] leading-tight mb-[1rem] border-[1px] hover:bg-[#004dff] cursor-pointer">
                  Send
                </button>
              </div>
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

export default ForgotPassword;
