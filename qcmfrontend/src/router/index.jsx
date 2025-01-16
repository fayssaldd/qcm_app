import { createBrowserRouter } from "react-router-dom";
import StudentLayout from "../layouts/student/StudentLayout";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Exams from "../pages/students/Exams";
import ProfLayouts from "../layouts/prof/ProfLayouts";
import Qcm from "../pages/students/Qcm";
import Test from "../pages/students/Test";
import Results from "../pages/students/Results";
import Login from "../pages/porfs/Login";
import ExamsProf from "../pages/porfs/ExamsProf";
import GuestLayout from "../layouts/GuestLayout";
import ExamProf from "../pages/porfs/ExamProf";
export const STUDENT_EXAM_ROUTE = "/students/exams";
export const PROF_EXAM_ROUTE = "/profs/exams";
export const router = createBrowserRouter([
    {
        element: <StudentLayout/>,
        children:[
            {
                path:'/',
                element: <Home/>
            },
            {
                path:'/results',
                element: <Results/>
            },
            {
                path: STUDENT_EXAM_ROUTE,
                element: <Exams/>
            },  
            {
                path:`${STUDENT_EXAM_ROUTE}/:id`,
                element: <Test/>
            }
            
        ]
    },
    {
        element: <ProfLayouts/>,
        children:[
            // {
            //     path:'/profs',
            //     element: <h1>I'm Prof</h1>
            // },
            {
                path:PROF_EXAM_ROUTE,
                element: <ExamsProf/>
            },
            {
                path:PROF_EXAM_ROUTE + '/:id',
                element: <ExamProf/>
            },
        ]
    },
    {
        element: <GuestLayout/>,
        children:[
            {
                path:'/login',
                element: <Login/>
            },
        ]
    },

    {
        path:'*',
        element: <NotFound/>
    }
])