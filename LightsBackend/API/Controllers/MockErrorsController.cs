using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class MockErrorsController : BaseApiController
    {
        [HttpGet("not-found")]
        public ActionResult GetNotFound()
        {
            return NotFound();
        }  

        [HttpGet("unauthorized")]
        public ActionResult GetUnauthorized()
        {
            return Unauthorized();
        }       

        [HttpGet("bad-request")]
        public ActionResult GetBadRequest()
        {
            return BadRequest(new ProblemDetails() { Title = "here comes a bad request" });
        }   

        [HttpGet("validation-error")]
        public ActionResult GetValidationError()
        {
            ModelState.AddModelError("Prob1", "Error bla 1");
            ModelState.AddModelError("Prob2", "Error bla 2");
            return ValidationProblem();            
        }   

        [HttpGet("server-error")]
        public ActionResult GetServerError()
        {
            throw new Exception("Server thrown error");
        }    
    }
}