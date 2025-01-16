// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";
// import ExamsApi from "../../services/ExamsApi";
// import { LoaderCircle } from "lucide-react";
// import { Button } from "@/components/ui/button"

// const Test = () => {
//   const navigate = useNavigate();
//     const {id:examId} = useParams()
//   const [exam, setExam] = useState(null); 
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Index de la question actuelle
//   const [selectedAnswers, setSelectedAnswers] = useState([]); // Réponses sélectionnées
//   const [loading, setLoading] = useState(true);
//   const [isCalculScore, setIsCalulScore] = useState(false)

//   useEffect(() => {
//     ExamsApi.getExam(examId)
//       .then((response) => {
//         setExam(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Erreur lors du chargement de l'examen :", error);
//         setLoading(false);
//       });
//   }, [examId]);

//   // Gérer la sélection de réponse
//   const handleAnswerSelect = (answerId) => {
//     const questionId = exam.questions[currentQuestionIndex].id;

//     // Ajouter la réponse sélectionnée
//     setSelectedAnswers((prevAnswers) =>{
//         const existingAnsewerIndex = prevAnswers.findIndex(
//           (item)=>item.question_id == questionId
//         )

//         if(existingAnsewerIndex !== -1){
//           const updateAnswers = [...prevAnswers]
//           updateAnswers[existingAnsewerIndex] = {
//             question_id : questionId,
//             selected_option_id: answerId
//           }
//           return updateAnswers
//         }else{
//           return [
//             ...prevAnswers,
//             { question_id: questionId, selected_option_id: answerId },
//           ]
//         }

//     });

//     // Passer à la question suivante
//     // if (currentQuestionIndex + 1 < exam.questions.length) {
//     //   setCurrentQuestionIndex(currentQuestionIndex + 1);
//     // } else {
//     //   // Toutes les questions sont terminées
//     //   submitAnswers();
//     // }
//   };

//   // Soumettre les réponses
//   const submitAnswers = () => {
//       setIsCalulScore(true)
//       ExamsApi.sendAnsewers(examId, selectedAnswers)
//       .then((response) => {
//         const score = response.data.score
//         const total = response.data.total
//         setIsCalulScore(false)
//        //alert(`Votre score : ${response.data.score} / ${response.data.total}`);
//        navigate('/results', { state: { score, total } });

//       })
//       .catch((error) => {
//         setIsCalulScore(false)
//         console.error("Erreur lors de la soumission :", error);
//       });
//   };

//   const onValidier = ()=>{
//     const questionId = exam.questions[currentQuestionIndex].id;
//     // Passer à la question suivante
//     if (currentQuestionIndex + 1 < exam.questions.length) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     } else {
//       // Toutes les questions sont terminées
//       submitAnswers();
//     }

//   }


//   if (loading) {
//     return <p className='flex justify-center items-center w-full h-[80vh]'>
//     <LoaderCircle className={"animate-spin"}/>
//     </p>;
//   }

//   if (isCalculScore) {
//     return <p className='flex justify-center items-center w-full backdrop-blur-sm h-[80vh]'>
//     <LoaderCircle className={"animate-spin"}/>On Calculer Score
//     </p>;
//   }


//   if (!exam || exam.questions.length === 0) {
//     return <p>Aucune question trouvée pour cet examen.</p>;
//   }


//   const currentQuestion = exam.questions[currentQuestionIndex];

//   return (
//     <div>
//       <div className="w-full text-center p-4 shadow border rounded">
//           {exam.title}
//           <p>{exam.description}</p>
//       </div>
     

//       <div className="w-full flex p-4 shadow border rounded mt-5">
//         <div className="w-1/2">
//           Question {currentQuestionIndex + 1}/{exam.questions.length}
//           <p>{currentQuestion.question}</p>
//         </div>

//         <div className="w-1/2 border-l-2 pl-4">
//           {currentQuestion.answers.map((answer) => 
//             {
//               const exists = selectedAnswers.some(item => item.selected_option_id === answer.id);
//               return <div onClick={() => handleAnswerSelect(answer.id)} className={`${exists && "!bg-green-500"} p-4 shadow rounded border bg-slate-100 hover:cursor-pointer m-4`} key={answer.id}>
//                           {answer.answer}
//                       </div>
//             }
//           )}
//         </div>

//       </div>
//       <div  className="w-full text-center mt-5">
//         <Button onClick={()=>onValidier()}>Validier</Button>
//       </div>
//     </div>
//   );
// };

// export default Test;
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ExamsApi from "../../services/ExamsApi";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { STUDENT_EXAM_ROUTE } from "../../router";

