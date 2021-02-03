package com.grapecity.leyserkids.example.fcm;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;


public class MyNotificationReceiver extends BroadcastReceiver {
    private static final String TAG = "MyNotificationReceiver";

    @Override
    public void onReceive(Context context, Intent intent) {
        Log.d(TAG, "onReceive");
    }
}
