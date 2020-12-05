using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FCMNotificationServerExample
{
    public class Utils
    {
        public static string GetEnvironment(string envVariable, string defaultValue = "")
        {
            var v = Environment.GetEnvironmentVariable(envVariable);
            return v ?? defaultValue;
        }

        public static int GetEnvironmentNumber(string envVariable, int defalutValue = 0)
        {
            var v = GetEnvironment(envVariable, $"{defalutValue}");
            return int.Parse(v);
        }

        private const string ServiceAccountFile = "./Private/fcmnotificationexample-77167-firebase-adminsdk-homl8-47fcbeedb6.json";

        private static readonly Lazy<FirebaseApp> DefaultFirebaseApp = new Lazy<FirebaseApp>(
            () =>
            {
                var options = new AppOptions()
                {
                    Credential = GoogleCredential.FromFile(ServiceAccountFile),
                };
                return FirebaseApp.Create(options);
            }, true);

        public static FirebaseApp EnsureDefaultApp()
        {
            return DefaultFirebaseApp.Value;
        }
    }
}
