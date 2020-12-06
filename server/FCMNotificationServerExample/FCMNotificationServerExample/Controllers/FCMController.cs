using FirebaseAdmin.Messaging;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FCMNotificationServerExample.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FCMController : ControllerBase
    {
        private readonly ILogger<FCMController> _logger;

        public FCMController(ILogger<FCMController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public async Task<string> Get([FromQuery] string token, [FromQuery] bool isDelay = false)
        {
            if (string.IsNullOrEmpty(token))
            {
                _logger.LogInformation("Invalid token: {0}", token);
                return "Invalid";
            }

            var message = new Message
            {
                Token = token,
                //Notification = new Notification()
                //{
                //    Title = "Title",
                //    Body = "Body",
                //},
                Android = new AndroidConfig
                {
                    Data = new Dictionary<string, string>
                    {
                        { "title", "title1" }
                    },
                    Priority = Priority.High
                }
            };


            if (isDelay)
            {
                _ = Task.Run(async () =>
                {
                    await Task.Delay(5000);
                    _logger.LogInformation("Start send to: {0}", token);
                    await FirebaseMessaging.DefaultInstance.SendAsync(message);
                }).ContinueWith(t =>
                {
                    if (t.IsFaulted)
                    {
                        _logger.LogError(t.Exception, "Failed to send.");
                    }
                });
                _logger.LogInformation("Scheduled");
                return "Scheduled";

            }
            else
            {
                try
                {
                    _logger.LogInformation("Start send to: {0}", token);
                    var id = await FirebaseMessaging.DefaultInstance.SendAsync(message);
                    return id;
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Failed to send.");
                    return string.Format("Failed: {0}", ex);
                }
            }

        }
    }
}
