using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class QuizController : ApiController
    {

        //question with difficulty
        [HttpGet]
        [Route("api/AllDiffQuestions")]
        public HttpResponseMessage GetDiffQuestions()
        {
            using (DBModel db = new DBModel())
            {
                var Qns = db.Questionups
                    .Select(x => new { QnID = x.QnID, Qn = x.Qn, ImageName = x.ImageName, x.Option1, x.Option2, x.Option3, x.Option4,x.Difficulty })
                    .OrderBy(y => Guid.NewGuid())
                    .Take(10)
                    .ToArray();
                var updated = Qns.AsEnumerable()
                    .Select(x => new
                    {
                        QnID = x.QnID,
                        Qn = x.Qn,
                        ImageName = x.ImageName,
                        Difficulty=x.Difficulty,
                        Options = new string[] { x.Option1, x.Option2, x.Option3, x.Option4 }
                    }).ToList();
                return this.Request.CreateResponse(HttpStatusCode.OK, updated);
            }
        }

        [HttpGet]
        [Route("api/oneans")]
        public HttpResponseMessage GetOneAns(int qid)
        {
            using (DBModel db = new DBModel())
            {

                var Qns = db.Questionups
                    .Select(x => new { QnID = x.QnID, Qn = x.Qn, ImageName = x.ImageName, x.Option1, x.Option2, x.Option3, x.Option4, x.Difficulty, x.Answer })
                    .OrderBy(y => Guid.NewGuid())
                    .Take(10)
                    .ToArray();
                var updated = Qns.AsEnumerable()
                    .Where(x => qid.Equals(x.QnID))
                    .Select(x => new
                    {
                        QnID = x.QnID,
                        Qn = x.Qn,

                        Difficulty = x.Difficulty,

                        Answer = x.Answer,
                    }).ToArray();
                return this.Request.CreateResponse(HttpStatusCode.OK, updated);
            }
        }

        [HttpGet]
        [Route("api/AllDiffeQuestions")]
        public HttpResponseMessage GetAllDiffQuestions()
        {
            using (DBModel db = new DBModel())
            {
                var Qns = db.Questionups
                    .Select(x => new { QnID = x.QnID, Qn = x.Qn, ImageName = x.ImageName, x.Option1, x.Option2, x.Option3, x.Option4, x.Answer ,x.Difficulty})
                    .OrderBy(y => Guid.NewGuid())

                    .ToArray();

                return this.Request.CreateResponse(HttpStatusCode.OK, Qns);
            }
        }
        [HttpPost]
        [Route("api/Answers")]
        public HttpResponseMessage GetAnswers(int[] qIDs)
        {
            using (DBModel db = new DBModel())
            {
                var result = db.Questionups
                     .AsEnumerable()
                     .Where(y => qIDs.Contains(y.QnID))
                     .OrderBy(x => { return Array.IndexOf(qIDs, x.QnID); })
                     .Select(z => z.Answer)
                     .ToArray();
                return this.Request.CreateResponse(HttpStatusCode.OK, result);
            }
        }









        // intial build
        [HttpGet]
        [Route("api/Questions")]
        public HttpResponseMessage GetQuestions()
        {
            using (DBModel db = new DBModel())
            {
                var Qns = db.Questions
                    .Select(x => new { QnID = x.QnID, Qn = x.Qn, ImageName = x.ImageName, x.Option1, x.Option2, x.Option3, x.Option4 })
                    .OrderBy(y => Guid.NewGuid())
                    .Take(10)
                    .ToArray();
                var updated = Qns.AsEnumerable()
                    .Select(x => new
                    {
                        QnID = x.QnID,
                        Qn = x.Qn,
                        ImageName = x.ImageName,
                        Options = new string[] { x.Option1, x.Option2, x.Option3, x.Option4 }
                    }).ToList();
                return this.Request.CreateResponse(HttpStatusCode.OK, updated);
            }
        }
        [HttpGet]
        [Route("api/AllQuestions")]
        public HttpResponseMessage GetAllQuestions()
        {
            using (DBModel db = new DBModel())
            {
                var Qns = db.Questionups
                    .Select(x => new { QnID = x.QnID, Qn = x.Qn, ImageName = x.ImageName, x.Option1, x.Option2, x.Option3, x.Option4,x.Answer, x.Difficulty })
                    .OrderBy(y => Guid.NewGuid())
               
                    .ToArray();
       
                return this.Request.CreateResponse(HttpStatusCode.OK,Qns);
            }
        }
        [HttpGet]
        [Route("api/AllQuestions")]
        public IHttpActionResult GetoneQuestions(int id)
        {
            using (DBModel db = new DBModel())
            {
                var entity = db.Questionups.Find(id);
                if (entity == null)
                {
                    return NotFound();
                }
                else
                {

  
                    return Ok(entity);
                }
            }
        }
        [HttpPost]
        [Route("api/InsertQuestions")]

        public Questionup Insert(Questionup model)
        {
            using (DBModel db = new DBModel())
            {
                db.Questionups.Add(model);
                db.SaveChanges();
                return model;
            }
        }
        [HttpPut]
        [Route("api/UpdateQuestions")]
        public IHttpActionResult Put(int id, [FromBody] Questionup techskill)
        {
            using (DBModel db = new DBModel())
            {
                var entity = db.Questionups.Find(id);
                if (entity == null)
                {
                    return NotFound();
                }
                else
                {
                    entity.Qn = techskill.Qn;
                    entity.ImageName = techskill.ImageName;
                    entity.Option1 = techskill.Option1;
                    entity.Option2 = techskill.Option2;
                    entity.Option3 = techskill.Option3;
                    entity.Option4 = techskill.Option4;
                    entity.Answer = techskill.Answer;
                    entity.Difficulty = techskill.Difficulty;

                    db.SaveChanges();
                    return Ok("Record Updated Successfully......");
                }
            }
  
        }
        [HttpDelete]
        [Route("api/DeleteQuestions")]
        public IHttpActionResult Delete(int id)
        {
         
            using (DBModel db = new DBModel())
            {
                var entity = db.Questionups.Find(id);
                if (entity == null)
                {
                    return NotFound();
                }
                else
                {

                    db.Questionups.Remove(entity);
                    db.SaveChanges();
                    return Ok("Record Deleted Successfully......");
                }
            }

        }

    }
}