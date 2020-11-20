import { Questions } from './../questions.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class QuizService {
  //---------------- Properties---------------
  readonly rootUrl = 'http://localhost:2690';
  qns: any[];
  seconds: number;
  timer;
  qnProgress: number;
  correctAnswerCount: number = 0;
  tim: number;
  showComponent: boolean = true;
  //---------------- Helper Methods---------------
  constructor(private http: HttpClient) { }
  displayTimeElapsed() {
    return Math.floor(this.seconds / 3600) + ':' + Math.floor(this.seconds / 60) + ':' + Math.floor(this.seconds % 60);
  }

  // getParticipantName() {
  //   var participant = JSON.parse(localStorage.getItem('participant'));
  //   return participant.Name;
  // }


  //---------------- Http Methods---------------

  insertParticipant(name: string) {
    var body = {
      Name: name

    }
    return this.http.post(this.rootUrl + '/api/InsertParticipant', body);
  }
  insertQuestions(Qn: string,
    Option1:  string,
    Option2:  string,
    Option3:  string,
    Option4:  string,
    Answer: number,
    Difficulty: number
    ) {
    var bdy = {
      Qn: Qn,
      Option1:  Option1,
      Option2:  Option2,
      Option3:  Option3,
      Option4:  Option4,
      Answer: Answer,
      Difficulty:Difficulty
    }
    return this.http.post(this.rootUrl + '/api/InsertQuestions', bdy);
  }
  getQuestions() {
    return this.http.get(this.rootUrl + '/api/AllDiffQuestions');
  }
  getParticipants() {
    return this.http.get(this.rootUrl + '/api/participants');
  }
  getAllQuestions() {
    return this.http.get(this.rootUrl + '/api/AllQuestions');
  }
  getoneQuestions(qnid:number) {
    return this.http.get(this.rootUrl + '/api/AllQuestions?id='+qnid);
  }
  getAnswers() {
    var body = this.qns.map(x => x.QnID);
    return this.http.post(this.rootUrl + '/api/Answers', body);
  }
  updateQuestions(
    QnID:number,
    Qn: string,
    Option1:  string,
    Option2:  string,
    Option3:  string,
    Option4:  string,
    Answer: number,
    Difficulty: number) {
    var bdy = {
      Qn: Qn,
      Option1:  Option1,
      Option2:  Option2,
      Option3:  Option3,
      Option4:  Option4,
      Answer: Answer,
      Difficulty:Difficulty
    }
    return this.http.put(this.rootUrl + '/api/UpdateQuestions?id='+ QnID, bdy);
  }
  deleteQuestion(QnID:number) {
    return this.http.delete(this.rootUrl + '/api/DeleteQuestions?id='+ QnID)
 }
  submitScore() {
    var body = JSON.parse(localStorage.getItem('participant'));
    body.Score = this.correctAnswerCount;
    body.TimeSpent = this.seconds;
    return this.http.post(this.rootUrl + "/api/UpdateOutput", body);
  }

}
