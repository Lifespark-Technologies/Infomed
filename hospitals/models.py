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
    specialty = models.CharField(max_length=50, default="")

    # Numerical fields
    # Initializing all the hospital fields cited in this issue:
    # https://github.com/Lifespark-Technologies/Infomed/issues/64
    n95_masks = models.IntegerField(default=0)
    three_layer_masks = models.IntegerField(default=0)
    PPE_kits, PPE_kits_daily = models.IntegerField(default=0), models.IntegerField(default=0)
    sanitizer = models.IntegerField(default=0)
    bleaching_powder = models.FloatField(default=0.0)
    sodium_hypochlorite = models.FloatField(default=0.0)
    chemical_gloves = models.IntegerField(default=0)
    infrared_thermometer = models.IntegerField(default=0)
    handwash = models.FloatField(default=0.0)
    viral_transport_medium = models.IntegerField(default=0)
    swap_sticks = models.IntegerField(default=0)
    three_layer_packing_mask = models.IntegerField(default=0)
    ice_gel_pack = models.IntegerField(default=0)
    rubbing_alcohol = models.FloatField(default=0)


    def __str__(self):
        return self.name




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
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, blank="")

    # Identify the hospital associated with the slot.
    hospital = models.ForeignKey(Hospital, related_name="appointment_slots", on_delete=models.CASCADE)

    def __str__(self):
        return str(self.hospital) + str(self.start) + str(self.end)

