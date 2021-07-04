import { withSession } from "../middlewares/session";

const restricted = ({ user }) => {
  return <div>Restricted page</div>;
};

export const getServerSideProps = withSession((context) => {
  const { req } = context;

  if (req.session.get("user") === undefined) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
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

export default restricted;
