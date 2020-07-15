from django.urls import path, include
from . import views
from rest_framework import routers
from rest_framework_extensions.routers import NestedRouterMixin


class NestedDefaultRouter(NestedRouterMixin, routers.DefaultRouter):
    pass


router = NestedDefaultRouter(trailing_slash=False)
hospitals_router = router.register("hospitals", views.HospitalView)
hospitals_router.register("appointment-slots", views.AppointmentSlotView, basename='hospital-appointment-slots', parents_query_lookups=['hospital'])


urlpatterns = [
    path('apis/', include(router.urls))
]