
import os 
from accounts.models import User, BusinessProfile, EventProfile
from rest_framework import serializers
import jwt
from django.utils.translation import gettext as _
import stripe

stripe.api_key = os.environ.get('STRIPE_SK_TEST_KEY')

class UserCreateSerializer(serializers.ModelSerializer):
  email = serializers.EmailField(label='Email Address', write_only=True)
  password2 = serializers.CharField(label='Confirm Password', write_only=True)
  user_type = serializers.CharField(write_only=True)
  
  class Meta:
    model = User
    fields = [
      'first_name',
      'last_name',
      'email',
      'password',
      'password2',
      'user_type'
    ]
    extra_kwargs = {"password":
                    {"write_only": True},
                  "password2":
                    {"write_only": True}
                  }
  def validate_email(self, value):
    data = self.get_initial()
    email = data['email']
    user_qs = User.objects.filter(email=email)
    if user_qs.exists():
        raise serializers.ValidationError("This email has already registered.")
    email = value
    return email
  def validate_password2(self,value):
    # Check that the two password entries match
    data = self.get_initial()
    password = data.get("password")
    if len(password) <= 5:
        raise serializers.ValidationError("Password is too short.")
    password2 = value
    if password != password2:
        raise serializers.ValidationError("Passwords don't match.")
    return password2

  def create(self, validated_data):
    email = validated_data['email']
    password = validated_data['password2']
    first_name = validated_data['first_name']
    last_name = validated_data['last_name']
    user_type = validated_data['user_type']

    user_obj = User(
      email = email,
      is_active = True,
      first_name = first_name,
      last_name=last_name,
      user_type=user_type
    )
       
    user_obj.set_password(password)
    
    user_obj.save()
    
    if int(user_obj.user_type) == 3:
      account = stripe.Account.create(
        type='custom',
        country='US'
      )
      
      event_profile_obj = EventProfile(
        user=user_obj,
        account_id = account.id
      )
      event_profile_obj.save()
    return validated_data

class BusinessProfileCreateSerializer(serializers.ModelSerializer):
  business_name = serializers.CharField(write_only=True)
  business_url = serializers.CharField(write_only=True)
  business_phone = serializers.CharField(write_only=True)
  class Meta:
    model = User
    fields = [
      'business_name',
      'business_url',
      'business_phone'
    ]

  def create(self, validated_data):
    business_name = validated_data['business_name']
    business_url = validated_data['business_url']
    business_phone = validated_data['business_phone']
    user = None
    request = self.context.get("request")
    if request and hasattr(request, "user"):
      user = User.objects.filter(id=request.user.id)
      if not user.exists():
        raise serializers.ValidationError('No such user exists.')
      business_profile = BusinessProfile.objects.filter(user=user.first())
      if business_profile.exists():
        raise serializers.ValidationError({
          'non_field_errors':  ['User already created profile.']
      })
      user = user.first()

    business_obj = BusinessProfile(
          user = user,
          business_name = business_name,
          business_url = business_url,
          business_phone = business_phone,
        )

    business_obj.save()

    return validated_data

class EventProfileStripeAccountVerificationNeededSerializer(serializers.ModelSerializer):
  verification_data_needed = serializers.SerializerMethodField()
  account_id = serializers.SerializerMethodField()
  class Meta:
    model = EventProfile
    fields = [
      'verification_data_needed',
      'account_id'
    ]
  
  def get_verification_data_needed(self, obj):
    verification_data_needed = stripe.Account.retrieve(obj.account_id).verification.fields_needed
    return verification_data_needed

  def get_account_id(self, obj):
    account_id = obj.account_id
    return account_id



