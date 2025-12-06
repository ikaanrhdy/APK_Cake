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
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";

const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Password must be at least 6 characters long" }),
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
      {/* atas */}
      <div className="flex flex-col justify-center items-center mb-8 mt-8 gap-3">
        <h1 className="text-4xl font-bold">Wellcome Back</h1>
        <h3 className="text-xl font-extralight">Glad To See You Again</h3>
      </div>
      <div className="grid md:grid-rows-3 sm:grid-cols-1">
        {/*bawah  */}
        <div className="grid md:grid-cols-3 sm:grid-cols-1 col-span-2">
          {/* kiri */}
          <div className="hidden md:block justify-center items-center ">
            <img src="/logo/logo.png" alt="" />
          </div>
          {/* kanan */}
          <div className="flex flex-col col-span-2 justify-center p-8 m-4">
            {/* form */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-8">
                  {/* email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium text-gray-500 pl-3">
                          Email
                        </FormLabel>
                        <FormControl className="bg-white/80">
                          <Input
                            placeholder="Enter your email"
                            type="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* password */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium text-gray-500 pl-3">
                          Password
                        </FormLabel>
                        <FormControl className="bg-white/80 rounded-md border-gray-600">
                          <div className="relative">
                            <Input
                              className="h-10"
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
                                <EyeOff size={20} />
                              ) : (
                                <Eye size={20} />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
