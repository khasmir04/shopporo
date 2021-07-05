import nc from "next-connect";
import { sessionMiddleware } from "../../middlewares/session";

export default nc()
  .use(sessionMiddleware)
  .post(async (req, res) => {
    const { username, password } = req.body;

    try {
      const result = await fetch(
        // `${process.env.BACKEND_URL}/wp-json/jwt-auth/v1/token`,
        `${process.env.BACKEND_URL}/?rest_route=/simple-jwt-login/v1/auth`,
        {
          method: "POST",
          body: JSON.stringify({
            // Username of a user on the WordPress website in which the REST API request
            // is being made to.
            username: username,
            // And the above user's password.
            password: password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const user = await result.json();

      if (!user.data.jwt) {
        // return res.status(401).json({
        //   statusCode: 401,
        //   message: "Token not confirmed",
        // });
        return "User not found.";
      }

      const userInfo = await fetch(
        `${process.env.BACKEND_URL}/?rest_route=/simple-jwt-login/v1/auth/validate`,
        {
          method: "GET",
          headers: {
            "Authorization": `${user.data.jwt}`
          }
        },
      );

      req.session.set("user", userInfo);

      await req.session.save();

      res.json(userInfo);
    } catch (error) {
      console.log(error);
      const { response: fetchResponse } = error;
      if (fetchResponse) {
        return res
          .status(fetchResponse?.status || 500)
          .json(error.response?.data);
      }
      res.status(500).json(error);
    }
  });
