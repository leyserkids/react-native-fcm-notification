package com.grapecity.leyserkids.reactnativefcmnotification

import android.content.Context
import android.content.SharedPreferences
import android.util.Log
import me.leolin.shortcutbadger.ShortcutBadger

class BadgeHelper(private val context: Context) {
    private var sharedPreferences: SharedPreferences? = null

    fun getBadgeCount(): Int {
        return sharedPreferences!!.getInt(BADGE_COUNT_KEY, 0)
    }

    fun setBadgeCount(badgeCount: Int): Boolean {
        persistentBadgeCount(badgeCount)
        return if (badgeCount <= 0) {
            Log.d(TAG, "Remove count")
            ShortcutBadger.removeCount(context)
        } else {
            Log.d(TAG, "Apply count: $badgeCount")
            ShortcutBadger.applyCount(context, badgeCount)
        }
    }

    fun isBadgeSupported(): Boolean {
        var current = getBadgeCount();
        return setBadgeCount(current);
    }

    private fun persistentBadgeCount(badgeCount: Int) {
        val editor = sharedPreferences!!.edit()
        editor.putInt(BADGE_COUNT_KEY, badgeCount)
        editor.apply()
    }

    companion object {
        private const val TAG = "BadgeHelper"
        private const val PREFERENCES_FILE = "BadgeCountFile"
        private const val BADGE_COUNT_KEY = "BadgeCount"
    }

    init {
        sharedPreferences = context.getSharedPreferences(PREFERENCES_FILE, Context.MODE_PRIVATE) as SharedPreferences
    }
}
