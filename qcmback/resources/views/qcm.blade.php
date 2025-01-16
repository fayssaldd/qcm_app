<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QCM - {{ $exam->title }}</title>
    <style>
        .exam-info {
            background-color: #ecf0f1;
            border: 1px solid #bdc3c7;
            padding: 10px;
            /* margin-bottom: 20px; */
            border-radius: 5px;
        }
        .question {
             /* border-bottom: 1px solid #bdc3c7; */
            /* padding-bottom: 10px; */ 
            margin-bottom: 0px;
        }
        .question h5{
            margin-bottom: 0px;
        }
        .answers ul {
            list-style: none;
            padding: 0px;
            margin-bottom: 0px;
           
        }
        .answers li {
            /* margin-bottom: 5px; */
            display: flex;
            align-items: center;
            color: #2c3e50;
        }
        .answers label {
            display: flex;
            align-items: center;
            cursor: pointer;
        }
        .answers input[type="checkbox"] {
            width: 18px;
            height: 18px;
            margin-right: 10px;
            accent-color: #3498db; /* Couleur des cases cochées */
        }
    </style>
    
</head>
<body>
    <h2>Examen QCM : {{ $exam->title }}</h2>
    <div class="exam-info">
        <p><strong>Professeur :</strong> {{ $exam->user->name }}</p>
        <p><strong>Description :</strong> {{ $exam->description }}</p>
        <p><strong>Durée :</strong> {{ $temps }} </p>
    </div>

    @foreach ($exam->questions as $key => $question)
        <div class="question">
            <h5>Question {{ $key + 1 }} : {{ $question->question }}</h5>
            @if ($question->image_url)
                <div  class="image">
                    <img src="{{ public_path("storage/$question->image_url") }}" style="width: 100%; max-width: 200px; margin-top: 10px;" alt="Image de la question">
                </div>
            @endif
            
            @if ($question->answers->isNotEmpty())
            <div class="answers">
                <ul>
                    @foreach ($question->answers as $answer)
                        <li>
                            <label>
                                <input type="checkbox" style="margin-right: 10px;"> 
                                {{ $answer->answer }}
                            </label>
                        </li>
                    @endforeach
                </ul>
            </div>
            
            @endif
        </div>
    @endforeach

    <footer>
        <p>Examen généré automatiquement le {{ now()->format('d/m/Y') }}.</p>
    </footer>
</body>
</html>
