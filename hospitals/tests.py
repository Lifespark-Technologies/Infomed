from django.test import TestCase
from .models import Hospital, AppointmentSlot
from django.contrib.gis.geos import GEOSGeometry, Point
from django.core.exceptions import ValidationError
from rest_framework.test import APIRequestFactory
# Create your tests here.

class HospitalTestCase(TestCase):
    def setUp(self):
        # Setting up the request factory
        self.factory = APIRequestFactory()

        # Setting up hospitals
        loc1 = GEOSGeometry("Point(5 23)")
        loc2 = GEOSGeometry("Point(8 30)")
        self.hospital1 = Hospital.objects.create(name="TestHospital1", location=loc1)
        self.hospital1 = Hospital.objects.create(name="TestHospital2", location=loc2)

        # Setting up appointments for use in later test cases
        self.start1 = "2020-04-01T10:00:00Z"
        self.end1 = "2020-04-01T10:30:00Z"
        self.status1 = "available"
        AppointmentSlot.objects.create(start=self.start1, end=self.end1, status=self.status1, hospital=self.hospital1)

        # Creates a new appointment slot with a differnet time 
        self.start2 = "2020-04-01T10:30:00.000"
        self.end2 = "2020-04-01T11:00:00.000"
        AppointmentSlot.objects.create(start=self.start2, end=self.end2, status=self.status1, hospital=self.hospital1)


    def test_get_hospital_location(self):
        h1 = Hospital.objects.get(name="TestHospital1")
        h2 = Hospital.objects.get(name="TestHospital2")

        self.assertEqual(h1.location.x, 5)
        self.assertEqual(h1.location.y, 23)
        self.assertEqual(h2.location.x, 8)
        self.assertEqual(h2.location.y, 30)

    def test_get_hospital_name(self):
        h1 = Hospital.objects.get(location="Point(5 23)")
        h2 = Hospital.objects.get(location="Point(8 30)")

        self.assertEqual(h1.name, "TestHospital1")
        self.assertEqual(h2.name, "TestHospital2")

    def test_appointment_chronology(self):
        """
        This test should ensure that the serializer doesn't save appointments where the start date 
        comes after the end date.
        """
        try:
            # Perform the logic where we send a POST request here...?
            self.factory.post("/apis/hospitals/{pk}/appointmentSlots/", {"start": self.end1, "end": self.start1, "status": "available"})
            self.fail("ValidationError not called.")
        except ValidationError as e:
            self.assertEqual(True, True)


