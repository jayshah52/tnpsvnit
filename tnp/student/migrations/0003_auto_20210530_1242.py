# Generated by Django 3.1.11 on 2021-05-30 12:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('student', '0002_auto_20210530_0814'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='category',
            field=models.CharField(choices=[('GENERAL', 'General'), ('SC', 'SC'), ('ST', 'ST'), ('OBC', 'OBC'), ('OTHERS', 'OTHERS')], default='GENERAL', max_length=7),
        ),
        migrations.AlterField(
            model_name='student',
            name='gender',
            field=models.CharField(choices=[('MALE', 'Male'), ('FEMALE', 'Female')], default='MALE', max_length=6),
        ),
    ]
