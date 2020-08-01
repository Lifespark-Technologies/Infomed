from django.shortcuts import render
from rest_framework import viewsets
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from rest_framework.decorators import action
from .models import Account

# Create your views here.

class AccountViewSet(viewsets.ViewSet):

    queryset = Account.objects.all()

    def list(self, request):
        print("session:", request.session)
    
    def create(self, request):
        email = request.POST["email"]
        password = request.POST["password"]

        user = authenticate(request, username=email, password=password)
        print("tried to create a new user")
        if user is not None:
            login(request, user)

        else:
            print("invalid login, ping create account endpoint")

    def retrieve(self, request, pk=None):
        print("session:", request.session)

    def partial_update(self, request, pk=None):
        pass

    def destroy(self, request, pk=None):
        pass

    @action(detail=False, methods=["post"])
    def new_account(self, request):
        print("new account pinged")

    @action(detail=True)
    def logout_user(self, request):
        logout(request)
        print("logged out")

