const useUserRegisterationDataValidation = (userRegisterationData) => {
  const validate = (userRegisterationData) => {
    const regexEmail =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

    if (!userRegisterationData || !userRegisterationData.email) {
      return { success: false, message: "Email is required" };
    }

    if (!regexEmail.test(userRegisterationData.email)) {
      return { success: false, message: "Email is not valid" };
    }

    const regexPassword =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!userRegisterationData || !userRegisterationData.password) {
      return { success: false, message: "Password is required" };
    }

    if (!userRegisterationData || !userRegisterationData.cpassword) {
      return { success: false, message: "Confirm Password is required" };
    }

    if (!userRegisterationData || !userRegisterationData.phoneNumber) {
      return { success: false, message: "Phone number is required" };
    }

    if (!regexPassword.test(userRegisterationData.password)) {
      return { success: false, message: "Password condition does not match" };
    }

    if (userRegisterationData.password !== userRegisterationData.cpassword) {
      return { success: false, message: "Password does not match" };
    }

    // Add more validation logic as needed

    return { success: true, message: "" };
  };

  return validate;
};

export default useUserRegisterationDataValidation;
