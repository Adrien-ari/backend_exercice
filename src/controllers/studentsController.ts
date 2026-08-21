import { studentSchema } from "../validators/studentsValidator";
import { studentService } from "../services/students.service";
import { Request, Response, NextFunction } from "express";

export class StudentsController {
  getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let studentsSvc = new studentService();
      const result = await studentsSvc.getAll();
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };

  getStudentById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const stdSvc = new studentService();
      const result = await stdSvc.getByID(id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  postStudent = async (req: Request, res: Response, next: NextFunction) => {
    const result = studentSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        errors: result.error.flatten(),
      });
    }
    try {
      const studentsSvc = new studentService();

      const { first_name, last_name, date_of_birth, address, email } =
        await req.body;

      const result = await studentsSvc.postStudent(
        first_name,
        last_name,
        date_of_birth,
        address,
        email,
      );
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}

export const studentsController = new StudentsController();
