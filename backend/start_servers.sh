#!/bin/bash
echo "Starting Books Server"
cd /Users/anand/Documents/Books\ for\ project
python -m http.server 3000 &
echo "Staring backend server"
cd /Users/anand/Desktop/MAD2_Fresh_Start/backend
python app.py &
sleep 2
echo "Starting Frontend Server"
cd ..
cd frontend
npm run serve &
cd ..
cd backend
sleep 40
echo "Starting Redis Server"
redis-server & 
sleep 2
echo "Starting mailhog"
mailhog &
sleep 2
echo "Starting Celery Beat"
celery -A tasks.celery beat --loglevel=info &
sleep 2
echo "Starting Celery Worker"
celery -A tasks.celery worker --loglevel=info &


