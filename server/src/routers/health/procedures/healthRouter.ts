import { router } from "../../../trpc";
import getHealth from "./getHealth";

const healthRouter = router({
  getHealth
});

export default healthRouter;