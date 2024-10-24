from django.core.mail import send_mail
from django.conf import settings
import secrets
import string
import hashlib
from getpass import getpass
PUNCTUATIONS = "@#$%&"


class MyData:
    username1="LAI"
    code = ""
    password1=""
    email1=""



def send_mail_page(code,email):
    subject=  'Rankdom Login'
    message ='Here is the authentication code. '
    full=message+code
    send_mail(subject, full, settings.EMAIL_HOST_USER, [email])




def generate_password(length=12):
    characters = string.ascii_letters + string.digits + PUNCTUATIONS
    pwd = ''.join(secrets.choice(characters) for _ in range(length))
    print(pwd)
    return pwd




