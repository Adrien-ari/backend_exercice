import { Pool } from "pg";
import dotenv from "dotenv";
import { Students } from "../model/studentsTable";
dotenv.config()

export const pool = new Pool({
    host: process.env.PGHOST ,
    user: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD,
    database: process.env.PGNAME,
    port: parseInt(process.env.PGPORT || '5432')
})

export class StudentsRepository {
     findAll = async (): Promise<Students[]> => {
        const students = await pool.query<Students>("select * from students");
        return students.rows;
    }
    }

