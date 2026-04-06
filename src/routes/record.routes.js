import { Router } from "express";
import { 
  createRecord, 
  getRecords, 
  updateRecord, 
  deleteRecord 
} from "../controllers/record.controller.js";
import { authenticateToken } from "../middleware/auth.js";
import { authorizeRoles } from "../middleware/role.js";

const router = Router();


router.use(authenticateToken);


router.get("/", authorizeRoles("ANALYST", "ADMIN"), getRecords);


router.post("/", authorizeRoles("ADMIN"), createRecord);
router.put("/:id", authorizeRoles("ADMIN"), updateRecord);
router.delete("/:id", authorizeRoles("ADMIN"), deleteRecord);

export default router;