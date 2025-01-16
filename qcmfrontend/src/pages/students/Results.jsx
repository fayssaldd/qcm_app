import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { STUDENT_EXAM_ROUTE } from '../../router';

export default function Results({ score, total }) {
    const location = useLocation()
  
    return (
      <div className="w-full h-screen max-sm:h-[70vh] max-sm:p-4 flex flex-col items-center justify-center bg-gray-100">
        <div className="bg-white p-8 shadow rounded text-center">
          <h1 className="text-2xl font-bold mb-4">Résultats de l'examen</h1>
  
          <p className="text-lg mb-4">Vous avez obtenu un score de :</p>
          <div className="text-4xl font-bold text-green-500 mb-4">
            {location.state.score} / {location.state.total}
          </div>
  
          <div className="mt-4 flex justify-center gap-4">
            <Link
              className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
              to={STUDENT_EXAM_ROUTE}
            >
              Refaire l'examen
            </Link>
            <Link
              className="px-4 py-2 bg-gray-500 text-white rounded shadow hover:bg-gray-600"
              to={'/'}
            >
             page principale
            </Link>
          </div>
        </div>
      </div>
    );
}
