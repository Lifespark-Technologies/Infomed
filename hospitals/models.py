from django.contrib.gis.db import models
from django.contrib.gis.geos import GEOSGeometry

# Create your models here.

class Hospital(models.Model):
    """
    This is the hospital class. So far, it has two fields, a name and a location.
    The name is a simple CharField and the location is a PointField from GeoDjango.
    """
    name = models.CharField(max_length=50)
    location = models.PointField()




class AppointmentSlot(models.Model):
    """
    This is the Appointment Slot model. Each hospital can have a list of appointment slots.
    """

    STATUS_CHOICES = [
        ("available", "available"),
        ("unavailable", "unavailable")
    ]

    start = models.DateTimeField()
    end = models.DateTimeField()

    # Ensuring that only the two choices described above are possible.
    status = models.CharField(max_length=50, choices=STATUS_CHOICES)

    # Identify the hospital associated with the slot.
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE)

