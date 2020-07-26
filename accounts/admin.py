from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Account, HospitalStaff, GeneralUser, HospitalAdmin

# Register your models here.
class AccountAdmin(UserAdmin):
    list_display = ("email", "date_joined", "last_login",)
    search_fields = ("email",)
    readonly_fields = ("date_joined", "last_login")

    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()
    ordering = ()
    exclude = ("username",)

class GeneralUserAdmin(AccountAdmin):
    list_display = AccountAdmin.list_display + ("doctor",)
    search_fields = AccountAdmin.search_fields + ("doctor",)

class HospitalStaffAdmin(AccountAdmin):
    list_display = AccountAdmin.list_display + ("is_doctor",)
    search_fields = AccountAdmin.search_fields + ("is_doctor",)


class HospitalAdminAdmin(AccountAdmin):
    pass


admin.site.register(Account, AccountAdmin)

admin.site.register(GeneralUser, GeneralUserAdmin)
admin.site.register(HospitalStaff, HospitalStaffAdmin)
admin.site.register(HospitalAdmin, HospitalAdminAdmin)