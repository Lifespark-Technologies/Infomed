from rest_framework import serializers
from .models import Account, GeneralUser, HospitalStaff, HospitalAdmin
from .forms import AccountCreationForm, AccountModifyForm
from django.contrib.auth import authenticate, login

from hospitals.serializers import HospitalSerializer, AppointmentSlotSerializer


class AccountSerializer(serializers.ModelSerializer):

    hospital = HospitalSerializer(many=True)

    class Meta:
        model = Account
        fields = ["email", "hospital",]

class GeneralUserSerializer(AccountSerializer):

    general_user_appointments = AppointmentSlotSerializer(many=True)
    class Meta:
        model = GeneralUser
        fields = AccountSerializer.Meta.fields + ["doctor", "general_user_appointments"]

class HospitalStaffSerializer(AccountSerializer):

    staff_appointments = AppointmentSlotSerializer(many=True)

    class Meta:
        model = HospitalStaff
        fields = AccountSerializer.Meta.fields + ["is_doctor", "staff_appointments",]


class HospitalAdminSerializer(AccountSerializer):
    pass




    # def create(self, validated_data):
    #     email = validated_data["email"]
    #     password = validated_data["password"]

    #     user = authenticate()

