import { Router } from "express";
import {studentsController} from "../../controllers/studentsController";

const Studentsroute = Router();

Studentsroute.get('/', studentsController.getAllUsers);
Studentsroute.get('/:id', studentsController.getStudentById);

export default Studentsroute;