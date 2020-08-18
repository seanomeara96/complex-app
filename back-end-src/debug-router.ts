import express, { Request, Response } from "express";
const router = express.Router();

router.get("/test", (req: Request, res: Response) => {
  res.send("test");
});
router.post("/test", (req: Request, res: Response) => {
  res.json(req.body);
});

export default router;
