from celery import Celery
from celery.schedules import crontab
from datetime import timedelta



celery = Celery(__name__,broker='redis://localhost:6379/0',backend = 'redis://localhost:6379/0')
CELERY_TIMEZONE = 'Asia/Kolkata'
CELERY_BEAT_SCHEDULE = {
    'generate_monthly_report':{
    'task':'tasks.generate_monthly_report',
    # 'schedule': crontab(day_of_month=1,hour=0,minute=0),
    'schedule':100,
        
    },
    'send_daily_reminder':{
      'task':'tasks.send_daily_reminder',
      # 'schedule': crontab(minute='30',hour='00'),
      'schedule':100
    },
    'revoke_acces':{
      'task':'tasks.revoke_access',
      'schedule':crontab(hour='18', minute='30'),
    }
}

celery.conf.beat_schedule = CELERY_BEAT_SCHEDULE