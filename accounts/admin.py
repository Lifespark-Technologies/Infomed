from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Account, HospitalStaff, GeneralUser, HospitalAdmin
from django import forms
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from .forms import (
    AccountCreationForm, 
    GeneralUserCreationForm, 
    HospitalAdminCreationForm, 
    HospitalStaffCreationForm,
    AccountModifyForm,
)


class AccountAdmin(UserAdmin):

    form = AccountModifyForm
    add_form = AccountCreationForm

    list_display = ("email", "date_joined", "last_login",)
    search_fields = ("email",)
    readonly_fields = ("date_joined", "last_login")
    list_filter = ("is_staff", "is_superuser",)

    fieldset_fields = ("email", "password", "is_superuser", "is_staff", "hospital")
    
    fieldsets = (
        (None, {"fields": fieldset_fields}),
    )
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("email", "password"),
        }),
    )

    ordering = ("email", "date_joined", "last_login",)
    filter_horizontal = ()


class GeneralUserAdmin(AccountAdmin):

    add_form = GeneralUserCreationForm

    list_display = AccountAdmin.list_display + ("doctor",)
    search_fields = AccountAdmin.search_fields + ("doctor",)
    list_filter = AccountAdmin.list_filter + ("doctor",)
    
    fieldsets = (
        (None, {"fields": AccountAdmin.fieldset_fields + ("doctor",)}),
    )


class HospitalStaffAdmin(AccountAdmin):

    add_form = HospitalStaffCreationForm

    list_display = AccountAdmin.list_display + ("is_doctor",)
    search_fields = AccountAdmin.search_fields + ("is_doctor",)
    list_filter = AccountAdmin.list_filter + ("is_doctor",)

    fieldsets = (
        (None, {"fields": AccountAdmin.fieldset_fields + ("is_doctor",)}),
    )


class HospitalAdminAdmin(AccountAdmin):

    add_form = HospitalAdminCreationForm
    pass


admin.site.register(Account, AccountAdmin)

admin.site.register(GeneralUser, GeneralUserAdmin)
admin.site.register(HospitalStaff, HospitalStaffAdmin)
admin.site.register(HospitalAdmin, HospitalAdminAdmin)