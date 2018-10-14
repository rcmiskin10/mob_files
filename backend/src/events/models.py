from django.db import models
from accounts.models import User
# from accounts.models import EventUserTypeDetails, ParticipantUserTypeDetails

class Event(models.Model):
	owner = models.ForeignKey(User, on_delete=models.CASCADE)
	name = models.CharField(max_length=256)
	address = models.CharField(max_length=256, null=True, blank=True)
	city = models.CharField(max_length=256, null=True, blank=True)
	state = models.CharField(max_length=256, null=True, blank=True)
	start_date = models.CharField(max_length=256, null=True, blank=True)
	start_time = models.CharField(max_length=256, null=True, blank=True)
	end_date = models.CharField(max_length=100, null=True, blank=True)
	end_time = models.CharField(max_length=256, null=True, blank=True)
	image = models.ImageField(upload_to='events/', null=True, blank=True)
	description = models.TextField(null=True, blank=True)
	code = models.CharField(max_length=256, null=True, blank=True)
	# participants = models.ManyToManyField(ParticipantUserTypeDetails, through='EventRegistration')
	def __unicode__(self):
		return self.name
		
# class EventRegistration(models.Model):
# 	event = models.ForeignKey('Event')
# 	participant = models.ForeignKey(ParticipantUserTypeDetails)
