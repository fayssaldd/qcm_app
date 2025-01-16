<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class QuestionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'exam_id' => $this->exam_id,
            'question' => $this->question, // Remplacez `question` par le nom exact de votre colonne dans la table `questions`
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'image'=>$this->image_url,
            'answers' => AnswerResource::collection($this->answers), // Utiliser la ressource des réponses
        ];
    }
}
