<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ExamController;
use App\Http\Controllers\QuestionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::middleware(['auth:sanctum'])->group(function(){
    Route::post('/logout',[AuthController::class,'logout']);

    
    Route::post('/exams', [ExamController::class, 'store']);
    Route::get('/professor-exams', [ExamController::class, 'examsforporf']); 
    Route::get('/professor-exams/{id}', [ExamController::class, 'examforporf']); 
 
    Route::post('/exams/{examId}/questions', [ExamController::class, 'addQuestion']); 
    Route::post('/questions/{questionId}/answers', [ExamController::class, 'addAnswer']); 
    Route::post('/exams/{id}/setIsShow', [ExamController::class, 'setIsShow']);

    Route::delete('/exams/{exam}',[ExamController::class,'destroy']);
    Route::delete('/questions/{question}',[QuestionController::class,'destroy']);
    Route::delete('/deleteExamsSelected',[ExamController::class,'destroySelected']);

    Route::get('/qcm/{id}',[ExamController::class,'exampdf']);
});


Route::get('/exams', [ExamController::class, 'index']);
Route::post('exams/{id}/submit', [ExamController::class, 'submit']);
Route::get('/exams/{id}', [ExamController::class, 'show']);    
Route::post('/login',[AuthController::class,'login']);