from django.shortcuts import render

# Create your views here.
def index(request):
    # Django by default looks in the templates/ directory for views.
    # To change, modify the TEMPLATES attribute in settings.py
    return render(request, 'build/index.html')

