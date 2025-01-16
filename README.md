# Application de QCM en Ligne  

Cette application de **QCM (Questionnaire à Choix Multiples)** a été développée en utilisant **React** pour le front-end et **Laravel** pour le back-end. Elle permet aux professeurs de créer des examens, de leur associer des QCM, et offre aux étudiants ou utilisateurs la possibilité de passer ces examens en ligne.  

## Fonctionnalités Principales  

### Pour les Professeurs  
- **Création d'examens** : Les professeurs peuvent créer de nouveaux examens avec un titre, une description et d'autres informations utiles.  
- **Ajout de QCM** : Possibilité d'ajouter des questions de type QCM à chaque examen avec les options de réponses et les réponses correctes.  
- **Téléchargement d'examens** : Génération et téléchargement des examens complets au format PDF.  

### Pour les Étudiants / Utilisateurs  
- **Passation des examens** : Les étudiants peuvent consulter les examens disponibles et y répondre.  
- **Résultats instantanés** : Affichage des scores après la soumission des réponses aux QCM.  

### Fonctionnalités Techniques  
- Interface utilisateur réactive et intuitive grâce à **React**.  
- API puissante et sécurisée avec **Laravel** pour gérer les données des examens, des questions, et des utilisateurs.  
- Génération d'examens en **PDF** pour une consultation hors ligne.  
- Gestion des rôles : Différenciation entre les rôles de "professeur" et "utilisateur".  

## Technologies Utilisées  
- **Frontend** : React.js, Tailwind CSS, Shadcn UI
- **Backend** : Laravel 11  
- **Base de Données** : MySQL  
- **Génération de PDF** : [Laravel DomPDF](https://github.com/barryvdh/laravel-dompdf)  
- **Authentification** : Sanctum  

## Installation  

### Prérequis  
- PHP >= 8.1 avec Composer  
- Node.js >= 18 avec npm ou yarn  
- MySQL ou autre base de données compatible  

### Étapes  
1. Clonez ce dépôt :  
   ```bash  
   git clone https://github.com/fayssaldd/qcm_app.git
   cd qcmapp
2. Installez les dépendances du backend :
  ```bash
   cd qcmback  
   composer install  
   cp .env.example .env  
   php artisan key:generate
3. Configurez la base de données dans le fichier .env du backend.
4. Lancez les migrations et ajoutez des données de base :
   ```bash
   php artisan migrate --seed  
5.Installez les dépendances du frontend :
   ```bash
   cd qcmfrontend  
   npm install  
6. Lancez les serveurs :
   - **Backend*
      ```bash
      php artisan serve  
   - **Frontend*
      ```bash
      npm run dev  
