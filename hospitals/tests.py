from django.test import TestCase
from .models import Hospital, AppointmentSlot
from django.contrib.gis.geos import GEOSGeometry, Point
from django.core.exceptions import ValidationError
from rest_framework.test import APIClient
# Create your tests here.


class HospitalTestCase(TestCase):
    def setUp(self):
        # Setting up hospitals
        loc1 = GEOSGeometry("Point(5 23)")
        loc2 = GEOSGeometry("Point(8 30)")
        self.hospital1 = Hospital.objects.create(
            name="TestHospital1", location=loc1)
        self.hospital1 = Hospital.objects.create(
            name="TestHospital2", location=loc2)

    def test_get_hospital_location(self):
        """
        Just ensuring we're able to successfully query the DB and get the object's location.
        """
        h1 = Hospital.objects.get(name="TestHospital1")
        h2 = Hospital.objects.get(name="TestHospital2")

        self.assertEqual(h1.location.x, 5)
        self.assertEqual(h1.location.y, 23)
        self.assertEqual(h2.location.x, 8)
        self.assertEqual(h2.location.y, 30)

    def test_get_hospital_name(self):
        """
        Ensuring successful DB query to obtain name.
        """
        h1 = Hospital.objects.get(location="Point(5 23)")
        h2 = Hospital.objects.get(location="Point(8 30)")

        self.assertEqual(h1.name, "TestHospital1")
        self.assertEqual(h2.name, "TestHospital2")

    def test_int_field(self):
        h = Hospital.objects.get(location="Point(5 23)")

        self.assertEqual(h.sanitizer, 0)
        self.assertEqual(h.infrared_thermometer, 0)

    def test_float_field(self):
        h = Hospital.objects.get(location="Point(5 23)")
        self.assertEqual(h.handwash, 0.0)
        self.assertEqual(h.sodium_hypochlorite, 0.0)


class AppointmentSlotTestCase(TestCase):
    def setUp(self):
        self.api = APIClient()
        self.hospital = Hospital.objects.create(
            id=1, name="TestHospital", location=GEOSGeometry("Point(0 0)")
        )

    def test_creates_and_retrieves_slots(self):
        response = self.api.post(
            '/apis/hospitals/1/appointment-slots',
            {
                'start': '2020-03-02T08:00:00Z',
                'end': '2020-03-02T09:00:00Z',
                'slotLength': 'P0Y0M0DT0H20M0S',
            },
            format='json',
        )
        self.assertEqual(response.status_code, 200)

        response = self.api.get('/apis/hospitals/1/appointment-slots')
        response_without_ids = [strip_id(slot) for slot in response.json()]
        self.assertCountEqual(
            response_without_ids,
            [
                {
                    'start': '2020-03-02T08:00:00Z',
                    'end': '2020-03-02T08:20:00Z',
                    'status': 'available'
                },
                {
                    'start': '2020-03-02T08:20:00Z',
                    'end': '2020-03-02T08:40:00Z',
                    'status': 'available'
                },
                {
                    'start': '2020-03-02T08:40:00Z',
                    'end': '2020-03-02T09:00:00Z',
                    'status': 'available'
                },
            ]
        )

    def test_removes_slots(self):
        self.hospital.appointment_slots.create(
            id=1,
            start='2020-04-01T10:00:00Z',
            end='2020-04-01T10:30:00Z',
        )
        self.hospital.appointment_slots.create(
            id=2,
            start='2020-04-01T11:00:00Z',
            end='2020-04-01T11:30:00Z',
        )
        response = self.api.delete('/apis/hospitals/1/appointment-slots/1')
        self.assertEqual(response.status_code, 204)

        ids = list(AppointmentSlot.objects.values_list('id', flat=True))
        self.assertEqual(ids, [2])


def strip_id(dict):
    """Returns a dict that doesn't contain an 'id' key."""
    return {k: v for k, v in dict.items() if k != 'id'}
