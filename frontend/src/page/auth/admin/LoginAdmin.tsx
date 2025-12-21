import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { motion } from "framer-motion";

// icons
import { Eye, EyeOff, Mail, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const formSchema = z.object({
  email: z.string().email({ message: "Email is invalid" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

// Variants for staggered animation
const parentVariant = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const childVariant = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const LoginAdmin = () => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-purple-100 mt-4">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex flex-col justify-center items-center  py-4"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-roboto">
          Citra Admin
        </h1>
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="text-sm sm:text-sm md:text-2xl font-extralight text-gray-600"
        >
          Glad To See You Again!
        </motion.h3>
      </motion.div>

      {/* MAIN CONTENT */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT — Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="hidden lg:flex flex-1 justify-center items-center"
        >
          <motion.img
            src="/logo/logo.png"
            alt="Logo"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="max-h-full object-contain"
          />
        </motion.div>

        {/* RIGHT — Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="flex flex-col flex-2 justify-center p-8 overflow-y-auto"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <motion.div
                variants={parentVariant}
                initial="hidden"
                animate="show"
              >
                <CardContent className="space-y-8 rounded-md">
                  {/* Email */}
                  <motion.div variants={childVariant} className="space-y-5">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            <h1 className="text-lg sm:text-xl font-medium text-gray-500 pl-1">
                              Email
                            </h1>
                          </FormLabel>
                          <FormControl>
                            <div className="relative bg-white/80 rounded-md border-gray-600 border-2">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                              <Input
                                className="pl-10"
                                placeholder="Enter your email"
                                type="email"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  {/* Password */}
                  <motion.div variants={childVariant}>
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            <h1 className="text-lg sm:text-xl font-medium text-gray-500 pl-1">
                              Password
                            </h1>
                          </FormLabel>
                          <FormControl>
                            <div className="relative bg-white/80 rounded-md border-gray-600 border-2">
                              <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                              <Input
                                className="h-10 pl-10"
                                placeholder="Enter your Password"
                                type={showPassword ? "text" : "password"}
                                {...field}
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                              >
                                {showPassword ? (
                                  <Eye size={20} />
                                ) : (
                                  <EyeOff size={20} />
                                )}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Link
                      to="/forgot-password"
                      className="font-light pl-3 hover:text-gray-500"
                    >
                      Forgot password?
                    </Link>
                  </motion.div>

                  {/* Login Button */}
                  <motion.div
                    variants={childVariant}
                    className="flex justify-center"
                  >
                    <Button
                      asChild
                      className="w-full sm:w-3/4 md:w-1/2 lg:w-full bg-purple-900 text-xl h-12 font-light hover:bg-purple-800"
                    >
                      <Link to="/admin">Login</Link>
                    </Button>
                  </motion.div>

                  {/* Sign Up */}
                  <motion.div
                    variants={childVariant}
                    className="flex justify-center"
                  >
                    <h2>
                      Don't have an account?
                      <Link
                        to="/register-admin"
                        className="text-blue-500 font-medium pl-1 hover:text-blue-700"
                      >
                        Sign Up
                      </Link>
                    </h2>
                  </motion.div>

                  {/* SOCIAL LOGIN */}
                  <motion.div
                    variants={childVariant}
                    className="grid grid-rows-2 justify-center gap-2"
                  >
                    <div className="flex justify-center">
                      <h3>Or Login With</h3>
                    </div>
                    <div className="flex justify-center gap-5">
                      {/* Google */}
                      <motion.a
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        href="#"
                        className="rounded-md bg-white shadow-md w-12 h-12 flex justify-center items-center"
                      >
                        <img
                          src="/logo/google.png"
                          alt="google"
                          className="w-8 h-8"
                        />
                      </motion.a>

                      {/* Facebook */}
                      <motion.div
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link
                          to="/fb-screen"
                          className="rounded-md bg-white shadow-md w-12 h-12 flex justify-center items-center"
                        >
                          <img
                            src="/logo/fb.png"
                            alt="facebook"
                            className="w-12 h-12"
                          />
                        </Link>
                      </motion.div>
                    </div>
                  </motion.div>
                </CardContent>
              </motion.div>
            </form>
          </Form>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginAdmin;
