import Link from "next/link";
import { withSession } from "../middlewares/session";
import { useRouter } from "next/router";

const Home = ({ user }) => {
  const router = useRouter();

  const onLogout = async (e) => {
    e.preventDefault();

    try {
      const result = await fetch("/api/logout", {
        method: "POST",
      });
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <title>
        Shopporo
      </title>
      <h1>Home</h1>
      {user ? (
        <p>
          Hello {user.user_nicename}, have a nice day ! Maybe you want to{" "}
          <a href="/api/logout" onClick={onLogout}>
            logout ?
          </a>
        </p>
      ) : (
        <p>
          Hello guest, maybe you want to{" "}
          <Link href="/login">
            <a>login ?</a>
          </Link>
        </p>
      )}

      <Link href="/login">
        <a>Login</a>
      </Link>
    </div>
  );
};

export const getServerSideProps = withSession((context) => {
  const { req } = context;
  return {
    props: {
      user: req.session.get("user") || null,
    },
  };
});

export default Home;
