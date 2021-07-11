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

      const wpResult = await fetch(
        `${process.env.BACKEND_URL}/wp-json/jwt-auth/v1/token`,
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
      // console.log(result);

      const wpUser = await wpResult.json();
      const user = await result.json();

      // const user = {
      //   ...wpUser,
      //   ...sjlUser,
      // };

      // Check token after loggin in
      if (user.success) {
        // Get User Details
        const userInfo = await fetch(
          `${process.env.BACKEND_URL}/?rest_route=/simple-jwt-login/v1/auth/validate`,
          {
            method: "GET",
            headers: {
              Authorization: `${user.data.jwt}`,
            },
          }
        );
        const userDetails = await userInfo.json();

        const mergedUser = {
          ...wpUser,
          ...userDetails,
        };

        // Saving and passing data
        req.session.set("user", mergedUser);
        await req.session.save();
        res.json(mergedUser);
      } else {
        // res.json(user);
        req.session.set("user", user);
        await req.session.save();
        res.json(user);
      }
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
