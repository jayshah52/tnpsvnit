
from django.contrib.auth.models import User

from rest_framework import serializers

from .models import Student


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = (
            'id','name', 'personal_mail', 'phone_no', 'roll_no', 'gender', 'dob',
            'department', 'category', 'hometown', 'percentage_ten', 'percentage_twelve',
            'cgpa_s1', 'cgpa_s2', 'cgpa_s3', 'cgpa_s4', 'cgpa_s5', 'cgpa_s6',
            'cgpa_s7', 'cgpa_s8', 'is_coordinator', 'graduation_year', 'resume_link',
        )
