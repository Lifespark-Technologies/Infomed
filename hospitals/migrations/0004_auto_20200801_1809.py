# Generated by Django 3.0.7 on 2020-08-01 18:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_auto_20200726_0832'),
        ('hospitals', '0003_auto_20200801_1806'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointmentslot',
            name='general_user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='general_user_appointments', to='accounts.GeneralUser'),
        ),
        migrations.AlterField(
            model_name='appointmentslot',
            name='hospital_staff',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='staff_appointments', to='accounts.HospitalStaff'),
        ),
    ]
