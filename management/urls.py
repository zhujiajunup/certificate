from django.urls import path
from . import views

urlpatterns = [
    path('electronicCertificate.html', views.certificate_detail, name='certificate'),
]
