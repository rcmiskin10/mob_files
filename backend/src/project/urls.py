"""djangoProject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.generic import TemplateView
from django.conf.urls.static import static

from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token, refresh_jwt_token

urlpatterns = [
  path('api/auth/token/', obtain_jwt_token),
  path('auth-jwt-verify/', verify_jwt_token),
  path('auth-jwt-refresh/', refresh_jwt_token),
  path('admin/', admin.site.urls),
  path('api/events/', include('events.api.urls')),
  path('api/accounts/', include('accounts.api.urls')),
  # path('api/', include('mynewapp.urls')),
  re_path('.*', TemplateView.as_view(template_name='index.html')),
]
