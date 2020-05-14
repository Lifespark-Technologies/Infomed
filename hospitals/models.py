from django.contrib.gis.db import models

# Create your models here.

class Hospital(models.Model):
    """
    We create the Hospital model, where each hospital is defined
    by a name, its coordinates, and admission_form_link, as
    expressed in apis/infomed.tsx. Currently the 
    max_length values are set arbitrarily. They could be subject
    to revision.
    """

    # the id field is generated automatically, so we start with the
    # name field
    name = models.CharField(max_length=100)

    # To hold the latitude and longitude coordinates
    coords = models.PointField()

    # User clickable link where a patient can admit themselves
    admission_form_link = models.URLField(max_length=200)
