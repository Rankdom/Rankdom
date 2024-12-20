# Generated by Django 5.1.1 on 2024-11-14 14:05

import datetime
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rankdom', '0006_questionsset_emoji_alter_questionsset_create_date_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='questionsset',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='rankdom.customuser'),
        ),
        migrations.AlterField(
            model_name='questionsset',
            name='create_date',
            field=models.DateTimeField(default=datetime.datetime(2024, 11, 14, 15, 5, 42, 113267)),
        ),
        migrations.DeleteModel(
            name='Answer',
        ),
    ]
