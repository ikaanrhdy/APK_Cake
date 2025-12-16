import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router";

// UI
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

// icons
import { Eye, EyeOff, Mail, LockKeyhole, User, Phone } from "lucide-react";

// motion
import { m, LazyMotion, domAnimation } from "motion/react";

// ======================
// VALIDATION SCHEMA
// ======================
const formSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters long" }),
    email: z.string().email({ message: "Email is invalid" }),
    phoneNumber: z.string().min(10, { message: "Phone number is invalid" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z.string().min(6, {
      message: "Confirm password must be at least 6 characters long",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const RegisterAdmin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  // Stagger variant untuk form fields
  const formVariant = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  };

  const fieldVariant = {
    hidden: { opacity: 0, y: 15 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 120 },
    },
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.div className="flex flex-col min-h-screen w-full bg-purple-100 gap-2">
        {/* HEADER */}
        <m.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col justify-center items-center py-6"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-roboto">
            Create Account As Admin
          </h1>
        </m.div>

        {/* MAIN CONTENT */}
        <div className="flex flex-col md:flex-row flex-1">
          {/* LEFT SECTION (DESKTOP ONLY) */}
          <div className="hidden lg:flex flex-1 justify-center items-center p-4">
            <m.img
              src="/logo/logo.png"
              alt="Logo"
              className="max-h-[70%] w-auto object-contain"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 12,
                delay: 0.2,
              }}
            />
          </div>

          {/* RIGHT SECTION - FORM */}
          <div className="flex flex-col flex-2 justify-center p-8 overflow-y-auto">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-4">
                  <m.div
                    variants={formVariant}
                    initial="hidden"
                    animate="show"
                    className="space-y-3"
                  >
                    {/* NAME */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <m.div variants={fieldVariant}>
                            <FormLabel>
                              <h1 className="text-lg font-medium text-gray-500 pl-1">
                                Name
                              </h1>
                            </FormLabel>
                            <FormControl>
                              <div className="relative bg-white/80 rounded-md border-2 border-gray-600">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                <Input
                                  placeholder="Enter your Username"
                                  className="pl-10"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </m.div>
                        </FormItem>
                      )}
                    />

                    {/* EMAIL */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <m.div variants={fieldVariant}>
                            <FormLabel>
                              <h1 className="text-lg font-medium text-gray-500 pl-1">
                                Email
                              </h1>
                            </FormLabel>
                            <FormControl>
                              <div className="relative bg-white/80 rounded-md border-2 border-gray-600">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                <Input
                                  placeholder="Enter your email"
                                  type="email"
                                  className="pl-10"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </m.div>
                        </FormItem>
                      )}
                    />

                    {/* PHONE */}
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <m.div variants={fieldVariant}>
                            <FormLabel>
                              <h1 className="text-lg font-medium text-gray-500 pl-1">
                                Phone Number
                              </h1>
                            </FormLabel>
                            <FormControl>
                              <div className="relative bg-white/80 rounded-md border-2 border-gray-600">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                <Input
                                  placeholder="Enter your phone number"
                                  className="pl-10"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </m.div>
                        </FormItem>
                      )}
                    />

                    {/* PASSWORD */}
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <m.div variants={fieldVariant}>
                            <FormLabel>
                              <h1 className="text-lg font-medium text-gray-500 pl-1">
                                Password
                              </h1>
                            </FormLabel>
                            <FormControl>
                              <div className="relative bg-white/80 rounded-md border-2 border-gray-600">
                                <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                <Input
                                  placeholder="Enter your Password"
                                  type={showPassword ? "text" : "password"}
                                  className="pl-10"
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
                          </m.div>
                        </FormItem>
                      )}
                    />

                    {/* CONFIRM PASSWORD */}
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <m.div variants={fieldVariant}>
                            <FormLabel>
                              <h1 className="text-lg font-medium text-gray-500 pl-1">
                                Confirm Password
                              </h1>
                            </FormLabel>
                            <FormControl>
                              <div className="relative bg-white/80 rounded-md border-2 border-gray-600">
                                <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                <Input
                                  placeholder="Confirm your Password"
                                  type={showConfirm ? "text" : "password"}
                                  className="pl-10"
                                  {...field}
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowConfirm(!showConfirm)}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                                >
                                  {showConfirm ? (
                                    <Eye size={20} />
                                  ) : (
                                    <EyeOff size={20} />
                                  )}
                                </button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </m.div>
                        </FormItem>
                      )}
                    />

                    {/* TERMS */}
                    <m.div
                      variants={fieldVariant}
                      className="flex items-center gap-3 mb-2 pt-3"
                    >
                      <Checkbox
                        id="terms"
                        className="bg-gray-300 border-2 border-gray-400 w-4 h-4"
                      />
                      <Label htmlFor="terms">
                        <span className="font-medium">
                          I agree to the Terms of Service and Privacy Policy
                        </span>
                      </Label>
                    </m.div>
                  </m.div>

                  {/* SUBMIT BUTTON */}
                  <m.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="flex justify-center"
                  >
                    <Button className="w-full bg-purple-900 h-12 text-lg hover:bg-purple-800 shadow-xl">
                      Register
                    </Button>
                  </m.div>

                  {/* LOGIN LINK */}
                  <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="flex justify-center"
                  >
                    <h2>
                      Already have an account?
                      <Link
                        to="/login-admin"
                        className="text-blue-500 pl-1 hover:text-blue-700 font-medium"
                      >
                        Log In
                      </Link>
                    </h2>
                  </m.div>
                </CardContent>
              </form>
            </Form>
          </div>
        </div>
      </m.div>
    </LazyMotion>
  );
};

export default RegisterAdmin;
