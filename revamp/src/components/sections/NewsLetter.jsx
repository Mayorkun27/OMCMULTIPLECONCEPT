import { useFormik } from "formik";
import * as Yup from "yup";
import { FaPaperPlane, FaRegEnvelope } from "react-icons/fa";
import { assets } from "../../assets/assets";
import api from "../../api";
import { toast } from "sonner";

const NewsLetter = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await api.call("/subscribe", "POST", values);
        console.log("response", response)
        if (response.status === 200) {
          toast.success("Thank you for subscribing!");
          resetForm();
        } else {
          toast.error(response.data.message || "Subscription failed. Please try again.");
        }
      } catch (error) {
        toast.error(typeof error === "string" && error || error?.response?.data?.message || error.message || "An error occurred. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="made-container">
      <div
        className="w-full space-y-6 mb-10 z-2 lg:mt-0 lg:mb-16 mt-24 md:p-8 p-4 rounded-xl"
        style={{
          background: `linear-gradient(135deg, #000000a4, #000000a4), url(${assets.newsimg4})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h3 className="flex gap-2 items-center text-xl text-light">
          <FaRegEnvelope className="text-xl" />
          <span className="font-[Montserrat]! font-medium!">Subscribe to Newsletter</span>
        </h3>

        <form
          onSubmit={formik.handleSubmit}
          className={`flex md:flex-row flex-col gap-3 ${!formik.isValid ? "items-start" : "items-center"}`}
        >
          <div className="space-y-2 w-full">
            <input
              type="text"
              className={`border w-full indent-3 h-[50px] rounded-lg focus:outline-0 focus:shadow-sm placeholder:text-sm text-light bg-transparent ${formik.touched.name && formik.errors.name ? 'border-2 border-red-600' : 'border-light'}`}
              placeholder="Enter your name"
              name="name"
              id="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-300 text-xs">{formik.errors.name}</div>
            ) : null}
          </div>
          <div className="space-y-2 w-full">
            <input
              type="email"
              className={`border w-full indent-3 h-[50px] rounded-lg focus:outline-0 focus:shadow-sm placeholder:text-sm text-light bg-transparent ${formik.touched.email && formik.errors.email ? 'border-2 border-red-600' : 'border-light'}`}
              placeholder="Enter your email"
              name="email"
              id="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-300 text-xs">{formik.errors.email}</div>
            ) : null}
          </div>
          <button
            type="submit"
            disabled={!formik.isValid || formik.isSubmitting}
            className="rounded-lg bg-primary h-[50px] md:w-max w-full px-4 text-base text-light cursor-pointer flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span>{formik.isSubmitting ? "Subscribing..." : "Subscribe"}</span>
            <FaPaperPlane className="text-lg" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsLetter;
