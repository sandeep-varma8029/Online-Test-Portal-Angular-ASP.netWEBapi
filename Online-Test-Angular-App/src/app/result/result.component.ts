import { AccountService } from './../_services/account.service';
import { User } from './../_models/user';
import { QuizService } from './../_services/quiz.service';
import { Component, OnInit } from '@angular/core';
AccountService
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  user: User;
  endt: number;
  incorrect: number;
  total: number;
  final: string;
  retest: boolean = false;
  constructor(public quizService: QuizService, private router: Router, private accountService: AccountService) {
    this.accountService.user.subscribe(x => this.user = x);

   }

  ngOnInit() {
    this.endt = Date.now();
    
    if (parseInt(localStorage.getItem('qnProgress')) == 10) {
      this.quizService.seconds = parseInt(localStorage.getItem('seconds'));
      this.quizService.qnProgress = parseInt(localStorage.getItem('qnProgress'));
      this.quizService.qns = JSON.parse(localStorage.getItem('qns'));

      this.quizService.getAnswers().subscribe(
        (data: any) => {
          this.quizService.correctAnswerCount = 0;
          this.quizService.qns.forEach((e, i) => {
            if (e.answer == data[i])
              this.quizService.correctAnswerCount++;
            e.correct = data[i];
          });
          this.incorrect = 10 - this.quizService.correctAnswerCount;
          this.total = this.quizService.correctAnswerCount - this.incorrect; 
          
          if (this.total < 0) {
          
            this.final = "Your Score is less than zero.Try Again :)";
            this.retest = true;
          }
          else {
            this.final =this.total.toString();
          }
        }
      );
    }
    else

     this.quizService.seconds = parseInt(localStorage.getItem('seconds'));
     this.quizService.qnProgress = parseInt(localStorage.getItem('qnProgress'));
     this.quizService.qns = JSON.parse(localStorage.getItem('qns'));

     this.quizService.getAnswers().subscribe(
       (data: any) => {
         this.quizService.correctAnswerCount = 0;
         this.quizService.qns.forEach((e, i) => {
           if (e.answer == data[i])
             this.quizService.correctAnswerCount++;
           e.correct = data[i];
         });
         this.incorrect = 10 - this.quizService.correctAnswerCount;
         this.total = this.quizService.correctAnswerCount - this.incorrect; 
         if (this.total < 0) {
       
          this.final = "Your Score is less than zero.Try Again :)";
        }
        else {
          this.final =this.total.toString();
        }
       }
     );
    
  }


  OnSubmit() {
    this.quizService.submitScore().subscribe(() => {
   
    });
    alert('You have Completed the Test');
  }

  restart() {
    localStorage.setItem('qnProgress', "0");
    localStorage.setItem('qns', "");
    localStorage.setItem('seconds', "0");
    this.router.navigate(['/quiz']);
  }

}
