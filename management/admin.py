from django.contrib import admin
from django.urls import reverse
from django.utils.html import format_html
from django.urls import path
from management.models import CertificateInfo

from django.http import HttpResponse

from certificate.utils import gen_qr_code
from certificate import settings
import os
import random
import string
import logging

# Register your models here.
logger = logging.getLogger(__name__)


@admin.register(CertificateInfo)
class CertificateAdmin(admin.ModelAdmin):
    list_display = ('name',
                    'image_tag',
                    'gender',
                    'identification_number',
                    'certificate_code',
                    'etp_name',
                    'technical_title',
                    'issuing_date',
                    'certificate_validity',
                    'account_actions',)
    search_fields = ('name', 'identification_number', 'certificate_code')

    def process_deposit(self, request, md_5, *args, **kwargs):
        return self.process_action(
            request=request,
            md_5=md_5
        )

    def process_action(self, request, md_5):
        def gen_nsukey():
            keys = []
            for _ in range(226):
                keys = keys + random.sample(string.ascii_letters + string.digits + '%', 1)
            return ''.join(keys)

        info = CertificateInfo.objects.get(md_5=md_5)
        if len(md_5) > 21:
            md_5 = md_5[:8] + '-' + md_5[8:12] + '-' + md_5[12:16] + '-' + md_5[16:20] + '-' + md_5[20:]
        context = settings.APPLICATION_ADDRESS + reverse('management:certificate') + \
                  '?id=' + md_5 + '&nsukey=' + gen_nsukey()
        img = gen_qr_code(context)

        response = HttpResponse(content_type='image/png')
        response['Content-Disposition'] = 'attachment;filename="{0}"'.format('qr-' + info.identification_number + '_' +
                                                                             info.certificate_code + '.jpg')
        img.save(response, 'png')
        return response

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path(
                r'qr_code/<md_5>',
                self.admin_site.admin_view(self.process_deposit),
                name='gen-qr',
            ),
        ]
        return custom_urls + urls

    def account_actions(self, obj):
        return format_html(
            '<a class="button" href="{}">生成二维码</a>&nbsp;',
            reverse('admin:gen-qr', args=[obj.md_5]),
        )

    account_actions.short_description = 'Account Actions'

    pass
