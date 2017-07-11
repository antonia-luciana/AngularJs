var app = angular.module('DotnetProject', []);

app.controller('dashboardController', ['$scope','$filter', function ($scope,$filter) {
           
        
        //begin in plus
        $scope.score = "";
        //end
        $scope.finalTest = '';

        $scope.test = false;
        $scope.profile = true;
        $scope.grades = false;
        $scope.statistics = false;
        $scope.groups = ['A1', 'B1', 'A2', 'C1'];

        $scope.initializare = function () {
            
            $scope.title = "";
            $scope.nrQuestions = "";
            $scope.time = null;
            $scope.year = "";
            $scope.group = "";

            $scope.addQuestions = false;
            $scope.options = false;

            $scope.changePasswordClicked = false;
            $scope.addQuestionsClicked = false;
            $scope.saveChangedPassword = false;

            $scope.questions = [];
            $scope.A = "";
            $scope.B = "";
            $scope.C = "";
            $scope.D = "";

            $scope.statusA = false;
            $scope.statusB = false;
            $scope.statusC = false;
            $scope.statusD = false;

            $scope.validCLass = "";
            $scope.validity_title = true;
            $scope.validity_time = true;
            $scope.validity_nrQuestion = true;
            $scope.validity_year = true;

            $scope.finalizedTest = false;
            
            
            $scope.ceva = ['a', 'b', 'c'];
            
            //$scope.alta = $filter('a')($scope.ceva);

            $scope.alta = [];
            for(var i =0; i<$scope.ceva.length ; i++)
                $scope.alta.push($filter('filter: "a" ')($scope.ceva[i]));
            alert($scope.alta.length);
        };
        //Begin Test POST answer
        function GivenAnswer(id_raspuns,id_score,corect) {
            this.AnswerId = id_raspuns;
            this.ScoreId = id_score;
            this.IsCorrect = corect;
        };
        function Score(student,test,raspunsuri) {
            this.StudentId = student;
            this.TestId = test;
            this.GivenAnswerList = raspunsuri;
        };

        $scope.testPostAnswer = function () {
           // alert('ceva');
           $scope.score = new Test("8", "1", null);
          /* answerService.saveAnswer(
                 $scope.score
                ).then(function () {
                });
        }*/

        $scope.testPostAnswer();
        //END Test POST answer

        $scope.initializare();
    };

        $scope.newTest = function (test, profile, grades) {
            
            if ($scope.finalizedTest === true) {
                $scope.initializare();
            }
            $scope.test = true;
            $scope.profile = false;
            $scope.grades = false;
            $scope.statistics = false;

        };

        $scope.goProfile = function (test, profile, grades) {

            if ($scope.finalizedTest === true) {
                $scope.initializare();
            }
            $scope.profile = true;
            $scope.test = false;
            $scope.grades = false;
            $scope.statistics = false;


        };

        $scope.putGrades = function (test, profile, grades) {
            
            if ($scope.finalizedTest === true) {
                $scope.initializare();
            }
            $scope.grades = true;
            $scope.profile = false;
            $scope.test = false;
            $scope.statistics = false;

        };

        $scope.changePassword = function (oldPassword, newPassword, newPasswordAgain, saveChangedPassword) {
            $scope.changePasswordCliicked = true;
            $scope.saveChangedPassword = true;
            
               
            if ($scope.oldPassword && $scope.newPassword && $scope.newPasswordAgain) {
                    
                //save the password in the database

            }

        };

        $scope.newQuestions = function (addQuestions, testForm, title, nrQuestions, question) {
            $scope.addQuestionsClicked = true;

            if (!$scope.testForm.title.$valid) {
                $scope.validity_title = false;
            } else {
                $scope.validity_title = true;
            }
            if (!($scope.nrQuestions > 0 && $scope.nrQuestions < 50)) {
                $scope.validity_nrQuestion = false;
            } else {
                $scope.validity_nrQuestion = true;
            }
            if (!($scope.time > 0 && $scope.time < 180)) {
                $scope.validity_time = false;
            } else {
                $scope.validity_time = true;
            }
            if (!($scope.year > 0 && $scope.year < 5)) {
                $scope.validity_year = false;
            } else {
                $scope.validity_year = true;
            }
            if ($scope.validity_title && $scope.validity_nrQuestion
                    && $scope.validity_time && $scope.validity_year) {
                $scope.addQuestions = true;
                $('#question').focus();
            }
            //$scope.addQuestions = true;
        };

        $scope.addOptions = function (options) {
            $scope.options = !$scope.options;
        };

        function Answer(X, statusX) {
            this.AnswerText = X;
            this.AnswerCorrect = statusX;
        };

       

        function Question(enunt, A, B, C, D, statusOptions) {
            this.QuestionText = enunt;
            this.AnswerList = [new Answer(A,statusOptions[0]),
                new Answer(B, statusOptions[1]),
                new Answer(C,statusOptions[2]),
                new Answer(D,statusOptions[3])];
        };

        $scope.saveQuestion = function (questions, nrQuestions, question, options, A, B, C, D, statusA, statusB, statusC, statusD) {

            if ($scope.questions.length < $scope.nrQuestions) {


                $scope.questions.push(new Question($scope.question, $scope.A, $scope.B, $scope.C, $scope.D,
                            [$scope.statusA, $scope.statusB, $scope.statusC, $scope.statusD]));



                $scope.options = false;
                $scope.question = '';
                $scope.A = '';
                $scope.B = '';
                $scope.C = '';
                $scope.D = '';
                $scope.statusA = false;
                $scope.statusB = false;
                $scope.statusC = false;
                $scope.statusD = false;

                $('#question').focus();
            } else {
                $scope.addQuestions = false;
            }

        };

        $scope.addA = function (statusA) {
            $scope.statusA = !$scope.statusA;

        };

        $scope.addB = function (statusB) {
            $scope.statusB = !$scope.statusB;

        };

        $scope.addC = function (statusC) {
            $scope.statusC = !$scope.statusC;

        };

        $scope.addD = function (statusD) {
            $scope.statusD = !($scope.statusD);

        };

        function Test( duration, list) {
            this.TestDuration = duration;
            this.QuestionList = list;
        };

        
        $scope.finalizeTest = function () {
            $scope.finalTest = new Test($scope.time, $scope.questions);
                
            /*profService.saveTest(
                 $scope.finalTest
                ).then(function() {
                });*/

            $scope.finalizedTest = !$scope.finalizedTest;
            $scope.testForm.title.$setPristine();
            $scope.testForm.nrQuestions.$setPristine();
            $scope.testForm.time.$setPristine();
        };

        $scope.cancelTest = function () {
            $scope.test = true;
            $scope.initializare();

        };

        $scope.seeStatistics = function () {
            if ($scope.finalizedTest === true) {
                $scope.initializare();
            }
            $scope.statistics = true;
            $scope.profile = false;
            $scope.test = false;
            $scope.grades = false;

            //$scope.chart();
        };

        

    //};


}])();


