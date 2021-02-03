package com.grapecity.leyserkids.reactnativefcmnotification;

import android.os.Bundle;

public abstract class FIRMessageReceiver {

    public FIRMessageReceiver() {
        FIRMessageReceiverManager.register(this);
    }

    public abstract void onMessageReceived(Bundle remoteMessage);
}
