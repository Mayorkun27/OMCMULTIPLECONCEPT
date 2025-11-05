import React, { useEffect, useState } from "react";
import MiniHerosection from "../../components/MiniHerosection";
import { assets } from "../../assets/assets";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { showToast } from "../../utilities/toast"; 


const Register = () => {
  const navigate = useNavigate();
  const [serverErrors, setServerErrors] = useState({});

  useEffect(() => {
    window.scroll(0, 0);
  }, []);



  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email address is required"),
      phone: Yup.string()
        .matches(/^[0-9]+$/, "Phone number must contain digits only")
        .min(10, "Phone number must be at least 10 digits")
        .required("Phone number is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .required("Password confirmation is required")
        .oneOf([Yup.ref("password"), null], "Passwords do not match"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setServerErrors({});
      try {
        const response = await axios.post(
          "/api/register",
          {
            name: `${values.firstName} ${values.lastName}`,
            email: values.email,
            phone: values.phone,
            password: values.password,
            password_confirmation: values.confirmPassword,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        if (response.status === 200 || response.status === 201) {
            showToast("success", "Registration successful!");
          resetForm();

          setTimeout(() => navigate("/login"), 1500);
        }
      } catch (error) {
        console.error(error);
        if (error.response && error.response.data.errors) {
          setServerErrors(error.response.data.errors);
          Toast.fire({
            icon: "error",
            title: "Please check your input and try again.",
          });
        } else if (error.response && error.response.data.message) {
          Toast.fire({
            icon: "error",
            title: error.response.data.message,
          });
        } else {
          Toast.fire({
            icon: "error",
            title: "Network error. Please try again later.",
          });
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div>
      <MiniHerosection
        title={"Register"}
        subText={
          "Register here with OMC to get an enhanced personalized experience."
        }
        bgStyle={{
          background: `linear-gradient(135deg, #000000ba, #000000ba), url(${assets.newsimg4})`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
        }}
      />

      <div className="made-container pt-20 lg:pb-20">
        <div className="grid grid-cols-12 gap-y-8 lg:gap-x-8">
          {/* LEFT IMAGE */}
          <div className="md:col-span-5 col-span-12 lg:max-h-[450px] md:max-h-[350px] max-h-40 w-full rounded-2xl overflow-hidden shadow-md relative">
            <img
              src={assets.checkimg3}
              alt="Wall painting"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 lg:p-8 md:p-8 p-4 bg-gradient-to-b from-black/0 to-black/80 flex flex-col justify-center">
              <h3 className="font-bold tracking-wide md:text-6xl text-3xl text-white drop-shadow-xl font-[Montserrat]">
                Create an Account.
              </h3>
            </div>
          </div>

          {/* FORM */}
          <form
            onSubmit={formik.handleSubmit}
            className="md:col-span-7 col-span-12 grid md:grid-cols-2 grid-cols-1 rounded-2xl bg-white shadow-md md:p-8 p-6 gap-x-4 gap-y-6"
          >
            {/* FIRST NAME */}
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="firstName" className="font-[Montserrat] font-medium">
                Enter your First name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
                className="border border-primary indent-2 rounded-md outline-0 py-2"
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <p className="text-red-600 text-sm">{formik.errors.firstName}</p>
              )}
            </div>

            {/* LAST NAME */}
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="lastName" className="font-[Montserrat] font-medium">
                Enter your Last name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
                className="border border-primary indent-2 rounded-md outline-0 py-2"
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <p className="text-red-600 text-sm">{formik.errors.lastName}</p>
              )}
            </div>

            {/* EMAIL */}
            <div className="flex flex-col gap-1 w-full md:col-span-2">
              <label htmlFor="email" className="font-[Montserrat] font-medium">
                Enter your Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="border border-primary indent-2 rounded-md outline-0 py-2"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-600 text-sm">{formik.errors.email}</p>
              )}
              {serverErrors.email && (
                <p className="text-red-600 text-sm">{serverErrors.email[0]}</p>
              )}
            </div>

            {/* PHONE */}
            <div className="flex flex-col gap-1 w-full md:col-span-2">
              <label htmlFor="phone" className="font-[Montserrat] font-medium">
                Enter your Phone number
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                className="border border-primary indent-2 rounded-md outline-0 py-2"
              />
              {formik.touched.phone && formik.errors.phone && (
                <p className="text-red-600 text-sm">{formik.errors.phone}</p>
              )}
              {serverErrors.phone && (
                <p className="text-red-600 text-sm">{serverErrors.phone[0]}</p>
              )}
            </div>

            {/* PASSWORD */}
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="password" className="font-[Montserrat] font-medium">
                Enter your Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="border border-primary indent-2 rounded-md outline-0 py-2"
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-600 text-sm">{formik.errors.password}</p>
              )}
              {serverErrors.password && (
                <p className="text-red-600 text-sm">{serverErrors.password[0]}</p>
              )}
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="flex flex-col gap-1 w-full">
              <label
                htmlFor="confirmPassword"
                className="font-[Montserrat] font-medium"
              >
                Enter your Password again
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                className="border border-primary indent-2 rounded-md outline-0 py-2"
              />
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <p className="text-red-600 text-sm">
                    {formik.errors.confirmPassword}
                  </p>
                )}
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting}
              className="md:col-span-2 rounded-lg bg-primary h-[50px] w-full px-4 text-base text-light cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {formik.isSubmitting ? "Registering..." : "Register"}
            </button>

            <div className="md:col-span-2 text-sm">
              <p>
                Already have an account?{" "}
                <Link to={"/login"} className="text-primary font-medium">
                  Login here.
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
