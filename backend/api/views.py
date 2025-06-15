from rest_framework import generics
from .models import CustomUser, Department
from .serializers import CustomUserSerializer, UserListSerializer, UserDetailSerializer, DepartmentSerializer, CustomTokenObtainPairSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

# for images
from rest_framework.parsers import MultiPartParser, FormParser

# filtering
from .filters import UserFilter

# search filter
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend

# for dashboard 
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Count, Sum
from django.db.models.functions import TruncMonth
from django.utils.timezone import now
from collections import defaultdict

# Create your views here.

# View to fetch all departments
class DepartmentListView(generics.ListAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes = [AllowAny]

# View to create a new user
class CreateCustomUserView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [AllowAny]

# View to fetch all users
class UserListView(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserListSerializer
    permission_classes = [AllowAny]
    filterset_class = UserFilter
    filter_backends = [DjangoFilterBackend, # field based filter based on the custom filter UserFilter I defined 
                       filters.SearchFilter, # enables text search 
                       filters.OrderingFilter]
    search_fields = ['username', 'first_name', 'last_name']
    ordering_fields = ['date_joined']

# View to fetch a single user
class UserDetailView(generics.RetrieveUpdateAPIView):
    serializer_class = UserDetailSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get_object(self):
        return self.request.user

# View to fetch other people's single user
class OtherUserDetailView(generics.RetrieveAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserDetailSerializer
    permission_classes = [IsAuthenticated]


# View for listing departments dropdown
class DepartmentOptionsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        departments = Department.objects.all().values('id', 'name')
        return Response(departments)
    
# View for listing countries dropdown
class CountryOptionsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        countries = CustomUser.CountryChoices.choices
        return Response([country[0] for country in countries])
    
# View for obtaining JWT token with hit_count and last_login
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

# View for dashboard
class DashboardView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        # data
        total_employees = CustomUser.objects.count()
        total_departments = Department.objects.count()
        total_salary_expenditure = CustomUser.objects.filter(department__isnull=False).aggregate(total_salary=Sum('department__base_salary'))['total_salary'] or 0

        # chart 1 --> employee joining trend (monthly)
        join_trend = CustomUser.objects.annotate(month=TruncMonth('date_joined')).values('month').annotate(
            count=Count('id')
        ).order_by('month')


        # chart 2 --> hit count per user
        user_hit_counts = CustomUser.objects.values('username', 'hit_count')

        # chart 3 --> employees per department
        dept_counts = CustomUser.objects.values('department__name').annotate(count=Count('id'))

        # chart 4 --> employees per country
        country_counts = CustomUser.objects.values('country').annotate(count=Count('id'))


        # chart 5 --> salary expenditure per department
        salary_by_department = CustomUser.objects.filter(department__isnull=False).values('department__name').annotate(
            expenditure=Sum('department__base_salary')
        )


        return Response({
            'card_data': {
                'total_employees': total_employees,
                'total_departments': total_departments,
                'total_salary_expenditure': total_salary_expenditure,
            },

            'charts_data': {
                'employee_join_trend': list(join_trend),
                'user_hit_counts': list(user_hit_counts),
                'department_counts': list(dept_counts),
                'country_counts': list(country_counts),
                'department_salary_expenditure': list(salary_by_department),

            }
        })
