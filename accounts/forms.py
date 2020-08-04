from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.apps import apps
from .models import Account, GeneralUser, HospitalAdmin, HospitalStaff
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from django.contrib.auth.forms import UserChangeForm


class AccountCreationForm(forms.ModelForm):

    password = forms.CharField(label="password", widget=forms.PasswordInput)
    
    class Meta:
        model = Account
        fields = (
            "email",
            "is_superuser",
            "is_staff",
            "hospital"
        )

    def save(self, commit=True):
        account = super(AccountCreationForm, self).save(commit=False)
        account.set_password(self.cleaned_data["password"])

        if commit:
            account.save()

        return account


class GeneralUserCreationForm(AccountCreationForm):

    class Meta:
        model = GeneralUser
        fields = AccountCreationForm.Meta.fields + ("doctor",)


class HospitalStaffCreationForm(AccountCreationForm):

    class Meta:
        model = HospitalStaff
        fields = AccountCreationForm.Meta.fields + ("is_doctor",)


class HospitalAdminCreationForm(AccountCreationForm):
    
    class Meta:
        model = HospitalAdmin
        fields = AccountCreationForm.Meta.fields


class AccountModifyForm(UserChangeForm):

    class Meta:
        model = Account
        fields = "__all__"