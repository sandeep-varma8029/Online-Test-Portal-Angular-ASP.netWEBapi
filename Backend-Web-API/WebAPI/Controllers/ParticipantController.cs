using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class ParticipantController : ApiController
    {
        [HttpPost]
        [Route("api/InsertParticipant")]
        public Participant Insert(Participant model)
        {
            using (DBModel db = new DBModel())
            {
                db.Participants.Add(model);
                db.SaveChanges();
                return model;
            }
        }
        [HttpGet]
        [Route("api/participants")]
        public HttpResponseMessage GetAllQuestions()
        {
            using (DBModel db = new DBModel())
            {
                var Qns = db.Participants
                    .Select(x => new { ParticipantID = x.ParticipantID, Name = x.Name,  x.Score, x.TimeSpent })
                    .OrderBy(y => Guid.NewGuid())

                    .ToArray();

                return this.Request.CreateResponse(HttpStatusCode.OK, Qns);
            }
        }
        [HttpPost]
        [Route("api/UpdateOutput")]
        public void UpdateOutput(Participant model)
        {
            using (DBModel db = new DBModel())
            {
                db.Entry(model).State = System.Data.EntityState.Modified;
                db.SaveChanges();
            }
        }
    }
}
