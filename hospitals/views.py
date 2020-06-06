from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Hospital, AppointmentSlot
from .serializers import HospitalSerializer, AppointmentSlotSerializer
import dateutil.parser

# Create your views here.

class HospitalView(viewsets.ModelViewSet):
    queryset = Hospital.objects.all()
    serializer_class = HospitalSerializer

    @action(detail=True, methods=["get"])
    def appointmentSlots(self, request, pk):
        """
        Routes get requests with a pk associated with a hospital to this endpoint.
        This obtains hospitals in the database and returns the ones that are 
        within the specified timeframe. The URL to access this endpoint is 
        specified in the gist: https://gist.github.com/bl-nero/6354aeabf46f601ac6a9581b00ba377d.
        """
        hospital = self.get_object()
        appointments = hospital.appointment_slots.all()

        valid_appointments = []

        if request.query_params:

            start = dateutil.parser.parse(request.query_params["start"])
            end = dateutil.parser.parse(request.query_params["end"])

            for appointment in appointments:
                if appointment.start >= start and appointment.end <= end:
                    valid_appointments.append(appointment)

        else:
            valid_appointments = appointments


        serializer = AppointmentSlotSerializer(valid_appointments, many=True)
        return Response(serializer.data)


