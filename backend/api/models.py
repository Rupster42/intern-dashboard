from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

# Core auth models : username, email, password
# Personal Info: first name, last name, country, profile_pic, bio
# Permissions: is_admin, is_active, is_superuser
# Tracking: last_login, date_joined, hit_count
# Organisational: department, salary

# Create your models here.

# Department Model
class Department(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField()
    base_salary = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name

# User Model
class CustomUser(AbstractUser):   
    class CountryChoices(models.TextChoices):
        CHINA = 'China', 'China'
        JAPAN = 'Japan', 'Japan'
        INDIA = 'India', 'India'
        ISRAEL = 'Israel', 'Israel'
        RUSSIA = 'Russia', 'Russia'
        USA = 'USA', 'USA'
        OTHER = 'Other', 'Other'

    email = models.EmailField(unique=True)
    department = models.ForeignKey(Department, null=True, blank=True, on_delete=models.SET_NULL)
    country = models.CharField(max_length=50, choices=CountryChoices.choices, default=CountryChoices.OTHER)
    hit_count = models.IntegerField(default=0)

    profile_pic = models.ImageField(upload_to='profile_pics/', null=True, blank=True)
    bio = models.TextField(null=True, blank=True)
    phone = models.CharField(max_length=15, null=True, blank=True)

    def increment_hit_count(self):
        self.hit_count += 1
        self.last_login = timezone.now()
        self.save(update_fields=['hit_count', 'last_login'])

    def __str__(self):
        return self.username
    


