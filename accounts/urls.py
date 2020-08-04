from django.urls import path, include
from rest_framework import routers
from . import views


router = routers.SimpleRouter(trailing_slash=False)
router.register("accounts", views.AuthenticatedAccountReadViewSet)

urlpatterns = [
    path("", include(router.urls))
]
