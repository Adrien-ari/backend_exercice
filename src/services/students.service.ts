import { Result } from "pg";
import { Students } from "../model/studentsTable";
import { StudentsRepository } from "../repository/studentsRepository";

export class studentService {
        private repo = new StudentsRepository();
     getAll = async ():Promise<Students[]> => {
        // const repo = new StudentsRepository();
        let result =  await this.repo.findAll();
        return result;
    }
    getByID = async (id:number):Promise<Students> => {
        //const repo = new StudentsRepository();
        let result = await this.repo.getById(id);
        return result;
    }

    postStudent = async(first_name: string, last_name:string, date_of_birth:string, address: string): Promise<Students> =>{
        let result = await this.repo.postStudent(first_name,last_name,date_of_birth,address);
        return result;
    }
    
}