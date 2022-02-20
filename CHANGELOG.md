## [0.6.2](https://github.com/leyserkids/react-native-fcm-notification/compare/v0.6.1...v0.6.2) (2022-02-20)


### Bug Fixes

* **ios:** repeated trigger onNotificationReceived event ([e81e199](https://github.com/leyserkids/react-native-fcm-notification/commit/e81e1990d69fe910ae75f51d285be48992f34086))

## [0.6.1](https://github.com/leyserkids/react-native-fcm-notification/compare/v0.6.0...v0.6.1) (2022-02-15)


### Bug Fixes

* KR-20000 ([09ae982](https://github.com/leyserkids/react-native-fcm-notification/commit/09ae982759f3ac5d2e2535b4c5cd75f47c60c48b))

# [0.6.0](https://github.com/leyserkids/react-native-fcm-notification/compare/v0.5.1...v0.6.0) (2021-03-16)


### Bug Fixes

* **example:** update podfile.lock and add FIRDebugEnabled ([5f72cac](https://github.com/leyserkids/react-native-fcm-notification/commit/5f72cacd17cba438326aa941433ce7c6ff777f74))


### Features

* **ios, Android:** introduced analytics ([1ccfdc8](https://github.com/leyserkids/react-native-fcm-notification/commit/1ccfdc8c84237d46fc53a863df2e0b3e45d54ba0))

## [0.5.1](https://github.com/leyserkids/react-native-fcm-notification/compare/v0.5.0...v0.5.1) (2021-02-04)


### Features

* **android:** add notification icon color ([578e1ef](https://github.com/leyserkids/react-native-fcm-notification/commit/578e1ef5312bbd470d71fe518a66a8b16d0d9639))

# [0.5.0](https://github.com/leyserkids/react-native-fcm-notification/compare/v0.4.0...v0.5.0) (2021-02-03)


### Features

* **android:** remove custom receiver and change to explicit broadcast ([2f581d3](https://github.com/leyserkids/react-native-fcm-notification/commit/2f581d3d62a59f7db62190f74252e9c494f7db40))

# [0.4.0](https://github.com/leyserkids/react-native-fcm-notification/compare/v0.3.0...v0.4.0) (2021-02-03)


### Features

* **android:** add custom receiver ([7d3db49](https://github.com/leyserkids/react-native-fcm-notification/commit/7d3db496529674ccf69e1493b040cb1a3ad38602))
* **ios:** remove saved notification ([5cab59e](https://github.com/leyserkids/react-native-fcm-notification/commit/5cab59e4b099c06a6b8d510eb854aa350bfd1334))

# [0.3.0](https://github.com/leyserkids/react-native-fcm-notification/compare/v0.2.4...v0.3.0) (2021-02-03)


### Bug Fixes

* **ios:** duplicated event and no handler warning ([ef56307](https://github.com/leyserkids/react-native-fcm-notification/commit/ef56307a0731973bbfe86fbd68a69be33b0a690c))
* **ios:** enhance getInitialNotification ([d85fa68](https://github.com/leyserkids/react-native-fcm-notification/commit/d85fa683f9d8d14d87d0b1647b33ab9c8f5b45cf))


### Features

* **ios:** trigger event on background and fix getInitialNotification on user open app directly ([a7ca590](https://github.com/leyserkids/react-native-fcm-notification/commit/a7ca5907181709e49372e9a933e002af25618fda))

## [0.2.4](https://github.com/leyserkids/react-native-fcm-notification/compare/v0.2.3...v0.2.4) (2021-01-30)


### Bug Fixes

* **ios:** fix crash when token is nil and also fix no listeners warning ([59258ec](https://github.com/leyserkids/react-native-fcm-notification/commit/59258ecfed15a92bae28c39ee432a01967a3c7cb))

## [0.2.3](https://github.com/leyserkids/react-native-fcm-notification/compare/v0.2.2...v0.2.3) (2021-01-30)


### Bug Fixes

* **android:** notification not shown on huawei ([1ddeaa0](https://github.com/leyserkids/react-native-fcm-notification/commit/1ddeaa0e0cb7f2ad18a5f3a46809eec470e6a90c))
* **ios:** didReceiveRegistrationToken not working ([7484435](https://github.com/leyserkids/react-native-fcm-notification/commit/7484435de4bc431f623c2ef05d02fabd69c37f7f))
* **ios:** not register remote notification on getToken after deleteToken ([354a593](https://github.com/leyserkids/react-native-fcm-notification/commit/354a593a419fae6a0c70281ba19c7d8c73e1bd0d))

## [0.2.2](https://github.com/leyserkids/react-native-fcm-notification/compare/v0.2.1...v0.2.2) (2021-01-12)


### Bug Fixes

* **ios:** unable receive notification after reopen ([adc93c0](https://github.com/leyserkids/react-native-fcm-notification/commit/adc93c0ecf5c4fd15a43e7d6f0cd14383bb924c5))

## [0.2.1](https://github.com/leyserkids/react-native-fcm-notification/compare/v0.2.0...v0.2.1) (2021-01-11)


### Bug Fixes

* **android:** Could not convert class android.os.UserHandle on Xiaomi ([888bc4d](https://github.com/leyserkids/react-native-fcm-notification/commit/888bc4de6fa6a6f5fd37fff7b92d9394edea3e7d))

# [0.2.0](https://github.com/leyserkids/react-native-fcm-notification/compare/v0.1.1...v0.2.0) (2021-01-08)


### Features

* **ios, android:** rename apis and tag platform ([fd2e56b](https://github.com/leyserkids/react-native-fcm-notification/commit/fd2e56bbb09d2fd835305306a45815b55308a72d))

## [0.1.1](https://github.com/leyserkids/react-native-fcm-notification/compare/v0.1.0...v0.1.1) (2021-01-07)


### Bug Fixes

* **android:** unmatched notification in getInitialNotification ([0d542d6](https://github.com/leyserkids/react-native-fcm-notification/commit/0d542d62c989dbc7a7c089f9b51bc8d935bb94cf))
* **ios, android:** unsubscript event ([ba555dc](https://github.com/leyserkids/react-native-fcm-notification/commit/ba555dca7da75adace41cfde2b74d0baa93a2bbf))

# 0.1.0 (2021-01-07)


### Bug Fixes

* **android:** launch Intent ([2f7f5fc](https://github.com/leyserkids/react-native-fcm-notification/commit/2f7f5fcc30ee300ecec77d2f21c28cfa025569fb))
* **example:** pod install failed ([37be834](https://github.com/leyserkids/react-native-fcm-notification/commit/37be834dd01ec64d3ee89f275681d796d04d6271))
* **example:** type error on iOS ([f190002](https://github.com/leyserkids/react-native-fcm-notification/commit/f190002088810b519803d84a622505bd561d05cd))
* **example:** update test server ([4096163](https://github.com/leyserkids/react-native-fcm-notification/commit/4096163f1a20d289bd1a1df93e2b78aa9d92241a))
* **ios:** event unmatch and wrong didReceiveRemoteNotification ([6bd15e4](https://github.com/leyserkids/react-native-fcm-notification/commit/6bd15e4c3f6524af0433ff97fb2fa9a7d734db9f))
* **ios, example:** build and runtime error ([cde80b3](https://github.com/leyserkids/react-native-fcm-notification/commit/cde80b33e0eb6ea92ca8437d097094942de1a652))


### Features

* **android:** add extras ([235d416](https://github.com/leyserkids/react-native-fcm-notification/commit/235d416ddde09cfb66a0cf1a7f8e54f8638494b4))
* **android:** add getInitialNotification and onNotificationReceived ([b4b0f50](https://github.com/leyserkids/react-native-fcm-notification/commit/b4b0f50a339747515dc4905eb93ac459cf5bf3be))
* **android:** add js event ([f97d1b0](https://github.com/leyserkids/react-native-fcm-notification/commit/f97d1b05e1ed9a22bb8ce7d0b8313b82e2d33e28))
* **android:** add more method and code cleanup ([16ee8ca](https://github.com/leyserkids/react-native-fcm-notification/commit/16ee8caf8cfee2336caec202ae9b0de4c0af9314))
* **android:** add onNewIntent listener ([95bf966](https://github.com/leyserkids/react-native-fcm-notification/commit/95bf96689775897b202235ba4a07eef3b0eff601))
* **android:** add onNotificationTap ([e42c213](https://github.com/leyserkids/react-native-fcm-notification/commit/e42c213facdffcfabb213cea9daea3b155368c93))
* **android:** introduce fcm sdk ([fb793c9](https://github.com/leyserkids/react-native-fcm-notification/commit/fb793c9d40f38e3bd7e33c178cf3f789f321e037))
* **android:** support notification icon ([b9ab4b2](https://github.com/leyserkids/react-native-fcm-notification/commit/b9ab4b2307a63c214f89dbcd4852f0bb42ddaf35))
* **android, example:** add isNotificationsEnabled ([f5b6c7d](https://github.com/leyserkids/react-native-fcm-notification/commit/f5b6c7d812f60988d684b8dec246e878d1cf0314))
* **android, example, server:** make notification works and add some util funcs to accessing more information ([8c2f70d](https://github.com/leyserkids/react-native-fcm-notification/commit/8c2f70d03be2034f4e8b0163b309ed6038f68967))
* **example:** customizing message ([5575e54](https://github.com/leyserkids/react-native-fcm-notification/commit/5575e54091bf9e48c18b5e01d09807034719a183))
* **ios:** add getInitialNotification ([7a77891](https://github.com/leyserkids/react-native-fcm-notification/commit/7a77891bf699bdc8a3ade4d1914e69bcf8d95e57))
* **ios:** add hasPermission ([395e9f2](https://github.com/leyserkids/react-native-fcm-notification/commit/395e9f2f470ec3660a031b296164bb29b1bc23bb))
* **ios:** add unregister ([a13ab52](https://github.com/leyserkids/react-native-fcm-notification/commit/a13ab52c5bebc15d21683ac586ae05ce624215ae))
* **ios:** convert notification structure ([73b1fba](https://github.com/leyserkids/react-native-fcm-notification/commit/73b1fbabe57186af96f82fcabd7ab74ee11b7c87))
* **ios:** introduce event and add badge ([1200abe](https://github.com/leyserkids/react-native-fcm-notification/commit/1200abe5e18c7042511d005e7f1dbf751d98bdf9))
* **ios:** real send event to js ([e004e56](https://github.com/leyserkids/react-native-fcm-notification/commit/e004e56619cdc0ebbfa057369e34cd7c1dbd949f))
* **ios, example:** introduce ios sdk ([a7b0431](https://github.com/leyserkids/react-native-fcm-notification/commit/a7b043129ad65c8c6816637ef34a3ec09e0d3965))
* **ios, example:** make ios works ([a4689b1](https://github.com/leyserkids/react-native-fcm-notification/commit/a4689b14d92b0d4626d2d9ce0886e1242b88c579))
* **server:** add a server example for test ([d4b4a79](https://github.com/leyserkids/react-native-fcm-notification/commit/d4b4a798f678bb3eb2aa9f0504f9729314eb1ffa))
* **server:** add apns config to message ([95208df](https://github.com/leyserkids/react-native-fcm-notification/commit/95208dfb97ad32595c45a8c3fcc6f1105c8e8c6c))
* **server:** custom message content ([12271d4](https://github.com/leyserkids/react-native-fcm-notification/commit/12271d410127cd16bc5e5f3756ead98284949af3))

