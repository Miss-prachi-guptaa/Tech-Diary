import { useNavigate, NavLink } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { motion } from "framer-motion";
import { registerSchema } from "../../schema/validationSchema";
import { postRegister } from "../../api/blog.api";

export const Register = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-dvh flex items-start lg:items-center justify-center
      bg-gradient-to-br from-[#02140d] via-[#041f16] to-black
      px-4 sm:px-6 lg:px-8
      overflow-y-auto relative"
    >
      {/* Green glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-400/10 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="
          relative w-full max-w-sm sm:max-w-md
          mt-10 lg:mt-0
          p-6 sm:p-8 rounded-2xl
          bg-white/10 backdrop-blur-2xl
          border border-white/20
          shadow-[0_0_60px_rgba(16,185,129,0.35)]
        "
      >
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-semibold text-center text-white">
          Create Account
        </h1>
        <p className="text-center text-white/60 text-xs sm:text-sm mt-1 mb-6">
          Join Blogify & start writing
        </p>

        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={registerSchema}
          onSubmit={async (values, { setSubmitting, setStatus, resetForm }) => {
            try {
              setStatus(null);



              const res = await postRegister(values);

              // axios success → directly res.data
              setStatus({ success: res.data.message || "Account created successfully" });

              resetForm();
              setTimeout(() => navigate("/login"), 1000);
            } catch (error) {
              const message =
                error.response?.data?.message ||
                "Registration failed";

              setStatus({ error: message });
            } finally {
              setSubmitting(false);
            }
          }}

        >
          {({ isSubmitting, status }) => (
            <Form className="space-y-4">
              {/* Name */}
              <div>
                <Field
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className="
                    w-full px-4 py-3 rounded-xl
                    bg-white/10 text-white placeholder-white/50
                    border border-white/20
                    focus:outline-none focus:ring-2 focus:ring-emerald-400
                  "
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-xs text-red-400 mt-1"
                />
              </div>

              {/* Email */}
              <div>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="
                    w-full px-4 py-3 rounded-xl
                    bg-white/10 text-white placeholder-white/50
                    border border-white/20
                    focus:outline-none focus:ring-2 focus:ring-emerald-400
                  "
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-xs text-red-400 mt-1"
                />
              </div>

              {/* Password */}
              <div>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="
                    w-full px-4 py-3 rounded-xl
                    bg-white/10 text-white placeholder-white/50
                    border border-white/20
                    focus:outline-none focus:ring-2 focus:ring-emerald-400
                  "
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-xs text-red-400 mt-1"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="
                    w-full px-4 py-3 rounded-xl
                    bg-white/10 text-white placeholder-white/50
                    border border-white/20
                    focus:outline-none focus:ring-2 focus:ring-emerald-400
                  "
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-xs text-red-400 mt-1"
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="
                  w-full mt-3 py-3 rounded-xl
                  bg-gradient-to-r from-emerald-500 to-green-500
                  text-white font-semibold
                  shadow-lg shadow-emerald-500/40
                "
              >
                {isSubmitting ? "Creating..." : "Create Account"}
              </motion.button>

              {/* Status */}
              {status?.error && (
                <p className="text-center text-red-400 text-sm mt-2">
                  {status.error}
                </p>
              )}
              {status?.success && (
                <p className="text-center text-green-400 text-sm mt-2">
                  {status.success}
                </p>
              )}
            </Form>
          )}
        </Formik>

        {/* Footer */}
        <p className="text-center text-white/60 text-xs sm:text-sm mt-6">
          Already have an account?{" "}
          <NavLink to="/login" className="text-emerald-400 hover:underline">
            Login here
          </NavLink>
        </p>
      </motion.div>
    </div>
  );
};
