import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CustomSnackbar from "./CustomSnackbar";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
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

    if (!message || !success) {
      return;
    } else if (message && success) {
      setShowSnackbar(true);
      setSnackbarState({
        success: success,
        message: message,
      });
    } else if (message && !success) {
      setShowSnackbar(true);
      setSnackbarState({
        success: success,
        message: message,
      });
    }
  }, []);
  useEffect(() => {
    const fetchPingPong = async () => {
      try {
        const response = await axios.request({
          method: "GET",
          url: `${process.env.REACT_APP_SERVER_URI}/ping`,
          withCredentials: true,
        });
        console.log("response of ping pong", response);
      } catch (error) {
        console.error(`\n Error occured while fetching ping pong --> ${error}`);
        throw error;
      }
    };
    fetchPingPong();
  }, []);
  const hanldeOnLogout = () => {
    const hitTheAPI = async () => {
      try {
        const data = await axios.request({
          method: "GET",
          url: `${process.env.REACT_APP_SERVER_URI}/auth/logout`,
          withCredentials: true,
        });
        if (data.data.success) {
          const { path } = data.data.data;
          navigate(path, {
            state: { message: data.data.message, success: data.data.success },
          });
          return;
        }
        console.log("data", data);
      } catch (error) {
        console.error("Error occured while hitting the API", error);
      }
    };
    hitTheAPI();
  };
  return (
    <>
      <h1>Hello from Home</h1>
      <button onClick={hanldeOnLogout}>Logout</button>
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

export default Home;
