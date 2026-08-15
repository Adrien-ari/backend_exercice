import { studentService } from "../services/students.service";
import { Request,Response,NextFunction } from "express";
export class StudentsController{
    getAllUsers = async (req:Request, res:Response, next:NextFunction) => {
        try{
        let studentsSvc = new studentService();
        const result = await studentsSvc.getAll();
        res.status(200).json(result);
        }catch(err){
            next(err);
        }
    }

    getStudentById = async (req: Request, res: Response, next: NextFunction) => {
        
        try {
            console.log(req.params.id);
            const id = parseInt(req.params.id);
            const stdSvc = new studentService();
            const result = await stdSvc.getByID(id);
            res.status(200).json(result);

        } catch (error) {
            next(error)
        }
    }
}

export const studentsController = new StudentsController();