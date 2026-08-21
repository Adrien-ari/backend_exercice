import { Router } from "express";
import Studentsroute from "./students.route/students.route";

const routerIndex = Router();

routerIndex.use('/students', Studentsroute);

export default routerIndex;