from django.contrib import admin
from .models import Hospital

# Register your models here.

class HospitalAdministration(admin.ModelAdmin):
    pass

admin.site.register(Hospital, HospitalAdministration)
