from django.shortcuts import render
from isodate import parse_duration
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Hospital, AppointmentSlot
from .serializers import HospitalSerializer, AppointmentSlotSerializer
import dateutil.parser
import json

# Create your views here.


class HospitalView(viewsets.ModelViewSet):
    queryset = Hospital.objects.all()
    serializer_class = HospitalSerializer

    @action(detail=True, methods=["GET", "POST"])
    def appointmentSlots(self, request, pk):
        """
        Routes get requests with a pk associated with a hospital to this endpoint.
        This obtains hospitals in the database and returns the ones that are 
        within the specified timeframe. The URL to access this endpoint is 
        specified in the gist: https://gist.github.com/bl-nero/6354aeabf46f601ac6a9581b00ba377d.
        """
        if request.method == "GET":
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

            serializer = AppointmentSlotSerializer(
                valid_appointments, many=True)
            return Response(serializer.data)

        elif request.method == "POST":
            body = json.loads(request.body)
            start = dateutil.parser.isoparse(body["start"])
            end = dateutil.parser.isoparse(body["end"])
            slot_length = parse_duration(body["slotLength"])

            hospital = self.get_object()
            slot_start = start
            slot_end = slot_start + slot_length
            created_slots = []
            while slot_end <= end:
                print('Creating a slot', slot_start, slot_end)
                slot = hospital.appointment_slots.create(
                    start=slot_start, end=slot_end, status="available")
                slot.save()
                created_slots.append(slot)
                slot_start += slot_length
                slot_end += slot_length

            serializer = AppointmentSlotSerializer(created_slots, many=True)
            return Response(serializer.data)
