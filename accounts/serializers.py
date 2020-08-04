from rest_framework import serializers
from .models import Account
from .forms import AccountCreationForm, AccountModifyForm
from django.contrib.auth import authenticate, login

from hospitals.serializers import HospitalSerializer


class AccountSerializer(serializers.ModelSerializer):

    hospital = HospitalSerializer(many=True)

    class Meta:
        model = Account
        fields = [
            "email",
            "hospital",
        ]

    def create(self, validated_data):
        email = validated_data["email"]
        password = validated_data["password"]

        user = authenticate()

