import { useFormik } from "formik";
import * as Yup from "yup";
import { FaPaperPlane, FaRegEnvelope } from "react-icons/fa";
import { assets } from "../../assets/assets";

const NewsLetter = () => {
  const formik = useFormik({});

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
          className="flex md:flex-row flex-col gap-3 items-center"
        >
          <div className="space-y-2 w-full">
            <input
              type="text"
              className="border border-light w-full indent-3 h-[50px] rounded-lg focus:outline-0 focus:shadow-sm placeholder:text-sm placeholder:text-light/80 text-light"
              placeholder="Enter your name"
              name="fullName"
              id="fullName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="space-y-2 w-full">
            <input
              type="email"
              className="border border-light w-full indent-3 h-[50px] rounded-lg focus:outline-0 focus:shadow-sm placeholder:text-sm placeholder:text-light/80 text-light"
              placeholder="Enter your email"
            />
          </div>
          <button
            type="submit"
            disabled={!formik.isValid || formik.isSubmitting}
            className="rounded-lg bg-primary h-[50px] md:w-max w-full px-4 text-base text-light cursor-pointer flex items-center justify-center gap-2 disabled:cursor-not-allowed"
          >
            <span>Subscribe</span>
            <FaPaperPlane className="text-lg" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsLetter;
