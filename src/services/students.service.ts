import { Students } from "../model/studentsTable";
import { StudentsRepository } from "../repository/studentsRepository";

export class studentService {
        private repo = new StudentsRepository();
     getAll = async ():Promise<Students[]> => {

        let result =  await this.repo.findAll();
        return result;
    }
    getByID = async (id:number):Promise<Students> => {

        let result = await this.repo.getById(id);
        return result;
    }

    postStudent = async(first_name: string, last_name:string, date_of_birth:string, address: string, email:string): Promise<Students> =>{
         const existingStudent =
            await this.repo.findByEmail(email);

        if (existingStudent) {
            throw new Error("Email is already registered");
        }

        if (new Date(date_of_birth) > new Date()) {
            throw new Error("Date of birth cannot be in the future");
        }

        return await this.repo.postStudent(first_name,last_name,date_of_birth,address,email);
        
    }
    
}