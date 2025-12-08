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

// icon
import { Eye, EyeOff, Mail, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const formSchema = z.object({
  email: z.string().email({ message: "Email is invalid" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

const Login = () => {
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
    <div className="flex flex-col h-screen w-screen bg-purple-100">
      {/* Header */}
      <div className="flex flex-col justify-center items-center py-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-mono">
          Welcome Back!
        </h1>
        <h3 className="text-lg sm:text-xl md:text-2xl font-extralight">
          Glad To See You Again!
        </h3>
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left - Logo */}
        <div className="hidden md:flex flex-1 justify-center items-center ">
          <img
            src="/logo/logo.png"
            alt="Logo"
            className="max-h-full object-contain"
          />
        </div>

        {/* Right - Form */}
        <div className="flex flex-col flex-2 justify-center p-8  overflow-y-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-8 rounded-md">
                {/* Email */}
                <div className="space-y-5">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <h1 className="text-lg sm:text-xl md:text-xl font-medium text-gray-500 pl-1">
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

                  {/* Password */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <h1 className="text-lg sm:text-xl md:text-xl font-medium text-gray-500 pl-1">
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
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black cursor-pointer"
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

                  <a href="#" className="font-light pl-3 hover:text-gray-500">
                    Forgot password?
                  </a>
                </div>

                {/* Login Button */}
                <div className="flex justify-center">
                  <Button className="w-full sm:w-3/4 md:w-1/2 lg:w-full bg-purple-900 text-base sm:text-lg md:text-xl lg:text-2xl h-12 font-light hover:bg-purple-800 cursor-pointer">
                    Login
                  </Button>
                </div>

                {/* Sign Up */}
                <div className="flex justify-center">
                  <h2>
                    Don't have an account?
                    <Link
                      to="#"
                      className="text-blue-500 font-medium pl-1 hover:text-blue-700"
                    >
                      Sign Up
                    </Link>
                  </h2>
                </div>

                {/* Social login */}
                <div className="grid grid-rows-2 justify-center gap-2">
                  <div className="flex justify-center">
                    <h3>Or Login With</h3>
                  </div>
                  <div className="flex justify-center gap-5">
                    <a
                      href="#"
                      className="rounded-md shadow-md w-12 h-12 justify-center items-center flex"
                    >
                      <img src="/logo/goggle.png" alt="" className="w-8 h-8" />
                    </a>
                    <a
                      href="#"
                      className="rounded-md shadow-md w-12 h-12 items-center justify-center flex"
                    >
                      <img src="/logo/fb.png" alt="" className="w-12 h-12" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
