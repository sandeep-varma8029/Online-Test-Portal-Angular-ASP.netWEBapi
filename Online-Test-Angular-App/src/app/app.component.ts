import { QuizService } from './_services/quiz.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { AccountService } from './_services';
import { User } from './_models';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    user: User;
    curuser: string;
    constructor(private router: Router, private accountService: AccountService,public quizService: QuizService) {

        this.accountService.user.subscribe(x => this.user = x
        
        );
        

     
    }
 
    logout() {
        this.accountService.logout();
    }
}