from django.shortcuts import render
from isodate import parse_duration
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework_extensions.mixins import NestedViewSetMixin
from .models import Hospital, AppointmentSlot
from .serializers import HospitalSerializer, AppointmentSlotSerializer
import dateutil.parser
import json

# Create your views here.


class HospitalView(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Hospital.objects.all()
    serializer_class = HospitalSerializer


class AppointmentSlotView(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = AppointmentSlot.objects.all()
    serializer_class = AppointmentSlotSerializer

    def get_queryset(self):
        """
        Returns appointment slots, potentially filtering them by date. Query
        parameters:
        * `since`: minimum start date (ISO-8601)
        * `until`: maximum end date (ISO-8601)
        """
        qs = super().get_queryset()
        if "since" in self.request.query_params:
            qs = qs.filter(start__gte=self.request.query_params["since"])
        if "until" in self.request.query_params:
            qs = qs.filter(end__lte=self.request.query_params["until"])
        return qs

    def create(self, request, parent_lookup_hospital, *args, **kwargs):
        """
        Creates appointment slots of given size in a given time range. Takes a JSON request with following attributes:
        * `start`: beginning of the time range (ISO-8601)
        * `end`: end of the time range (ISO-8601)
        * `slotLength`: length of time slots (ISO-8601 duration)
        """
        body = json.loads(request.body)
        start = dateutil.parser.isoparse(body["start"])
        end = dateutil.parser.isoparse(body["end"])
        slot_length = parse_duration(body["slotLength"])

        hospital = Hospital.objects.get(pk=parent_lookup_hospital)
        slot_start = start
        slot_end = slot_start + slot_length
        created_slots = []
        while slot_end <= end:
            slot = hospital.appointment_slots.create(
                start=slot_start, end=slot_end, status="available")
            slot.save()
            created_slots.append(slot)
            slot_start += slot_length
            slot_end += slot_length

        serializer = self.serializer_class(created_slots, many=True)
        return Response(serializer.data)
