import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import CustomSnackbar from "./CustomSnackbar";

const Oauth2Callback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarState, setSnackbarState] = useState({
    success: true,
    message: "",
  });
  useEffect(() => {
    const code = searchParams.get("code");
    const callOauth2Callback = async () => {
      const uri = localStorage.getItem("isRegisterationProcess")
        ? `${process.env.REACT_APP_SERVER_URI}/auth/oauth2/register/callback`
        : localStorage.getItem("isLoginProcess")
          ? `${process.env.REACT_APP_SERVER_URI}/auth/oauth2/login/callback`
          : null;
      if (!uri) {
        navigate("/login", {
          state: { message: "Something went wrong", success: false },
        });
        return;
      }
      try {
        const userDataStoreResponse = await axios.request({
          method: "POST",
          url: uri,
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            code,
          },
          withCredentials: localStorage.getItem("isLoginProcess")
            ? true
            : false,
        });
        const userJson = userDataStoreResponse.data;
        if (userJson.success) {
          navigate(userJson.data.path, {
            state: {
              message: userJson.data.message,
              success: userJson.data.success,
            },
          });
          return;
        } else {
          navigate("/register");
          return;
        }
      } catch (error) {
        throw error;
      }
    };
    callOauth2Callback();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setShowSnackbar(false);
    });
  }, [showSnackbar]);
  return <>{showSnackbar ? <CustomSnackbar /> : <></>}</>;
};

export default Oauth2Callback;
