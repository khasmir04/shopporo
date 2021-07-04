import nc from "next-connect";
import { sessionMiddleware } from "../../middlewares/session";

export default nc()
  .use(sessionMiddleware)
  .post(async (req, res) => {
    req.session.destroy();
    res.send();
  });
