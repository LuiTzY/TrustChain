
#MIGRACIONES DE LA DB, en caso de ser necesario se aplicaran
python manage.py makemigrations
python manage.py migrate

#Recolectar los archivos estaticos
python manage.py collectstatic --noinput
#Correr la aplicacion
daphne -b 0.0.0.0 -p 8000 core.asgi:application
