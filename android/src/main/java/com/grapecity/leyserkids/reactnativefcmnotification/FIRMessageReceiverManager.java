package com.grapecity.leyserkids.reactnativefcmnotification;

import android.os.Bundle;

import java.util.ArrayList;
import java.util.List;

public class FIRMessageReceiverManager {

    private static final List<FIRMessageReceiver> receivers = new ArrayList<>();

    public static void register(FIRMessageReceiver receiver) {
        receivers.add(receiver);
    }

    public static void onMessageReceived(Bundle notification) {
        for (FIRMessageReceiver receiver : receivers) {
            receiver.onMessageReceived(notification);
        }
    }
}