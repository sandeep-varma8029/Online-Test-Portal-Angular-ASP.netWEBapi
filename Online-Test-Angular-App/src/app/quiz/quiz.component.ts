import { QuizService } from './../_services/quiz.service';
import { Component, OnInit ,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { CountdownModule } from 'ngx-countdown';
import { CountdownComponent } from 'ngx-countdown';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  now: number;
  @ViewChild('countdown', { static: false }) private countdown: CountdownComponent;
  constructor(private router: Router, public quizService: QuizService) { 

  }
 

  ngOnInit() {
    this.quizService.tim = Date.now();
    localStorage.setItem('qnProgress', "0");
    localStorage.setItem('qns', "");
    localStorage.setItem('seconds', "0");
    if (parseInt(localStorage.getItem('seconds')) > 0) {
      this.quizService.seconds = parseInt(localStorage.getItem('seconds'));
      this.quizService.qnProgress = parseInt(localStorage.getItem('qnProgress'));
      this.quizService.qns = JSON.parse(localStorage.getItem('qns'));
      if (this.quizService.qnProgress == 10) {
      this.router.navigate(['/result']);
      }
    
      else{ this.startTimer();}
      
       
      
    }
    else {
      
      this.quizService.seconds = 0;
      this.quizService.qnProgress = 0;
      this.quizService.getQuestions().subscribe(
        (data: any) => {
          this.quizService.qns = data;
          this.quizService.qns.sort((a,b) => a.Difficulty-b.Difficulty);
          console.log(data);
          this.startTimer();
        }
      );
    }
  }
  handleEvent(event){
    if(event.action === 'notify'){
      this.endTest();
    }
  }
  onTimerFinished(e:Event){
    if (e["action"] == "done"){
      this.endTest();
     }
   }

  startTimer() {
    this.quizService.timer = setInterval(() => {
      this.quizService.seconds++;
      localStorage.setItem('seconds', this.quizService.seconds.toString());
    }, 1000);
  }

  Answer(qID, choice) {
    this.quizService.qns[this.quizService.qnProgress].answer = choice;
    localStorage.setItem('qns', JSON.stringify(this.quizService.qns));
    this.quizService.qnProgress++;
    localStorage.setItem('qnProgress', this.quizService.qnProgress.toString());
    if (this.quizService.qnProgress == 10) {
      clearInterval(this.quizService.timer);
      this.router.navigate(['/result']);
    }
  }
  restart() {
    localStorage.setItem('qnProgress', "0");
    localStorage.setItem('qns', "");
    localStorage.setItem('seconds', "0");
    this.router.navigate(['/quiz']);
  }
  endTest() {
    alert("You are ending test early!")
    clearInterval(this.quizService.timer);
    this.router.navigate(['/result']);
  }

}
