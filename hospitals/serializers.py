from rest_framework_gis import serializers
from .models import Hospital, AppointmentSlot


class AppointmentSlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppointmentSlot
        fields = ("start", "end", "status")



class HospitalSerializer(serializers.GeoFeatureModelSerializer):

    # Serialize the appointment slots when serializing the hospital as well using
    # the AppointmentSlotSerializer
    appointment_slots = AppointmentSlotSerializer(many=True)

    class Meta:
        model = Hospital

        # Specifying which field we want to serialize as a geometry
        geo_field = "location"

        fields = ("id", "name", "location", "appointment_slots")


