# Generated by Django 2.1 on 2018-11-16 05:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0002_auto_20181116_1226'),
    ]

    operations = [
        migrations.RenameField(
            model_name='certificateinfo',
            old_name='certificateCode',
            new_name='certificate_code',
        ),
        migrations.RenameField(
            model_name='certificateinfo',
            old_name='certificateValidity',
            new_name='certificate_validity',
        ),
        migrations.RenameField(
            model_name='certificateinfo',
            old_name='etpName',
            new_name='etp_name',
        ),
        migrations.RenameField(
            model_name='certificateinfo',
            old_name='identificationNumber',
            new_name='identification_number',
        ),
        migrations.RenameField(
            model_name='certificateinfo',
            old_name='issuingDate',
            new_name='issuing_date',
        ),
        migrations.RenameField(
            model_name='certificateinfo',
            old_name='technicalTitle',
            new_name='technical_title',
        ),
    ]
