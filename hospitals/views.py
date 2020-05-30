from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Hospital, AppointmentSlot
from .serializers import HospitalSerializer, AppointmentSlotSerializer

# Create your views here.

class HospitalView(viewsets.ModelViewSet):
    queryset = Hospital.objects.all()
    serializer_class = HospitalSerializer

    @action(detail=True, methods=["get"])
    def appointmentSlots(self, request, pk):
        hospital = self.get_object()
        dat = hospital.appointment_slots.all()
        serializer = AppointmentSlotSerializer(dat, many=True)
        return Response(serializer.data)






