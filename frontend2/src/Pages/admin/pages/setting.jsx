import React from "react";
import admin from "../../../assets/client1.png";
import { useEffect, useState } from "react";
import "./setting.css";
import { jwtDecode } from "jwt-decode";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import axios from "axios";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Setting = () => {
  const Token = localStorage.getItem("token");
  const userDetails = jwtDecode(Token);

  const [userDetail, setUserDetails] = useState();
  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const validationSchema = yup.object().shape({
    currentPassword: yup.string().required("Current password is required"),
    newPassword: yup
      .string()
      .required("New password is required")
      .min(6, "Password must be at least 6 characters long"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      let response = await axios.get(
        `http://localhost:3005/auth/user/${userDetails.id}`
      );
      setUserDetails(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const onSubmit = async (data) => {
    try {
      await axios.put(
        `http://localhost:3005/auth/updatepass/${userDetails.id}`,
        data
      );

      reset();

      toast.success("Password Updated successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } catch (error) {
      console.log(error);
      let errormsg = error.response.data.msg;
      console.log(errormsg);

      toast.error(errormsg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <>
      <div className="text-3xl mb-5 font-semibold">Setting</div>
      <div>
        <div>
          <img className="w-28 rounded-full" src={admin} alt="Admin" />
        </div>
        <div className="flex gap-5 mt-4">
          <div className="flex flex-col gap-[2px] w-[175px] border-r pr-5">
            <label className="font-bold">Name</label>
            <span>
              {userDetail?.fname} {userDetail?.lname}
            </span>
          </div>

          <div className="flex flex-col gap-[2px]">
            <label className="font-bold">Email</label>
            <span>{userDetail?.email}</span>
          </div>
        </div>

        <div className="flex gap-5 mt-2">
          <div className="flex flex-col gap-[2px] w-[175px] border-r pr-5">
            <label className="font-bold">Phone Number</label>
            <span>{userDetail?.phone}</span>
          </div>

          <div className="flex flex-col gap-[2px]">
            <label className="font-bold">Role</label>
            <span>{userDetail?.role}</span>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Change Password</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 max-w-md"
        >
          <div>
            <label className="block font-bold mb-2" htmlFor="currentPassword">
              Current Password <span className="text-[red]">*</span>
            </label>
            <div className="relative">
              <input
                type={showPasswords.currentPassword ? "text" : "password"}
                id="currentPassword"
                {...register("currentPassword")}
                className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:shadow-md"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("currentPassword")}
                className="absolute inset-y-0 right-3 flex items-center text-gray-600"
              >
                {showPasswords.currentPassword ? (
                  <IoEyeOutline />
                ) : (
                  <IoEyeOffOutline />
                )}
              </button>
            </div>
            {errors.currentPassword && (
              <p className="text-red-500 text-sm">
                {errors.currentPassword.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-bold mb-2" htmlFor="newPassword">
              New Password <span className="text-[red]">*</span>
            </label>
            <div className="relative">
              <input
                type={showPasswords.newPassword ? "text" : "password"}
                id="newPassword"
                {...register("newPassword")}
                className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:shadow-md"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("newPassword")}
                className="absolute inset-y-0 right-3 flex items-center text-gray-600"
              >
                {showPasswords.newPassword ? (
                  <IoEyeOutline />
                ) : (
                  <IoEyeOffOutline />
                )}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-red-500 text-sm">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password <span className="text-[red]">*</span>
            </label>
            <div className="relative">
              <input
                type={showPasswords.confirmPassword ? "text" : "password"}
                id="confirmPassword"
                {...register("confirmPassword")}
                className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:shadow-md"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirmPassword")}
                className="absolute inset-y-0 right-3 flex items-center text-gray-600"
              >
                {showPasswords.confirmPassword ? (
                  <IoEyeOutline />
                ) : (
                  <IoEyeOffOutline />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Update Password
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Setting;
