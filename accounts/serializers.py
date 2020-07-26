from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import Account
from django.core.exceptions import ValidationError

class AccountSerializer(serlializers.ModelSerializer):
    """
    This class does the job of a ModelForm as well as 
    serializes the users. 
    """

    class Meta:
        model = Account
        fields = ["email", "password", "date_joined", "last_login", "hospital",]


    def create(self, validated_data):
        cleaned_email = validated_data["email"]
        cleaned_password = validated_data["password"]

        acct = Account


class HospitalStaffSerializer(AccountSerializer):

    class Meta:
        model = AccountSerializer.Meta.model
        fields = AccountSerializer.Meta.fields + ["is_doctor",]

class GeneralUserSerializer(AccountSerializer):
    
    class Meta:
        model = AccountSerializer.Meta.model
        fields = AccountSerializer.Meta.fields + ["doctor",]
