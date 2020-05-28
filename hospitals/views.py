from django.shortcuts import render
from rest_framework import viewsets
from .models import Hospital
from .serializers import HospitalSerializer

# Create your views here.

class HospitalView(viewsets.ModelViewSet):
    queryset = Hospital.objects.all()
    serializer_class = HospitalSerializer
