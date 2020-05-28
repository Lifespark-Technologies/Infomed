from rest_framework_gis import serializers
from .models import Hospital, AppointmentSlot

class HospitalSerializer(serializers.GeoFeatureModelSerializer):
    class Meta:
        model = Hospital

        # Specifying which field we want to serialize as a geometry
        geo_field = "location"


        fields = ("id", "name", "location")

class AppointmentSlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppointmentSlot
        fields = ("start", "end", "status")

