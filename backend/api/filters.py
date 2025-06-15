import django_filters
from .models import CustomUser

class UserFilter(django_filters.FilterSet):
    class Meta:
        model = CustomUser
        fields = {
            'department': ['exact'], 
            'country': ['exact'], 
            'is_staff': ['exact'],
            'first_name': ['exact', 'icontains'],
            'username': ['exact', 'icontains']
        }