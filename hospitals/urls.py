from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register("hospitals", views.HospitalView)


urlpatterns = [
    path('apis/', include(router.urls))
]