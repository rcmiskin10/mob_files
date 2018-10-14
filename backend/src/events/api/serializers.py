from rest_framework import serializers
from accounts.models import User
from events.models import Event

class EventCreateSerializer(serializers.ModelSerializer):
  class Meta:
    model = Event
    fields = [
      'name',
      'city',
      'state',
      'address',
      'start_date',
      'end_date',
      'description',
      'code',
    ]
  #self.context.get("request").META.get('REMOTE_ADDR')
  def create(self, validated_data):
    name = validated_data['name']
    city = validated_data['city']
    state = validated_data['state']
    address = validated_data['address']
    start_date = validated_data['start_date']
    end_date = validated_data['end_date']
    description = validated_data['description']
    code = validated_data['code']
    user = None
    request = self.context.get("request")
    print (request)
    if request and hasattr(request, "user"):
      user = User.objects.filter(id=request.user.id)
      if not user.exists():
        raise serializers.ValidationError('No such user exists.')
      
      if user.first().user_type != 3:
        raise serializers.ValidationError({
          'non_field_errors':  ['User already created profile.']
      })
      user = user.first()

    event_obj = Event.objects.create(
      name =name,
      city=city,
      state=state,
      address=address,
      start_date=start_date,
      end_date=end_date,
      description=description,
      code=code,
      owner=user
    )
    event_obj.save()
    return validated_data