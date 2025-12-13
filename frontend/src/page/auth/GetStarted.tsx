import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { motion } from "motion/react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
};

const GetStarted = () => {
  return (
    <motion.div
      className="grid sm:grid-cols-1 lg:grid-cols-2 items-center justify-center bg-purple-100 min-h-screen w-full"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Logo */}
      <motion.div className="flex justify-center" variants={itemVariants}>
        <motion.img
          src="/logo/logo.png"
          alt="logo"
          initial={{ opacity: 0, scale: 0.8, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="sm:w-20 sm:h-20 md:w-60 md:h-60 lg:w-80 lg:h-80"
        />
      </motion.div>

      {/* Buttons + Social Login */}
      <motion.div
        className="flex flex-col justify-center items-center space-y-8"
        variants={containerVariants}
      >
        <div className="flex flex-col space-y-4 w-full items-center">
          {/* Sign In */}
          <motion.div
            variants={itemVariants}
            className="w-full flex justify-center"
          >
            <Button
              asChild
              className="btn w-3/4 bg-purple-900 text-white hover:bg-purple-700"
            >
              <Link to="/login">Sign In</Link>
            </Button>
          </motion.div>

          {/* Sign Up */}
          <motion.div
            variants={itemVariants}
            className="w-full flex justify-center"
          >
            <Button
              asChild
              className="btn w-3/4 bg-white border border-purple-800 text-purple-800 hover:bg-gray-300"
            >
              <Link to="/register">Sign Up</Link>
            </Button>
          </motion.div>

          {/* Admin */}
          <motion.div
            variants={itemVariants}
            className="w-full flex justify-center"
          >
            <Button asChild className="btn w-3/4 bg-purple-900 text-white">
              <Link to="#">Sign In as Admin</Link>
            </Button>
          </motion.div>
        </div>

        {/* Social Login */}
        <motion.div
          className="flex flex-col space-y-2 items-center"
          variants={itemVariants}
        >
          <h2>Or Login with</h2>

          <div className="flex flex-row justify-center gap-8">
            {/* Google */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 250 }}
              className="flex justify-center items-center bg-white rounded-md cursor-pointer 
              p-1 w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 lg:p-2 shadow-sm hover:shadow-lg"
            >
              <Link to="">
                <img
                  src="/logo/google.png"
                  alt="google"
                  className="w-5 h-5 md:w-7 md:h-7 lg:w-10 lg:h-10"
                />
              </Link>
            </motion.div>

            {/* Facebook */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 250 }}
              className="flex justify-center items-center bg-white rounded-md cursor-pointer 
              p-1 w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 lg:p-2 shadow-sm hover:shadow-lg"
            >
              <Link to="/fb-screen">
                <img
                  src="/logo/fb.png"
                  alt="fb"
                  className="w-6 h-6 md:w-9 md:h-9 lg:w-12 lg:h-12"
                />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default GetStarted;
