import axios from "axios";
import admin from "../../../assets/client1.png";
import { useState } from "react";
import "./setting.css";
const Setting = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = () => {
    const newErrors = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required.";
    }
    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required.";
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters.";
    }
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post(
        "http://localhost:3005/user/change-password",
        {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }
      );
      setSuccessMessage("Password changed successfully!");
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Error changing password:", error);
      if (error.response && error.response.data) {
        setErrors({ apiError: error.response.data.message });
      }
    }
  };
  return (
    <>
      <div className="text-3xl mb-5 font-semibold">Setting</div>
      <div>
        <div>
          <img className="w-28 rounded-full" src={admin} alt="" />
        </div>
        <div className="flex gap-5 mt-4">
          <div className="flex flex-col gap-[2px] w-[175px] border-r pr-5">
            <label className="font-bold" htmlFor="">
              Name
            </label>
            <span> Sandesh Bhusal</span>
          </div>

          <div className="flex flex-col gap-[2px]">
            <label className="font-bold" htmlFor="">
              Email
            </label>
            <span> s225@gmail.com</span>
          </div>
        </div>

        <div className="flex gap-5 mt-2">
          <div className="flex flex-col gap-[2px] w-[175px] border-r pr-5">
            <label className="font-bold" htmlFor="">
              Phone Number
            </label>
            <span> s225@gmail.com</span>
          </div>

          <div className="flex flex-col gap-[2px]">
            <label className="font-bold" htmlFor="">
              Role
            </label>
            <span> s225@gmail.com</span>
          </div>
        </div>
      </div>

      <div>
        <div>Change Password</div>
        <div className="change-password-container">
          <h2>Change Password</h2>
          <form onSubmit={handleSubmit} className="change-password-form">
            {errors.apiError && <div className="error">{errors.apiError}</div>}
            {successMessage && <div className="success">{successMessage}</div>}

            <div className="form-group">
              <label htmlFor="currentPassword">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                id="currentPassword"
                value={formData.currentPassword}
                onChange={handleInputChange}
                className={errors.currentPassword ? "input-error" : ""}
              />
              {errors.currentPassword && (
                <span className="error">{errors.currentPassword}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                name="newPassword"
                id="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                className={errors.newPassword ? "input-error" : ""}
              />
              {errors.newPassword && (
                <span className="error">{errors.newPassword}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={errors.confirmPassword ? "input-error" : ""}
              />
              {errors.confirmPassword && (
                <span className="error">{errors.confirmPassword}</span>
              )}
            </div>

            <button type="submit" className="btn btn-primary">
              Change Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Setting;
