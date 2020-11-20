import { ParticipantsComponent } from './admin/participants/participants.component';
import { UpdateQuestionsComponent } from './admin/update-questions/update-questions.component';
import { AddQuestionsComponent } from './admin/add-questions/add-questions.component';
import { AdminComponent } from './admin/admin.component';
import { ResultComponent } from './result/result.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuizService } from './_services/quiz.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AuthGuard } from './_helpers';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);

const routes: Routes = [
    { path: 'admin', component: AdminComponent ,canActivate: [AuthGuard]},
    { path: 'admin/add', component: AddQuestionsComponent,canActivate: [AuthGuard] },
    { path: 'admin/participants', component: ParticipantsComponent ,canActivate: [AuthGuard]},
    { path: 'admin/update/:QnID', component: UpdateQuestionsComponent,canActivate: [AuthGuard] },
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'quiz', component: QuizComponent, canActivate: [AuthGuard] },
  
    { path: 'result', component: ResultComponent, canActivate: [AuthGuard]},
    { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: accountModule },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }