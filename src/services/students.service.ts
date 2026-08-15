import { Students } from "../model/studentsTable";
import { StudentsRepository } from "../repository/studentsRepository";

export class studentService{

     getAll = async ():Promise<Students[]> => {
        const repo = new StudentsRepository();
        let result =  await repo.findAll();
        return result;
    }
    getByID = async (id:number):Promise<Students> => {
        const repo = new StudentsRepository();
        let result = await repo.getById(id);
        return result;
    }
    
}