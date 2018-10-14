from rest_framework import viewsets, permissions, generics

from events.models import Event
from .serializers import (
 
  EventCreateSerializer, 

)

# class EventViewSet(viewsets.ModelViewSet):
#     queryset = Event.objects.all()
#     permission_classes = [permissions.AllowAny, ]
#     serializer_class = EventSerializer

# CRUD for events
# class EventListAPIView(generics.ListAPIView):
#     queryset = Event.objects.all()
#     permission_classes = [permissions.AllowAny, ]
#     serializer_class = EventSerializer

class EventCreateAPIView(generics.CreateAPIView):
	permission_classes = [permissions.IsAuthenticated]
	queryset = Event.objects.all()
	serializer_class = EventCreateSerializer

# class EventEditAPIView(generics.RetrieveUpdateAPIView):
# 	permission_classes = [permissions.AllowAny]
# 	queryset = Event.objects.all()
# 	serializer_class = EventDetailSerializer

# class EventDestroyAPIView(generics.DestroyAPIView):
# 	permission_classes = [permissions.AllowAny]
# 	queryset = Event.objects.all()
# 	serializer_class = EventDetailSerializer