import { QuizService } from './../../_services/quiz.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-questions',
  templateUrl: './update-questions.component.html',
  styleUrls: ['./update-questions.component.less']
})
export class UpdateQuestionsComponent implements OnInit {
  detail: any;
  constructor(public quizService: QuizService, private router: Router, private route: ActivatedRoute) { 

      this.quizService.showComponent = true
  
  }

  ngOnInit(): void {
    this.quizService.getoneQuestions(this.route.snapshot.params['QnID']).subscribe(
      (data: any) => {
        this.detail = data;
        console.log(data);
    
      }
    );
  }
  updateQuestion(
    QnID:number,
    Qn: string,

    Option1:  string,
    Option2:  string,
    Option3:  string,
    Option4:  string,
    Answer: number,
    Difficulty:number
  ) {
    this.quizService. updateQuestions(QnID,Qn,Option1,Option2,Option3,Option4,Answer,Difficulty).subscribe(
      (data : any) =>{
        
      }
    );
  
    this.router.navigate(['/admin']);
    
  }
  
}


