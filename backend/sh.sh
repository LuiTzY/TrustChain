
#MIGRACIONES DE LA DB, en caso de ser necesario se aplicaran
python manage.py makemigrations
python manage.py migrate

#Recolectar los archivos estaticos
python manage.py collectstatic --noinput
#Correr la aplicacion
gunicorn core.wsgi:application --bind 0.0.0.0:8000 --workers 3 --timeout 120
