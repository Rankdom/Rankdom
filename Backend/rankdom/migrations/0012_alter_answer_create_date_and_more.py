# Generated by Django 5.1.1 on 2024-11-21 13:00

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rankdom', '0011_customuser_image_name_alter_answer_create_date_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='answer',
            name='create_date',
            field=models.DateTimeField(default=datetime.datetime(2024, 11, 21, 14, 0, 40, 873538)),
        ),
        migrations.AlterField(
            model_name='questionsset',
            name='create_date',
            field=models.DateTimeField(default=datetime.datetime(2024, 11, 21, 14, 0, 40, 873538)),
        ),
    ]
