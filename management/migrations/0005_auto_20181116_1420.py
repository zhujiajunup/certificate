# Generated by Django 2.1 on 2018-11-16 06:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0004_certificateinfo_image_id'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='certificateinfo',
            options={'verbose_name': '证书信息', 'verbose_name_plural': '证书信息'},
        ),
        migrations.AlterField(
            model_name='certificateinfo',
            name='image_id',
            field=models.ImageField(upload_to='image'),
        ),
    ]
