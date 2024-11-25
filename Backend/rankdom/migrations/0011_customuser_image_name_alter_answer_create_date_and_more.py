# Generated by Django 5.1.1 on 2024-11-21 12:42

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rankdom', '0010_alter_answer_create_date_alter_customuser_image_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='image_name',
            field=models.CharField(blank=True, max_length=150, null=True),
        ),
        migrations.AlterField(
            model_name='answer',
            name='create_date',
            field=models.DateTimeField(default=datetime.datetime(2024, 11, 21, 13, 42, 17, 969557)),
        ),
        migrations.AlterField(
            model_name='questionsset',
            name='create_date',
            field=models.DateTimeField(default=datetime.datetime(2024, 11, 21, 13, 42, 17, 969557)),
        ),
    ]
