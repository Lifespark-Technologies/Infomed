# Generated by Django 3.0.7 on 2020-08-01 19:35

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_auto_20200801_1909'),
    ]

    operations = [
        migrations.DeleteModel(
            name='HospitalAdmin',
        ),
        migrations.CreateModel(
            name='HospitalAdmin',
            fields=[
                ('account_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
            bases=('accounts.account',),
        ),
    ]