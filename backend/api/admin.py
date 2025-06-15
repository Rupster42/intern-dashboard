from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, Department

# Register your models here.

# Registering CustomUser
@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ("username", "email", "is_active", "is_staff", "department", "country",)
    fieldsets = UserAdmin.fieldsets + (
        ("Custom Fields", {"fields": ("department",)}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        ("Custom Fields", {"fields": ("department", "country")}),
    )

# Registering Department
@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        return request.user.is_superuser

    def has_change_permission(self, request, obj=None):
        return request.user.is_superuser

    def has_delete_permission(self, request, obj=None):
        return request.user.is_superuser
