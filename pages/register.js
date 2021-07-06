import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { withSession } from "../middlewares/session";
import LayoutAuth from "../components/layouts/LayoutAuth";
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
        `${process.env.BACKEND_URL}/?rest_route=/simple-jwt-login/v1/users&AUTH_KEY=testing`,
        {
          method: "POST",
          body: JSON.stringify({
            // username: data.username,
            // email: data.email,
            // password: data.password,
            user_login: data.username,
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
      <LayoutAuth title="Shopporo | Register">
        <div className="flex items-center justify-center p-14">
          <div className="w-full max-w-md">
            <div className="flex items-center justify-center mb-4">
              <h4 className="text-3xl">Create an account</h4>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="shadow-lg w-96 p-4 flex flex-col bg-white rounded-lg mx-auto"
            >
              {/* NEW DESIGN */}
              <input className="mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500"
                name="username"
                type="text"
                placeholder="Username"
                {...register("username", { required: true })}
              />
              {errors.username && (
                <span className="text-red-300">Username is required</span>
              )}
              <input className="mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500"
                name="email"
                type="email"
                placeholder="Email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-red-300">Email is required</span>
              )}
              <input className="mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500"
                name="password"
                type="password"
                placeholder="Password"
                {...register("password", { required: true })}
              />
              {errors.email && (
                <span className="text-red-300">Password is required</span>
              )}
              <button className="w-full bg-primary text-white p-3 rounded-lg font-semibold text-lg"
                type="submit"
              >Register</button>
              <div className="text-blue-400 text-center my-2">Already have an account?</div>
              <hr />
              <Link href="/login">
                <button className="w-full bg-secondary mt-4 mb-4 text-white p-3 rounded-lg font-semibold text-lg">Login</button>
              </Link>
            </form>
            <p className="text-center text-gray-500 text-xs">
              &copy;2020 Shopporo. All rights reserved.
            </p>
          </div>
        </div>
      </LayoutAuth>
    </>
  );
};

export const getServerSideProps = withSession((context) => {
  const { req } = context;

  if (req.session.get("user") && req.session.get("user").data.jwt[0].token) {
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
