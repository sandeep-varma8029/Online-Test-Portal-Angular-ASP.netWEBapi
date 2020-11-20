import { QuizService } from './../../_services/quiz.service';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.less']
})
export class AddQuestionsComponent implements OnInit {

  constructor(public quizService: QuizService, private router: Router) { 

    if (this.router.url === '/admin/add') {
    this.quizService.showComponent = true
}
  }

  ngOnInit(): void {
  }
  OnSubmit(Qn: string,

    Option1:  string,
    Option2:  string,
    Option3:  string,
    Option4:  string,
    Answer: number,
  Difficulty:number) {
    this.quizService.insertQuestions(Qn,Option1,Option2,Option3,Option4,Answer,Difficulty).subscribe(
      (data : any) =>{
        
      }
    );
    
    this.router.navigate(['/admin']);
    
  }
}
