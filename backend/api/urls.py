from django.urls import path
from .views import DepartmentListView, CreateCustomUserView, UserListView, UserDetailView, DepartmentOptionsView, CountryOptionsView, OtherUserDetailView, DashboardView

urlpatterns = [
    path('departments/', DepartmentListView.as_view(), name='department-list'),
    path('users/', UserListView.as_view(), name='user-list'),
    path('users/create/', CreateCustomUserView.as_view(), name='user-create'),
    path('users/me/', UserDetailView.as_view(), name='my-user-create'),
    path('users/<int:pk>/', OtherUserDetailView.as_view(), name='user-detail'),
    path('departments/options/', DepartmentOptionsView.as_view(), name='department-options'),
    path('countries/options/', CountryOptionsView.as_view(), name='country-options'),
    path('teams/', DashboardView.as_view(), name='dashboard-stats')
]
