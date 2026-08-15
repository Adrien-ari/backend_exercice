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
}

export const studentsController = new StudentsController();