import { useNavigate, NavLink } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { motion } from "framer-motion";
import { registerSchema } from "../../schema/validationSchema";

export const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md p-10 rounded-3xl
                   bg-white/20 backdrop-blur-xl
                   border border-white/30
                   shadow-2xl"
      >
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Create Account
        </h1>

        <Formik
          initialValues={{ name: "", email: "", password: "", confirmPassword: "" }}
          validationSchema={registerSchema}
          onSubmit={async (values, { setSubmitting, setStatus, resetForm }) => {
            try {
              const res = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
              });
              const data = await res.json();
              if (!res.ok) {
                setStatus({ error: data.message || "Registration failed ❌" });
                return;
              }
              setStatus({ success: "Registration successful 🎉" });
              resetForm();
              console.log("Mock API Response:", data);

              setTimeout(() => navigate("/login"), 1000);
            } catch (error) {
              setStatus({ error: "Something went wrong ❌" });
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, status }) => (
            <Form className="space-y-5">
              {/* Name */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Field
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className="w-full px-4 py-3 rounded-xl
                             bg-white/30 text-white placeholder-white/70
                             focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="mt-1 text-sm
             bg-red-500/20 backdrop-blur-sm
             border-l-4 border-red-700
             text-red-900 px-3 py-2
             rounded-md shadow-sm"
                />
              </motion.div>

              {/* Email */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Field
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 rounded-xl
                             bg-white/30 text-white placeholder-white/70
                             focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="mt-1 text-sm
             bg-red-500/20 backdrop-blur-sm
             border-l-4 border-red-700
             text-red-900 px-3 py-2
             rounded-md shadow-sm"
                />
              </motion.div>

              {/* Password */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 rounded-xl
                             bg-white/30 text-white placeholder-white/70
                             focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="mt-1 text-sm
             bg-red-500/20 backdrop-blur-sm
             border-l-4 border-red-700
             text-red-900 px-3 py-2
             rounded-md shadow-sm"
                />
              </motion.div>

              {/* Confirm Password */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.35 }}
              >
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="w-full px-4 py-3 rounded-xl
               bg-white/30 text-white placeholder-white/70
               focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="mt-1 text-sm
      bg-red-500/20 backdrop-blur-sm
      border-l-4 border-red-700
      text-red-900 px-3 py-2
      rounded-md shadow-sm"
                />
              </motion.div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 rounded-xl
                           bg-gradient-to-r from-pink-500 to-purple-500
                           text-white font-semibold hover:opacity-90 transition"
              >
                {isSubmitting ? "Registering..." : "Register"}
              </motion.button>

              {/* Status messages */}
              {status && status.success && (
                <p className="text-center text-white mt-4">{status.success}</p>
              )}
              {status && status.error && (
                <p className="text-center text-white mt-4">{status.error}</p>
              )}
            </Form>
          )}
        </Formik>

        <p className="text-center text-white/80 mt-6">
          Already have an account?{" "}
          <NavLink to="/" className="underline text-yellow-300 hover:text-white">
            Login here
          </NavLink>
        </p>
      </motion.div>
    </div>
  );
};
