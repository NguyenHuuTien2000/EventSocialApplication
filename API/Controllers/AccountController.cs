using System.Security.Claims;
using System.Text;
using API.DTOs;
using API.Services;
using Domain;
using Infrastructure.Email;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly TokenService _tokenService;
        private readonly IConfiguration _config;
        private readonly HttpClient _httpClient;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly EmailSender _emailSender;
        public AccountController(UserManager<AppUser> userManager, TokenService tokenService, IConfiguration config, SignInManager<AppUser> signInManager, EmailSender emailSender)
        {
            _emailSender = emailSender;
            _signInManager = signInManager;
            _config = config;
            _tokenService = tokenService;
            _userManager = userManager;
            _httpClient = new HttpClient
            {
                BaseAddress = new Uri("https://graph.facebook.com")
            };
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.Users
                .Include(p => p.Photos).FirstOrDefaultAsync(x => x.Email == loginDto.Email);

            if (user == null) return Unauthorized("User not found");

            if (user.Email.Contains("@test.com")) user.EmailConfirmed = true;

            if (!user.EmailConfirmed) return Unauthorized("Email not confirmed");

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (result.Succeeded)
            {
                await SetRefreshToken(user);
                return CreateUserObject(user);
            }
            return Unauthorized("Password is incorrect");
        }

        [AllowAnonymous]
        [HttpPost("fbLogin")]
        public async Task<ActionResult<UserDto>> FacebookLogin(string accessToken)
        {
            var fbVerification = _config["Facebook:AppId"] + "|" + _config["Facebook:ApiSecret"];
            var fbVerificationResponse = 
                await _httpClient.GetAsync($"debug_token?input_token={accessToken}&access_token={fbVerification}");

            if (!fbVerificationResponse.IsSuccessStatusCode) return Unauthorized();

            var fbUrl = $"me?access_token={accessToken}&fields=name,email,picture.width(100).height(100)";

            var fbInfo = await _httpClient.GetFromJsonAsync<FacebookDto>(fbUrl);

            var user = await _userManager.Users
                .Include(p => p.Photos).FirstOrDefaultAsync(x => x.Email == fbInfo.Email);
            
            if (user != null)
            {
                if (user.Photos.Any(p => p.Id.StartsWith("fb_")))
                {
                    var fbPhoto = user.Photos.FirstOrDefault(p => p.Id.StartsWith("fb_"));
                    user.Photos.Remove(fbPhoto);
                    fbPhoto.Url = fbInfo.Picture!.Data!.Url;
                    user.Photos.Add(fbPhoto);
                    await _userManager.UpdateAsync(user);
                }
                return CreateUserObject(user);
            } 

            user = new AppUser
            {
                DisplayName = fbInfo.Name,
                Email = fbInfo.Email,
                UserName = fbInfo.Email![..fbInfo.Email.IndexOf("@")],
                Photos = new List<Photo>
                {
                    new Photo
                    {
                        Id = "fb_" + fbInfo.Id,
                        Url = fbInfo.Picture!.Data!.Url,
                        IsMain = true
                    }
                }
            };
            
            var result = await _userManager.CreateAsync(user);

            if (!result.Succeeded) return BadRequest(result.Errors);
            
            await SetRefreshToken(user);
            return CreateUserObject(user);
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await _userManager.Users.AnyAsync(x => x.UserName == registerDto.Username))
            {
                ModelState.AddModelError("username", "Username is taken");
                return ValidationProblem();
            }

            if (await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
            {
                ModelState.AddModelError("email", "Email is taken");
                return ValidationProblem();
            }

            var user = new AppUser
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.Username
            };
            
            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded) return BadRequest("Problem registering user");

            var origin = Request.Headers["Origin"];

            if (origin.IsNullOrEmpty())
            {
                origin = "https://esapplication.onrender.com";
            }

            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));

            var verifyUrl = $"{origin}/account/verifyEmail?token={token}&email={user.Email}";
            var message = $"<p>Please click the below link to verify your email address:</p><p><a href='{verifyUrl}'>Verify Email</a></p>";
            await _emailSender.SendEmailAsync(registerDto.Email, "Verify Email", message);

            return Ok("Registration successful - please verify your email");
        }

        [AllowAnonymous]
        [HttpPost("verifyEmail")]
        public async Task<IActionResult> VerifyEmail(string token, string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null) return Unauthorized();
            var tokenBytes = WebEncoders.Base64UrlDecode(token);
            var tokenValue = Encoding.UTF8.GetString(tokenBytes);

            var result = await _userManager.ConfirmEmailAsync(user, tokenValue);
            if (result.Succeeded) return Ok("Email verified successfully - you can now login");

            return BadRequest("Verification failed");
        }

        [AllowAnonymous]
        [HttpGet("resendEmailConfirmationLink")]
        public async Task<IActionResult> ResendEmailConfirmationLink(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null) return Unauthorized();

            var origin = Request.Headers["Origin"];

            if (origin.IsNullOrEmpty())
            {
                origin = "https://esapplication.onrender.com";
            }

            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));

            var verifyUrl = $"{origin}/account/verifyEmail?token={token}&email={user.Email}";
            var message = $"<p>Please click the below link to verify your email address:</p><p><a href='{verifyUrl}'>Verify Email</a></p>";
            await _emailSender.SendEmailAsync(user.Email, "Verify Email", message);

            return Ok("Verification email sent");
        }

        [AllowAnonymous]
        [HttpGet("sendPasswordResetLink")]
        public async Task<IActionResult> SendPasswordResetLink(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null) return Unauthorized("User not found");

            var origin = Request.Headers["Origin"];

            if (origin.IsNullOrEmpty())
            {
                origin = "https://esapplication.onrender.com";
            }

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));

            var resetUrl = $"{origin}/account/resetPassword?token={token}&email={user.Email}";
            var message = $"<p>Please click the below link to reset your password:</p><p><a href='{resetUrl}'>Reset Password</a></p>";
            await _emailSender.SendEmailAsync(user.Email, "Reset Password", message);

            return Ok("Password reset email sent");
        }

        [AllowAnonymous]
        [HttpPost("resetPassword")]
        public async Task<IActionResult> ResetPassword(RecoverDto recoverDto)
        {
            var user = await _userManager.FindByEmailAsync(recoverDto.Email);
            if (user == null) return Unauthorized();
            var tokenBytes = WebEncoders.Base64UrlDecode(recoverDto.Token);
            var tokenValue = Encoding.UTF8.GetString(tokenBytes);

            var result = await _userManager.ResetPasswordAsync(user, tokenValue, recoverDto.Password);
            if (result.Succeeded) return Ok("Password reset successfully - you can now login");

            return BadRequest("Reset failed");
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.Users
                .Include(p => p.Photos).FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));
            
            await SetRefreshToken(user);
            return CreateUserObject(user);
        }

        [Authorize]
        [HttpPost("refreshToken")]
        public async Task<ActionResult<UserDto>> RefreshToken()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            var user = await _userManager.Users
                .Include(r => r.RefreshTokens)
                .Include(p => p.Photos)
                .FirstOrDefaultAsync(x => x.UserName == User.FindFirstValue(ClaimTypes.Name));
            
            if (user == null) return Unauthorized();

            var oldToken = user.RefreshTokens.SingleOrDefault(x => x.Token == refreshToken);

            if (oldToken != null && !oldToken.IsActive) return Unauthorized();

            if (oldToken != null) oldToken.Revoked = DateTime.UtcNow;
            
            return CreateUserObject(user);
        }

        private async Task SetRefreshToken(AppUser user)
        {
            var refreshToken = _tokenService.GenerateRefreshToken();

            user.RefreshTokens.Add(refreshToken);
            await _userManager.UpdateAsync(user);

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.UtcNow.AddDays(7)
            };

            Response.Cookies.Append("refreshToken", refreshToken.Token, cookieOptions);
        }

        private UserDto CreateUserObject(AppUser user)
        {
            return new UserDto
            {
                DisplayName = user.DisplayName,
                Image = user?.Photos?.FirstOrDefault(x => x.IsMain)?.Url,
                Token = _tokenService.CreateToken(user),
                Username = user.UserName
            };
        }
    }
}