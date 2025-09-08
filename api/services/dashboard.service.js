import { db_connection } from "../config/db.js";

export async function listDashboards() {
    //quering the db, getting all dashboads in assending order respect to ids 
  const [rows] = await db_connection().query(
    "SELECT * FROM dashboards ORDER BY id ASC"
  );

  //return all rows
  return rows;
}
