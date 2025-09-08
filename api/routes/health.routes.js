import { Router } from "express";
import { db_connection } from "../config/db.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: health
 *     description: Basic service checks
 */

router.get("/", (req, res) => {
  res.send("server is running");
});
/**
 * @swagger
 * /health:
 *   get:
 *     summary: Liveness check
 *     description: Returns 200 when the process is running and can serve HTTP.
 *     tags: [health]
 *     responses:
 *       200:
 *         description: Service is up.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 */
//checking liveness -> HTTP works
router.get("/health", (req, res) => {
  res.status(200).send({ status: "ok" });
});

/**
 * @swagger
 * /ready:
 *   get:
 *     summary: Readiness check
 *     description: Returns 200 when the database is reachable; 503 otherwise.
 *     tags: [health]
 *     responses:
 *       200:
 *         description: Ready to accept traffic.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ready
 *       503:
 *         description: A dependency is not available.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: not-ready
 *                 error:
 *                   type: string
 *                   example: db-unreachable
 */
//checking readyness -> DB is ready
router.get("/ready", async (_req, res) => {
  try {
    // lightweight query
    const [rows] = await db_connection().query("SELECT 1 AS ok");
    if (rows?.[0]?.ok === 1) {
      return res.status(200).json({ status: "ready" });
    }
    //not ready
    return res.status(503).json({ status: "not-ready" });
  } catch (err) {
    // db not reachable or pool not created
    console.error("READY CHECK DB ERROR:", err?.code, err?.message);
    return res
      .status(503)
      .json({ status: "not-ready", error: "db-unreachable" });
  }
});
export default router;
