import { Router } from "express";
import {studentsController} from "../../controllers/studentsController";

const Studentsroute = Router();

Studentsroute.get('/', studentsController.getAllUsers);
Studentsroute.get('/:id', studentsController.getStudentById);
Studentsroute.post('/', studentsController.postStudent)
export default Studentsroute;