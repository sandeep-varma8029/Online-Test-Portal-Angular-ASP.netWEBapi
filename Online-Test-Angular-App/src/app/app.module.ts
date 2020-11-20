import { QuizService } from './_services/quiz.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { HomeComponent } from './home';;
import { QuizComponent } from './quiz/quiz.component';
import { CountdownModule } from 'ngx-countdown';
import { ResultComponent } from './result/result.component';
import { AdminComponent } from './admin/admin.component';
import { AddQuestionsComponent } from './admin/add-questions/add-questions.component';
import { FormsModule } from '@angular/forms';;
import { UpdateQuestionsComponent } from './admin/update-questions/update-questions.component'
;
import { ParticipantsComponent } from './admin/participants/participants.component';
@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        CountdownModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent
,
        QuizComponent ,
        ResultComponent ,
        AdminComponent ,
        AddQuestionsComponent ,
        UpdateQuestionsComponent,
        ParticipantsComponent],
    
    providers: [QuizService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };