# Generated by Django 3.0.7 on 2020-07-26 03:24

import django.contrib.gis.db.models.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('accounts', '__first__'),
    ]

    operations = [
        migrations.CreateModel(
            name='Hospital',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('location', django.contrib.gis.db.models.fields.PointField(srid=4326)),
                ('specialty', models.CharField(default='', max_length=50)),
                ('n95_masks', models.IntegerField(default=0)),
                ('three_layer_masks', models.IntegerField(default=0)),
                ('PPE_kits', models.IntegerField(default=0)),
                ('PPE_kits_daily', models.IntegerField(default=0)),
                ('sanitizer', models.IntegerField(default=0)),
                ('bleaching_powder', models.FloatField(default=0.0)),
                ('sodium_hypochlorite', models.FloatField(default=0.0)),
                ('chemical_gloves', models.IntegerField(default=0)),
                ('infrared_thermometer', models.IntegerField(default=0)),
                ('handwash', models.FloatField(default=0.0)),
                ('viral_transport_medium', models.IntegerField(default=0)),
                ('swap_sticks', models.IntegerField(default=0)),
                ('three_layer_packing_mask', models.IntegerField(default=0)),
                ('ice_gel_pack', models.IntegerField(default=0)),
                ('rubbing_alcohol', models.FloatField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='AppointmentSlot',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start', models.DateTimeField()),
                ('end', models.DateTimeField()),
                ('status', models.CharField(blank='', choices=[('available', 'available'), ('unavailable', 'unavailable')], max_length=50)),
                ('general_user', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='general_user_appointments', to='accounts.GeneralUser')),
                ('hospital', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='appointment_slots', to='hospitals.Hospital')),
                ('hospital_staff', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='staff_appointments', to='accounts.HospitalStaff')),
            ],
        ),
    ]
