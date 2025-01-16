<?php

namespace App\Http\Controllers;

use App\Http\Resources\ExamResource;
use App\Models\Answer;
use App\Models\Exam;
use App\Models\Question;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
class ExamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $exams = Exam::with(['questions.answers' => function ($query) {
        //     $query->select('id', 'answer');
        // }])->get();
        $exams = Exam::where("isShow",true)->with(['questions.answers' => function ($query) {
            // Optionnel: vous pouvez ajouter des conditions ici pour sélectionner les réponses spécifiques
            $query->select('id', 'question_id', 'answer'); // Exclure 'is_correct' si vous ne voulez pas l'inclure
        }])->get();

        return response()->json(ExamResource::collection($exams));
    }

    public function examsforporf(){
        $user = auth()->user();

        $exams = Exam::where("user_id",$user->id)
                    ->with(['questions.answers'])->get();
        return response()->json($exams,200);
    }
    public function examforporf($id){
        $user = auth()->user();

        $exams = Exam::where('id',$id)->where("user_id",$user->id)
                    ->with(['questions.answers'])->get();
        return response()->json($exams,200);
    }


    public function submitAnswers(Request $request){
        $answers = $request->input('answers');
        $score = 0;
        $total = count($answers);

        foreach ($answers as $answer) {
            $question = Question::find($answer['question_id']);
            $selectedOption = Answer::find($answer['selected_answer_id']);

            // Vérifier si l'option sélectionnée est correcte (en utilisant 'is_correct')
            if ($question && $selectedOption && $selectedOption->is_correct) {
                $score++;
            }
        }

        return response()->json([
            'score' => $score,
            'total' => $total,
        ]);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'duration' => 'required|integer',
        ]);
        $exam = Auth::user()->exams()->create([
            'title' => $request->title,
            'description' => $request->description,
            'duration' => $request->duration,
        ]);
        return response()->json($exam, 201);

    }

     // Ajouter une question à un examen
     public function addQuestion(Request $request, $examId)
     {
        $validatedData = $request->validate([
             'question' => 'required|string',
             'image_url' => 'sometimes|image'
        ]);
        if ($request->hasFile('image_url')) {
            $validatedData['image_url'] = $request->file('image_url')->store('questions','public');
        }
         $exam = Exam::findOrFail($examId);
 
         $question = $exam->questions()->create($validatedData);
 
         return response()->json($question, 201);
     }
 
     // Ajouter une réponse à une question
     public function addAnswer(Request $request, $questionId)
     {
         $request->validate([
             'answer' => 'required|string',
             'is_correct' => 'required|boolean',
         ]);
 
         $question = Question::findOrFail($questionId);
 
         $answer = $question->answers()->create([
             'answer' => $request->answer,
             'is_correct' => $request->is_correct,
         ]);
 
         return response()->json($answer, 201);
     }
     public function submit(Request $request, $id)
     {
         $exam = Exam::with('questions.answers')->find($id);
     
         if (!$exam) {
             return response()->json(['message' => 'Examen introuvable'], 404);
         }
     
         $answers = $request->input('answers');
         $score = 0;
         $total = count($exam->questions);
     
         foreach ($answers as $answer) {
             $question = $exam->questions->firstWhere('id', $answer['question_id']);
             if ($question) {
                 $correctAnswer = $question->answers->firstWhere('is_correct', 1);
                 if ($correctAnswer && $correctAnswer->id == $answer['selected_option_id']) {
                     $score++;
                 }
             }
         }
     
         return response()->json([
             'score' => $score,
             'total' => $total,
         ]);
     }
     
     
    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // $exams = Exam::with(['questions.answers' => function ($query) {
        //     // Optionnel: vous pouvez ajouter des conditions ici pour sélectionner les réponses spécifiques
        //     $query->select('id', 'question_id', 'answer'); // Exclure 'is_correct' si vous ne voulez pas l'inclure
        // }])->get();
        $exam = Exam::findOrFail($id);
        
        if($exam->isShow){
            return response()->json(new ExamResource($exam));
        }else{
            return response()->json(["message" => "il ne pas exam pour ce id"],400);
        }
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Exam $exam)
    {
        //
    }

    public function setIsShow(Request $request, $id){
        $request->validate([
            'isShow' => 'required',
        ]);

        $exam = Exam::find($id);
        $exam->isShow = $request->isShow;
        $exam->save();
        return response()->json(new ExamResource($exam),200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Exam $exam)
    {
        $exam->delete();
        return response()->json(null,204);
    }

    public function destroySelected(Request $request){
        $selectedIds = $request->selectedIds;
        Exam::whereIn('id',$selectedIds)->delete();
        return response()->json(['message' => 'Selected Products deleted successfully'], 204);
    }


    public function exampdf ($id) {
        $exam = Exam::with('questions.answers')->findOrFail($id); // Charge les données nécessaires
        $hours  = floor($exam->duration / 60);
        $remainingMinutes = $exam->duration % 60;
        $temps = sprintf("%dH%02dmin", $hours, $remainingMinutes);
        $pdf = PDF::loadView('qcm', compact('exam','temps')) ->setPaper('a4', 'portrait'); ;
         return $pdf->download('QCM_' . $exam->title . '.pdf');
        // return view("qcm",compact('exam'));
    }
}
