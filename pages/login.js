import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { withSession } from "../middlewares/session";
import Link from "next/link";
import LayoutAuth from "../components/layouts/LayoutAuth";

const login = ({ user }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const result = await fetch(`/api/login`, {
        method: "POST",
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result == "User not found." ? null : router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LayoutAuth title="Shopporo | Login">
      <div className="p-20 w-screen flex flex-col-reverse md:flex-row items-center justify-center bg-gray-200">
        <div className="lg:w-1/2 text-3xl text-center md:text-left">
          <h1 className="text-5xl text-blue-500 font-bold">Shopporo</h1>
          <p>Buy high quality products from all around the world.</p>
        </div>
        <div className="lg:w-1/2 container mx-auto flex flex-col items-center">
          <form className="shadow-lg w-96 p-4 flex flex-col bg-white rounded-lg"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input className="mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500"
              name="username"
              type="text"
              placeholder="Username"
              {...register("username", { required: true })}
            />
            <input className="mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500"
              name="password"
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
            />
            <button className="w-full bg-primary text-white p-3 rounded-lg font-semibold text-lg"
              type="submit"
            >Login</button>
            <a className="text-blue-400 text-center my-2">Forgot Pasword?</a>
            <hr />
            <Link href="/register">
              <button className="w-full bg-secondary mt-8 mb-4 text-white p-3 rounded-lg font-semibold text-lg">Register</button>
            </Link>
          </form>
          <p className="text-center text-gray-500 text-xs">
            &copy;2020 Shopporo. All rights reserved.
          </p>
          {/* <p className="text-center text-sm my-4">
          <span className="font-semibold text-center w-full">Create a Page</span> for a celebrity, band or business
        </p> */}
        </div>
        {/* <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        /> */}
      </div>
    </LayoutAuth>
  );
};

export const getServerSideProps = withSession((context) => {
  const { req } = context;
  // console.log(req.session.get("user") + " - test page login");
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

export default login;
