# Generated by Django 5.1.1 on 2024-11-14 15:36

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rankdom', '0008_alter_questionsset_create_date_answer'),
    ]

    operations = [
        migrations.AlterField(
            model_name='answer',
            name='create_date',
            field=models.DateTimeField(default=datetime.datetime(2024, 11, 14, 16, 36, 0, 262344)),
        ),
        migrations.AlterField(
            model_name='answer',
            name='user',
            field=models.EmailField(max_length=254, null=True),
        ),
        migrations.AlterField(
            model_name='questionsset',
            name='create_date',
            field=models.DateTimeField(default=datetime.datetime(2024, 11, 14, 16, 36, 0, 261343)),
        ),
        migrations.AlterField(
            model_name='questionsset',
            name='user',
            field=models.EmailField(max_length=254, null=True),
        ),
    ]
