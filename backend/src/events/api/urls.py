from django.urls import include, path, re_path
from rest_framework import routers

from .views import (
	# EventListAPIView,
  EventCreateAPIView,
  # EventEditAPIView,
	# EventDestroyAPIView,
	
	# EventCreateAPIView,
	# EventIsRegisteredAPIView,
	# MyEventListAPIView,
	# EventRegistrationCreateAPIView,
	# EventParticipantDetailAPIView,
	# EventDealListAPIView,
	# DealDetailAPIView,
	# UpdateDealStepAPIView,
	# EventVendorAppListAPIView
	)

# router = routers.DefaultRouter()
# router.register('events', EventViewSet)

urlpatterns = [
  # path('', EventListAPIView.as_view()),
  path('create/', EventCreateAPIView.as_view()),
  # path('<int:pk>/edit/', EventEditAPIView.as_view()),
  # path('<int:pk>/delete/', EventDestroyAPIView.as_view()),
]

# urlpatterns = [
#     path('', include(router.urls)),
# ]

