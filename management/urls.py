from django.urls import path
from . import views

urlpatterns = [
    path('electronicCertificate.html', views.certificate_detail, name='certificate'),
    path('update', views.update_md5, name='update')
]
