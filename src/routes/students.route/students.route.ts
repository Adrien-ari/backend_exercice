import { Router } from "express";
import {studentsController} from "../../controllers/studentsController";

const Studentsroute = Router();

Studentsroute.use('/', studentsController.getAllUsers);

export default Studentsroute;