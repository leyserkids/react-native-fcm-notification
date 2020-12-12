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
                Android = new AndroidConfig
                {
                    Data = new Dictionary<string, string>
                    {
                        { "title", "title1" },
                        { "body", "body1" },
                        { "badge", "2" }
                    },
                    Priority = Priority.High
                },
                Apns = new ApnsConfig
                {
                    Headers = new Dictionary<string, string>
                    {
                        { "apns-push-type", "alert" },
                        { "apns-priority", "10" }
                    },
                    Aps = new Aps
                    {
                        ContentAvailable = true,
                        Badge = 2,
                        Sound = "default",
                        Alert = new ApsAlert
                        {
                            Title = "title1",
                            Body = "body1"
                        }
                    }
                }
            };

            if (isDelay)
            {
                _ = Task.Run(async () =>
                {
                    await Task.Delay(5000);
                    _logger.LogInformation("Start send to: {0}", token);
                    var id = await FirebaseMessaging.DefaultInstance.SendAsync(message);
                    _logger.LogInformation("Scheduled Returns: {0}", id);
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
                    _logger.LogInformation("Returns: {0}", id);
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
