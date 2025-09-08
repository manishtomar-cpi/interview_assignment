import {
  listDashboards,
} from "../services/dashboard.service.js";
import { toIso } from "../utils/toIso.js";

export async function getDashboard(req, res, next) {
  try {
    //getting data from service
    const rows = await listDashboards();

    //check - if no dashboards exists
    if (rows.length === 0) {
      return res.status(200).json([]);
    }

    //cleaning the query response
    const data = rows.map((row) => ({
      id: row.id,
      createdAt: toIso(row.createdAt),
      updatedAt: toIso(row.updatedAt),
      title: row.title,
    }));

    //send the final response in json(array of objects)
    res.status(200).json(data);
  } catch (err) {
    //error middleware handle it
    return next(err);
  }
}
