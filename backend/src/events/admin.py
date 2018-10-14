from django.contrib import admin
from .models import Event

class EventAdmin(admin.ModelAdmin):
    list_display = ( 'id','name')
    class Meta:
        model = Event
        
admin.site.register(Event, EventAdmin)
