import { NavLink, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { motion } from "framer-motion";
import { loginSchema } from "../../schema/validationSchema"; // Yup schema for login

export const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-300 via-pink-300 to-indigo-400 p-4">
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
          Welcome Back
        </h1>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={async (values, { setSubmitting, setStatus }) => {
            try {
              // 👇 ADD THIS LINE HERE
              console.log("Login values:", values);

              setStatus(null);
              const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values)
              });
              const data = await res.json();

              if (!res.ok) {
                setStatus({ error: data.message || "Login failed ❌" });
                return;
              }
              // ✅ Save token
              localStorage.setItem("token", data.token);

              setStatus({ success: "Login successful 🎉" });

              setTimeout(() => navigate("/"), 1000);

            } catch (err) {
              setStatus({ error: "Server error ❌" });
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, status }) => (
            <Form className="space-y-5">
              {/* Email */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
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
                  className="mt-1 text-sm bg-red-500/20 backdrop-blur-sm border-l-4 border-red-700 text-red-900 px-3 py-2 rounded-md shadow-sm"
                />
              </motion.div>

              {/* Password */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 rounded-xl
                             bg-white/30 text-white placeholder-white/70
                             focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="mt-1 text-sm bg-red-500/20 backdrop-blur-sm border-l-4 border-red-700 text-red-900 px-3 py-2 rounded-md shadow-sm"
                />
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 rounded-xl
                           bg-gradient-to-r from-purple-500 to-pink-500
                           text-white font-semibold hover:opacity-90 transition"
              >
                {isSubmitting ? "Logging in..." : "Login"}
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
          Don’t have an account?{" "}
          <NavLink to="/register" className="underline text-yellow-300 hover:text-white">
            Register here
          </NavLink>
        </p>
      </motion.div>
    </div >
  );
};
