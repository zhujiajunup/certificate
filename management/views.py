import logging

from django.shortcuts import render, get_object_or_404

from .models import CertificateInfo

# Create your views here.
logger = logging.getLogger(__name__)


def plugin_redirect(request):
    logger.info(request.path)
    pass


def certificate_detail(request):
    md5_str = request.GET.get('id')
    md5_str = md5_str.replace('-', '')
    logger.info("get identification number: %s" % md5_str)
    certificate_info = get_object_or_404(CertificateInfo, md_5=md5_str)
    # CertificateInfo.objects.get(identificationNumber=id_card_no)
    logger.info(certificate_info)
    return render(request, 'management/electronicCertificate.html', {'certificate_info': certificate_info})
