import { Router } from '@angular/router';
import { QuizService } from './../../_services/quiz.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.less']
})
export class ParticipantsComponent implements OnInit {
  participant: any[];
  constructor(public quizService: QuizService, private router: Router) {
    if (this.router.url === '/admin/participants') {
      this.quizService.showComponent = true
  }
   }

  ngOnInit(): void {
    this.quizService. getParticipants().subscribe(
      (data: any) => {
        this.participant = data;
        console.log(data);
    
      }
    );
  }

}
