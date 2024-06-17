#!/bin/bash
echo "Stopping Redis Server..."
pkill redis-server
echo "Killing MailHog Server"
pkill mailhog
echo "Stopping Celery Beat and Celery Worker"
pkill -f celery

echo "Stopping Backend Server"
pkill -f "python app.py"

echo "Stopping Front End Server"
kill $(lsof -ti :8080)

echo "Stopping Books Server"
pkill -f "python -m http.server 3000"
# echo "Stopping Celery Worker..."
# pkill -f "celery -A tasks.celery worker"
