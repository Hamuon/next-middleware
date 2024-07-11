"use client";
import React, { useState } from "react";
import Image from "next/image";
import { login } from "@/services/services";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const schema = z.object({
  email: z.string().min(1, { message: "لطفا نام کاربری خود را وارد کنید" }),
  password: z.string().min(1, { message: "لطفا رمز عبور خود را وارد کنید" }),
});

type Props = {
  setAction: (action: string) => void;
};

export default function Login({ setAction }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const submitHandler = async (data: any) => {
    setLoading(true);

    try {
      const res = await login(data);
      cookies.set("token", res.data.token, { path: "/" });
      toast.success("You logged in successfully.", { position: "top-center" });
      router.push("/");

    } catch (err: any) {
      const errorMessage = err.response?.data?.error || "An error occurred";
      toast.error(errorMessage, { position: "top-center" });

    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="w-full">
      <section className="h-screen md:container sm:px-10 mx-auto">
        <div className="flex h-full w-full flex-wrap items-center justify-center">
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
            <Image
              src="/media/security.png"
              width={900}
              height={900}
              alt="Phone Image"
            />
          </div>

          <form
            onSubmit={handleSubmit(submitHandler)}
            className="sm:w-full md:w-8/12 lg:ms-6 lg:w-5/12"
          >
            <div className="relative mb-6">
              <input
                {...register("email")}
                type="text"
                className={`input input-bordered w-full ${errors.email && "input-error"
                  }`}
                placeholder="Email address"
              />
            </div>

            <div className="relative mb-6">
              <input
                {...register("password")}
                type="password"
                className={`input input-bordered w-full ${errors.password && "input-error"
                  }`}
                placeholder="Password"
              />
            </div>

            <div className="mb-6 flex items-center justify-between">
              <div className="mb-[0.125rem] block min-h-[1.5rem] ps-[1.5rem]">
                <input
                  className="relative float-left -ms-[1.5rem] me-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-secondary-500 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ms-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ms-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent rtl:float-right dark:border-neutral-400 dark:checked:border-primary dark:checked:bg-primary"
                  type="checkbox"
                  value=""
                  id="exampleCheck3"
                />
                <label
                  className="inline-block ps-[0.15rem] hover:cursor-pointer"
                  htmlFor="exampleCheck3"
                >
                  Remember me
                </label>
              </div>

              <span
                onClick={() => setAction("signup")}
                className="text-primary focus:outline-none dark:text-primary-400"
              >
                Not signed yet?
              </span>
            </div>

            <button type="submit" className="btn btn-primary w-full">
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
