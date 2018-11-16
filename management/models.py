from django.db import models
import hashlib
# Create your models here.
from django.utils.html import format_html

class CertificateInfo(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=256, null=False, verbose_name='姓名')
    gender = models.CharField(max_length=4, null=False, verbose_name='性别')
    identification_number = models.CharField(max_length=256, null=False, verbose_name='身份证号')
    etp_name = models.CharField(max_length=256, null=False, verbose_name='企业名称')
    technical_title = models.CharField(max_length=256, null=False, verbose_name='职务')
    certificate_code = models.CharField(max_length=256, null=False, verbose_name='证书编号')
    issuing_date = models.DateField(verbose_name='发证时间')
    certificate_validity = models.DateField(verbose_name='证书有效期')
    image_id = models.ImageField(upload_to='image', verbose_name='证件照')
    md_5 = models.CharField(max_length=16, editable=False)
    # image_id = models.CharField(max_length=256, null=True)

    def image_tag(self):
        return format_html('<img src="/static/media/{}" style="width: 40px;"/>', self.image_id)

    image_tag.short_description = 'Image'

    def save(self, *args, **kwargs):
        self.md_5 = hashlib.md5(self.identification_number.encode(encoding='UTF-8')).hexdigest()
        super(CertificateInfo, self).save(*args, **kwargs)

    class Meta:
        verbose_name = "证书信息"
        verbose_name_plural = "证书信息"

    def __unicode__(self):
        return '证书信息: ' + self.name

    def __str__(self):
        return '证书信息: ' + self.name
