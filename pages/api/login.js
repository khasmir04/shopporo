import nc from "next-connect";
import { sessionMiddleware } from "../../middlewares/session";

export default nc()
  .use(sessionMiddleware)
  .post(async (req, res) => {
    const { username, password } = req.body;

    try {
      // Login User
      const result = await fetch(
        `${process.env.BACKEND_URL}/?rest_route=/simple-jwt-login/v1/auth`,
        {
          method: "POST",
          body: JSON.stringify({
            username: username,
            password: password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const user = await result.json();

      // Check token after loggin in
      if (!user.data.jwt) {
        return "User not found.";
      }

      // Get User Details
      const userInfo = await fetch(
        `${process.env.BACKEND_URL}/?rest_route=/simple-jwt-login/v1/auth/validate`,
        {
          method: "GET",
          headers: {
            "Authorization": `${user.data.jwt}`
          }
        },
      );
      const userDetails = await userInfo.json();

      // Saving and passing data
      req.session.set("user", userDetails);
      await req.session.save();
      res.json(userDetails);

    } catch (error) {
      const { response: fetchResponse } = error;
      if (fetchResponse) {
        return res
          .status(fetchResponse?.status || 500)
          .json(error.response?.data);
      }
      res.status(500).json(error);
    }
  });
