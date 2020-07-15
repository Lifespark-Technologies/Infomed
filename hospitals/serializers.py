from rest_framework_gis import serializers
from .models import Hospital, AppointmentSlot
from django.core.exceptions import ValidationError


class AppointmentSlotSerializer(serializers.ModelSerializer):
    """
    This is a simple ModelSerializer for the appointment slot which serializes
    the slots start, end, and status.
    TODO: Add validation to ensure that start <= end.
    """
    class Meta:
        model = AppointmentSlot
        fields = ("id", "start", "end", "status")


class HospitalSerializer(serializers.GeoFeatureModelSerializer):
    """
    Serializer class for the Hospital model. Uses a GeoFeatureModelSerializer because
    we store the hospital's location as a Point, which is a "Geometry." This class can
    serialize points easily from a map, which is Leaflet on the frontend.
    """

    # Serialize the appointment slots when serializing the hospital as well using
    # the AppointmentSlotSerializer
    appointment_slots = AppointmentSlotSerializer(many=True)

    class Meta:
        model = Hospital

        # Specifying which field we want to serialize as a geometry
        geo_field = "location"

        fields = ("id", "name", "location", "appointment_slots")


