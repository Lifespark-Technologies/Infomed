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
        hospital = self.get_object()
        appointments = hospital.appointment_slots.all()

        valid_appointments = []

        if request.query_params:

            start = dateutil.parser.parse(request.query_params["start"])
            end = dateutil.parser.parse(request.query_params["end"])

            for appointment in appointments:
                if appointment.start.day >= start.day and appointment.end.day <= end.day:
                    valid_appointments.append(appointment)

        else:
            valid_appointments = appointments


        serializer = AppointmentSlotSerializer(valid_appointments, many=True)
        return Response(serializer.data)


