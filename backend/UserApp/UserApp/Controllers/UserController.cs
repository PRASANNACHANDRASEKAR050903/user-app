using Microsoft.AspNetCore.Mvc;
using UserApp.Data;
using UserApp.Models;
using UserApp.Repositories;

namespace UserApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly UserRepository _userRepository;

        public UsersController(UserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _userRepository.GetAll();
            return Ok(users);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await _userRepository.GetById(id);
            if (user == null) 
            return NotFound();
            return Ok(user);
        }
        [HttpPost]
        public async Task<IActionResult> AddUser(User user)
        {
            user.CreatedOn = DateTime.UtcNow;
            var result = await _userRepository.AddAsync(user);
            
            return Ok(result);    
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Update( int id, User user)
        {
            var Update = await _userRepository.UpdateAsync(id, user);   
            if (!Update) 
            return NotFound();
             return NoContent();
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var Delete = await _userRepository.Delete(id);
            if (!Delete)            
            return NotFound();
            return NoContent();    
        }
    }
}