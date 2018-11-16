import qrcode
qr = qrcode.QRCode(
    version=10,
    error_correction=qrcode.constants.ERROR_CORRECT_L,
    box_size=10,
    border=4,
)
qr.add_data('https://www.zhihu.com/people/zhu-jj-61/activities')
qr.make(fit=True)

img = qr.make_image(fill_color="black", back_color="white")
# img.save('code2.png')
import base64
from io import BytesIO

buffered = BytesIO()
roiImg = img.save(buffered, 'PNG')
import chardet
print(buffered.getvalue())
print(chardet.detect(buffered.getvalue()))

