import { router } from "../../trpc";
import createUser from "./procedures/createUser";
import login from "./procedures/login";

const authRouter = router({
  // add procs here
  login,
  createUser
});

export default authRouter;