import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { withSession } from "../middlewares/session";
import Link from "next/link";

const register = ({ user }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const result = await fetch(
        // `${process.env.BACKEND_URL}/wp-json/wp/v2/users/register`,
        `${process.env.BACKEND_URL}/?rest_route=/simple-jwt-login/v1/users`,
        {
          method: "POST",
          body: JSON.stringify({
            // username: data.username,
            // email: data.email,
            // password: data.password,
            AUTH_KEY: "testing",
            email: data.email,
            password: data.password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      alert("successful registration");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4"
          >
            <div className="text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4">
              Ecommerce Register
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-normal mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                name="username"
                type="text"
                placeholder="Username"
                {...register("username", { required: true })}
              />
              {errors.username && (
                <span className="text-red-300">Username is required</span>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-normal mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                name="email"
                type="email"
                placeholder="email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-red-300">email is required</span>
              )}
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-normal mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                placeholder="Password"
                name="password"
                {...register("password", {
                  required: true,
                })}
              />
              {errors.password?.type === "required" && (
                <span className="text-red-300">Password is required</span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <button
                className="px-4 py-2 rounded text-white inline-block shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700"
                type="submit"
              >
                Register
              </button>
              <Link href="/login">
                <a className="inline-block align-baseline font-normal text-sm text-blue-500 hover:text-blue-800">
                  Log In
                </a>
              </Link>
            </div>
          </form>
          <p className="text-center text-gray-500 text-xs">
            &copy;2020 Ecommerce. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = withSession((context) => {
  const { req } = context;

  if (req.session.get("user") && req.session.get("user").token) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }

  return {
    props: {
      user: req.session.get("user") || null,
    },
  };
});

export default register;
