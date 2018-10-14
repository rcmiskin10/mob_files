from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from django.contrib import admin

from .models import BusinessProfile, ParticipantProfile, EventProfile, AdminProfile, User

class UserAdmin(UserAdmin):
   
    list_display = ( 'id','email', 'first_name', 'last_name', 'is_admin', 'is_active', 'user_type')
    list_filter = ('is_admin',)
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('first_name','last_name','user_type')}),
        ('Permissions', {'fields': ('is_admin','is_active')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'first_name', 'last_name', 'password1', 'password2')}
        ),
    )
    search_fields = ('email',)
    ordering = ('email',)
    filter_horizontal = ()


admin.site.register(User, UserAdmin)

class BusinessProfileAdmin(admin.ModelAdmin):
    
    class Meta:
        model = BusinessProfile
        
admin.site.register(BusinessProfile, BusinessProfileAdmin)

class ParticipantProfileAdmin(admin.ModelAdmin):
    
    class Meta:
        model = ParticipantProfile
        
admin.site.register(ParticipantProfile, ParticipantProfileAdmin)

class EventProfileAdmin(admin.ModelAdmin):
    list_display = ( 'id','user', 'account_id')
    class Meta:
        model = EventProfile
        
admin.site.register(EventProfile, EventProfileAdmin)


class AdminProfileAdmin(admin.ModelAdmin):
    
    class Meta:
        model = AdminProfile
        
admin.site.register(AdminProfile, AdminProfileAdmin)