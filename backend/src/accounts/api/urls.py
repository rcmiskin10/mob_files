from django.urls import include, path, re_path
from rest_framework import routers

from .views import (
	UserCreateAPIView,
  BusinessProfileCreateAPIView,
  EventProfileStripeAccountVerificationNeededAPIView
)

urlpatterns = [
  path('register/user/', UserCreateAPIView.as_view()),
  path('business-profile/create/', BusinessProfileCreateAPIView.as_view()),
  path('event-profile/get-stripe-account-verification-needed/', EventProfileStripeAccountVerificationNeededAPIView.as_view()),
]


