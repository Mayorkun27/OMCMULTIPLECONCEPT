import React, { useEffect } from "react";
import MiniHerosection from "../../components/MiniHerosection";
import { assets } from "../../assets/assets";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { showToast } from "../../utilities/toast"; 

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email Address is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await axios.post(
          "/api/login", 
          values,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        // Success toast
        showToast("success", "Login Successful! Welcome back.");
        console.log("Login success:", response.data);

        localStorage.setItem("token", response.data.token);

        setTimeout(() => navigate("/"), 1200);
      } catch (error) {
        console.error("Login error:", error);

        // Error toast
        const message =
          error.response?.data?.message ||
          "Unable to login. Please check your credentials.";
        showToast("error", message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div>
      <MiniHerosection
        title={"Log In"}
        subText={
          "Log back into your account to see your orders and get a more enhanced experience."
        }
        bgStyle={{
          background: `linear-gradient(135deg, #000000ba, #000000ba), url(${assets.newsimg4})`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
        }}
      />

      <div className="made-container pt-20 lg:pb-20">
        <div className="grid grid-cols-12 gap-y-8 lg:gap-x-8">
          {/* LEFT IMAGE SIDE */}
          <div className="md:col-span-5 col-span-12 lg:max-h-[450px] md:max-h-[350px] w-full rounded-2xl overflow-hidden shadow-md relative">
            <img
              src={assets.checkimg}
              alt="Welcome"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 lg:p-8 md:p-8 p-4 bg-gradient-to-b from-black/0 to-black/80 flex flex-col justify-center">
              <h3 className="font-bold tracking-wide md:text-6xl text-3xl drop-shadow-xl text-white">
                Welcome Back.
              </h3>
            </div>
          </div>

          {/* RIGHT FORM SIDE */}
          <form
            onSubmit={formik.handleSubmit}
            className="md:col-span-7 col-span-12 rounded-2xl bg-white shadow-md md:p-8 p-6 flex flex-col items-start justify-center gap-6"
          >
            <div className="flex flex-col gap-1 w-full">
              <label
                className="font-[Montserrat] font-medium"
                htmlFor="email"
              >
                Enter your Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="border border-primary indent-2 rounded-md outline-0 py-2"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-600 text-sm">{formik.errors.email}</p>
              )}
            </div>

            <div className="flex flex-col gap-1 w-full">
              <label
                className="font-[Montserrat] font-medium"
                htmlFor="password"
              >
                Enter your Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="current-password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="border border-primary indent-2 rounded-md outline-0 py-2"
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-600 text-sm">
                  {formik.errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting}
              className="rounded-lg bg-primary h-[50px] w-full px-4 text-base text-light cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {formik.isSubmitting ? "Logging in..." : "Log In"}
            </button>

            <div>
              <p>
                Don’t have an account?{" "}
                <Link to="/register" className="text-primary">
                  Register here.
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
