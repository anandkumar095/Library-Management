import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime,timedelta
from celery_config import celery
from app import User,app,Transactions,db,Books


@celery.task
def generate_monthly_report():
    with app.app_context():
      current_month = datetime.now().strftime('%B')
      current_year = datetime.now().year
      subject = 'Monthly Activity Report'
      users = User.query.filter_by(role='Administrator').all()
      issued_books=Transactions.query.filter_by(status='issued').count()
      total_books=Books.query.count()
      for user in users:
          email = user.email
          html_content = f"""
          <!DOCTYPE html>
          <html>
          <head>
              <title>Monthly Activity Report</title>
          </head>
          <body>
              <h1>Monthly Report - {current_month} {current_year}</h1>
              <p>This is your summary for the month of {current_month}:</p>
              <p> Total No of Books in Library is {total_books} </p>
              <p> Total No of Books Issued is {issued_books} </p>
          </body>
          </html>
          """
          send_email(email, html_content, subject)

def send_email(to_email, html_content, subject):
  from_email = 'noreply@email.com'

  msg = MIMEMultipart('alternative')
  msg['From'] = from_email
  msg['To'] = to_email
  msg['Subject'] = subject

  part1 = MIMEText(html_content, 'html')
  msg.attach(part1)

  smtp_server = 'localhost'
  smtp_port = 1025

  with smtplib.SMTP(smtp_server, smtp_port) as server:
      server.send_message(msg)

@celery.task
def send_daily_reminder():
   with app.app_context():
      users=User.query.filter_by(role="general").all()
      subject="Daily Login Reminder"
      for user in users:
         email = user.email
         if datetime.utcnow().date()-user.lastloggedin >timedelta(days=1):
          html_content = f"""
          <!DOCTYPE html>
          <html>
          <head>
              <title>Login Reminder</title>
          </head>
          <body>
              <h1>Login Reminder</h1>
              <p> You have not logged in yesterday. Your last login was on {user.lastloggedin}</p>
          </body>
          </html>
          """
          send_email(email, html_content, subject)

@celery.task
def revoke_access():
   with app.app_context():
      transactions=Transactions.query.filter_by(status="issued").all()
      
      for transaction in transactions:
         return_date = transaction.return_date
         if datetime.utcnow().date() >return_date:
            db.session.delete(transaction)
            db.session.commit()
            
