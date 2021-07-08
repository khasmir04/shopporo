import nc from "next-connect";
import { sessionMiddleware } from "../../middlewares/session";

export default nc()
  .use(sessionMiddleware)
  .post(async (req, res) => {
    // TOKEN REVOKE
    try {
      let token = req.session.get("user").data.jwt[0].token;
      await fetch(`${process.env.BACKEND_URL}/?rest_route=/simple-jwt-login/v1/auth/revoke`, {
        method: "POST",
        headers: {
          "Authorization": `${token}`
        }
      });
    } catch (error) {
      console.log("Token revocation failed.")
    }
    req.session.destroy();
    res.send();
  });
