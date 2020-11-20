import { QuizService } from './../_services/quiz.service';
import { Component, OnInit ,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { CountdownModule } from 'ngx-countdown';
import { CountdownComponent } from 'ngx-countdown';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})
export class AdminComponent implements OnInit {
  que: any[];
  constructor(private router: Router,public quizService: QuizService) { 

            if (this.router.url === '/admin') {
            this.quizService.showComponent = true
        }
  }

  ngOnInit(): void {
  
    this.quizService.getAllQuestions().subscribe(
      (data: any) => {
        this.que = data;
        console.log(data);
    
      }
    );
  }
  deleteQues(QnID: number) {
    this.quizService.deleteQuestion(QnID).subscribe(
      (data : any) =>{
      
      }
    );
    window.location.reload();
    this.router.navigate(['/admin']);
  
  }

}