const Test = () => {
  const navigate = useNavigate();
  const { id: examId } = useParams();
  const [exam, setExam] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCalculScore, setIsCalculScore] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0); // Temps restant en secondes

  useEffect(() => {
    ExamsApi.getExam(examId)
      .then((response) => {
        console.log(response.status);
        
        if(response.status == 200 ){
          setExam(response.data);
          if (response.data.duration > 0) {
            setTimeRemaining(response.data.duration * 60); // Convertir la durée en secondes
          }
          setLoading(false);
        }
      })
      .catch((error) => {
        // console.error("Erreur lors du chargement de l'examen :", error);
        
        if(error.status == 400){
          alert("Ce exam ne acceceble")
          navigate(STUDENT_EXAM_ROUTE)
        }
        setLoading(false);
      });
  }, [examId]);

  // Gérer le chronomètre
  useEffect(() => {
    if (exam?.duration > 0 && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeRemaining === 0 && exam?.duration > 0) {
      submitAnswers(); // Soumettre automatiquement les réponses lorsque le temps est écoulé
    }
  }, [timeRemaining, exam]);

  // Convertir le temps restant en format mm:ss
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  // Gérer la sélection de réponse
  const handleAnswerSelect = (answerId) => {
    const questionId = exam.questions[currentQuestionIndex].id;

    setSelectedAnswers((prevAnswers) => {
      const existingAnswerIndex = prevAnswers.findIndex(
        (item) => item.question_id === questionId
      );

      if (existingAnswerIndex !== -1) {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingAnswerIndex] = {
          question_id: questionId,
          selected_option_id: answerId,
        };
        return updatedAnswers;
      } else {
        return [
          ...prevAnswers,
          { question_id: questionId, selected_option_id: answerId },
        ];
      }
    });
  };

  // Soumettre les réponses
  const submitAnswers = () => {
    setIsCalculScore(true);
    ExamsApi.sendAnsewers(examId, selectedAnswers)
      .then((response) => {
        const score = response.data.score;
        const total = response.data.total;
        setIsCalculScore(false);
        navigate("/results", { state: { score, total } });
      })
      .catch((error) => {
        setIsCalculScore(false);
        console.error("Erreur lors de la soumission :", error);
      });
  };

  const onValidier = () => {
    if (currentQuestionIndex + 1 < exam.questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
     
    } else {
      submitAnswers();
    }
  };

  if (loading) {
    return (
      <p className="flex justify-center items-center w-full h-[80vh]">
        <LoaderCircle className={"animate-spin"} />
      </p>
    );
  }

  if (isCalculScore) {
    return (
      <p className="flex justify-center items-center w-full backdrop-blur-sm h-[80vh]">
        <LoaderCircle className={"animate-spin"} /> On Calculer Score
      </p>
    );
  }

  if (!exam || exam.questions.length === 0) {
    return <p>Aucune question trouvée pour cet examen.</p>;
  }

  const currentQuestion = exam.questions[currentQuestionIndex];

  return (
    <div>
      <div className="w-full text-center p-4 shadow border rounded sticky top-20 bg-white">
        <h2>{exam.title}</h2>
        {/* <p>{exam.description}</p> */}
        
        {exam.duration > 0 && (
          <p className="text-red-500 font-bold">Temps restant : {formatTime(timeRemaining)}</p>
        )}
      </div>

      <div className="w-full flex max-sm:flex-col p-4 shadow border rounded mt-5">
        <div className="w-1/2 flex items-center justify-center flex-col max-sm:w-full">
          <p className="underline">
            Question {currentQuestionIndex + 1}/{exam.questions.length}
          </p>
          <p className="text-center">{currentQuestion.question}</p>
          {
          currentQuestion.image != null && <p className="m-4 lg:w-[30rem] border border-1 shadow-2xl">
            <img src={import.meta.env.VITE_BACKEND_URL + `/storage/${currentQuestion.image}`} alt="" />
          </p>
        }
        </div>

        <div className="w-1/2 lg:border-l-2 pl-4  max-sm:w-full">
          {currentQuestion.answers.map((answer) => {
            const exists = selectedAnswers.some(
              (item) => item.selected_option_id === answer.id
            );
            return (
              <div
                onClick={() => handleAnswerSelect(answer.id)}
                className={`${
                  exists && "!bg-green-500"
                } p-4 shadow rounded border bg-slate-100 hover:cursor-pointer m-4`}
                key={answer.id}
              >
                {answer.answer}
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full text-center mt-5">
        <Button onClick={() => onValidier()}>Valider</Button>
      </div>
    </div>
  );
};

export default Test;
