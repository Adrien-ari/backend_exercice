import { Pool } from "pg";
import dotenv from "dotenv";
import { Students } from "../model/studentsTable";
dotenv.config();

export const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER || "postgres",
  password: process.env.PGPASSWORD,
  database: process.env.PGNAME,
  port: parseInt(process.env.PGPORT || "5432"),
});

export class StudentsRepository {
  findAll = async (): Promise<Students[]> => {
    const students = await pool.query<Students>("select * from students");
    return students.rows;
  };
  getById = async (id: number): Promise<Students> => {
    const student = await pool.query<Students>(
      `select * from students where id = ${id}`,
    );
    return student.rows[0] || null;
  };
  postStudent = async (
    first_name: string,
    last_name: string,
    date_of_birth: string,
    address: string,
    email:string
  ): Promise<Students> => {
    const sql = `
    INSERT INTO students (first_name, last_name, date_of_birth, address)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
    try {
      const values = [first_name, last_name, date_of_birth, address, email];
      const anotherResult = await pool.query<Students>(sql, values);
      return anotherResult.rows[0];
    } catch (error) {
      console.log("erreur sql");
    }
    throw new Error("runtime error");
  };

  async findByEmail(email: string) {
    const result = await pool.query("SELECT * FROM students WHERE email = $1", [
      email,
    ]);

    return result.rows[0] ?? null;
  }
}
