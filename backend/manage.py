import os
import sys
from core.env import env

def main():
    """Run administrative tasks."""
    env('DJANGO_SETTINGS_MODULE')
    print(f"Este es la variable {env('DJANGO_SETTINGS_MODULE')}")
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
