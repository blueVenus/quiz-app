# Generated by Django 4.2.5 on 2023-09-28 08:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_lesson_number'),
    ]

    operations = [
        migrations.AddField(
            model_name='lesson',
            name='description',
            field=models.CharField(default='This is a classroom', max_length=255),
        ),
    ]