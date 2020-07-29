from django.contrib import admin
from .models import Hospital, AppointmentSlot

# Register your models here.

class HospitalAdministration(admin.ModelAdmin):
    pass

class AppointmentSlotAdministration(admin.ModelAdmin):
    pass

admin.site.register(Hospital, HospitalAdministration)
admin.site.register(AppointmentSlot, AppointmentSlotAdministration)
