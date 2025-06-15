from rest_framework import serializers
from .models import CustomUser, Department
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# Department Serializer
class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['id', 'name', 'description', 'base_salary']

# Serializer to create a new user
class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password', 'department', 'country']
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user
    
# Serializer to fetch all users
class UserListSerializer(serializers.ModelSerializer):
    department = DepartmentSerializer( read_only=True) 

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'first_name', 'department', 'country', 'date_joined','is_staff']

# Serializer to fetch a single user
class UserDetailSerializer(serializers.ModelSerializer):
    department = DepartmentSerializer(read_only=True)

    class Meta:
        model = CustomUser
        fields = [
            'id', 'username', 'first_name', 'last_name', 'email', 'department', 'country',
            'hit_count', 'profile_pic', 'bio', 'phone', 'last_login', 'date_joined'
        ]
        read_only_fields = ['last_login', 'date_joined', 'hit_count']

# Custom Serializer for obtaining hit_count and last_login
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        user = self.user
        user.increment_hit_count()

        return data
    
