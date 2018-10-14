from rest_framework import generics, permissions, status, views, status, response
from .serializers import UserCreateSerializer, BusinessProfileCreateSerializer, EventProfileStripeAccountVerificationNeededSerializer
from accounts.models import User, BusinessProfile, EventProfile
import stripe
import os 
stripe.api_key = os.environ.get('STRIPE_SK_TEST_KEY')

class UserCreateAPIView(generics.CreateAPIView):
  permission_classes = [permissions.AllowAny]
  queryset = User.objects.all()
  serializer_class = UserCreateSerializer

class BusinessProfileCreateAPIView(generics.CreateAPIView):
  permission_classes = [permissions.IsAuthenticated]
  queryset = BusinessProfile.objects.all()
  serializer_class = BusinessProfileCreateSerializer

class EventProfileStripeAccountVerificationNeededAPIView(generics.RetrieveAPIView):
  permission_classes = [permissions.IsAuthenticated]
  serializer_class = EventProfileStripeAccountVerificationNeededSerializer

  def get_object(self):
    user = self.request.user
    if not user:
      raise serializers.ValidationError({
          'non_field_errors':  ['There was an error fetching user information.']
      })
    event_profile = EventProfile.objects.filter(user=user)
    if not event_profile.exists():
      raise serializers.ValidationError({
        'non_field_errors':  ['User does not exits']
    })
    event_profile_obj = event_profile.first()
    
    return event_profile_obj
