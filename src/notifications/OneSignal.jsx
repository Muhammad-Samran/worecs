import React from "react";
import OneSignal from "react-onesignal";

const Notifications = async () => {
  // window.OneSignal = window.OneSignal || [];
  // await OneSignal.init({
  //   appId: "5aa6697b-8b98-4afd-9e2d-014086cc6bec",
  //   allowLocalhostAsSecureOrigin: true,
  // }).then((response) => {
  //   console.log("notifications", response);
  //   OneSignal.showSlidedownPrompt().then((res) => {
  //     console.log("notifications Slide", res);
  //   });
  // });

  //   OneSignal.showSlidedownPrompt();

  window.OneSignal = window.OneSignal || [];

  OneSignal.push(function () {
    OneSignal.init({
      appId: "key",

      notifyButton: {
        enable: true,
      },

      promptOptions: {
        slidedown: {
          enabled: true,

          autoPrompt: true,

          timeDelay: 20,

          pageViews: 3,

          actionMessage:
            "We'd like to show you notifications for the latest news and updates.",

          acceptButtonText: "ALLOW",

          cancelButtonText: "BLOCK",
        },
      },
    });
  });
};

export default Notifications;
