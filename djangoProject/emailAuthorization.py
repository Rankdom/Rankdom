from django.core.mail import send_mail
from django.conf import settings

def send_mail_page():
    subject=  'Subject here'
    message ='Here is the message.'
    address= 'abdisamad.nuh@outlook.com'
    send_mail(subject, message, settings.EMAIL_HOST_USER, [address])

