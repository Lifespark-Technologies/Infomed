from django.contrib import admin
from .models import Hospital, AppointmentSlot

# Register your models here.

class HospitalAdministration(admin.ModelAdmin):
    list_display = ("name", "location", "specialty",)
    list_filter = list_display

class AppointmentSlotAdministration(admin.ModelAdmin):
    list_display = (
        "hospital",
        "start", 
        "end", 
        "general_user", 
        "hospital_staff",
        "status",
    )
    search_fields = list_display
    list_filter = list_display

admin.site.register(Hospital, HospitalAdministration)
admin.site.register(AppointmentSlot, AppointmentSlotAdministration)
