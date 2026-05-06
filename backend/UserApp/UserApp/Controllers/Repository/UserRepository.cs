using Microsoft.EntityFrameworkCore;
using UserApp.Data;
using UserApp.Models;

namespace UserApp.Repositories
{
    public class UserRepository 
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<User>> GetAll()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User?> GetById(int id)
        {
            return await _context.Users.FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<User> AddAsync(User user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<bool> UpdateAsync(int id, User user)
        {
            var existing = await _context.Users.FindAsync(id);
            if ( existing == null)
            return false;

            existing.FirstName = user.FirstName;
            existing.LastName = user.LastName;
            existing.Email = user.Email;
            existing.country = user.country;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> Delete(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            return false;
            

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}