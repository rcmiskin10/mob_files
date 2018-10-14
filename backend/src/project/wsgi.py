import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "project.settings")
from django.conf import settings

application = get_wsgi_application()

if not settings.DEBUG:
    try:
        from dj_static import Cling
        application = Cling(get_wsgi_application())
    except:
        pass
