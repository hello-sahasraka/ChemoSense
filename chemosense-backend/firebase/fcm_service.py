from firebase_admin import messaging
import logging

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

def send_fcm_notification(token: str, title: str, body: str):
    logger.info(f"[send_fcm_notification] Sending FCM notification to token: {token[:10]}...")
    message = messaging.Message(
    notification=messaging.Notification(
        title=title,
        body=body,
        image="https://cdn-icons-png.flaticon.com/256/564/564619.png"
    ),
    token=token
)
    try:
        response = messaging.send(message)
        logger.info(f"[send_fcm_notification] Successfully sent notification to token: {token[:10]}")
        return response
    except Exception as e:
        logger.error(f"[send_fcm_notification] Error sending to {token[:10]}: {e}")
        return None