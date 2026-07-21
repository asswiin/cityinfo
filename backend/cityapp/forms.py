from django import forms
from django.contrib.auth.hashers import make_password
import re
from .models import UserProfile


from django import forms
from .models import UserProfile
import re


class UserRegistrationForm(forms.ModelForm):

    confirm_password = forms.CharField(
        widget=forms.PasswordInput()
    )
    class Meta:
        model = UserProfile
        fields = [
            'name',
            'phone',
            'email',
            'password'
        ]
        widgets = {
            'password': forms.PasswordInput()
        }   

#phone validation
    def clean_phone(self):
        phone = self.cleaned_data.get('phone')
        if not re.match(r'^[6-9][0-9]{9}$', phone):
            raise forms.ValidationError(
                "Phone number must contain 10 digits and start with 6, 7, 8, or 9."
            )
        return phone

    def clean_email(self):
        email = self.cleaned_data.get('email')
        allowed_domains = [
            '@gmail.com',
            '@yahoo.com',
            '@outlook.com',
            '@hotmail.com'
        ]

        if not any(
            email.endswith(domain)
            for domain in allowed_domains
        ):
            raise forms.ValidationError(
                "Please enter a valid email address."
            )

        return email

#password validation
    def clean_password(self):
         password = self.cleaned_data.get('password')
         if len(password) < 8:
            raise forms.ValidationError(
                "Password must be at least 8 characters long."
            )
         if not re.search(r'[A-Z]', password):
            raise forms.ValidationError(
                "Password must contain at least one uppercase letter."
            )
         if not re.search(r'[a-z]', password):
            raise forms.ValidationError(
                "Password must contain at least one lowercase letter."
            )
         if not re.search(r'[0-9]', password):
            raise forms.ValidationError(
                "Password must contain at least one number."
            )
         return password

    def clean(self):
        cleaned_data = super().clean()
        password = cleaned_data.get('password')
        confirm_password = cleaned_data.get(
            'confirm_password'
        )
        if password != confirm_password:
            raise forms.ValidationError(
                "Passwords do not match."
            )
        return cleaned_data
    
    def save(self, commit=True):
        user = super().save(commit=False)
        user.password = make_password(
            self.cleaned_data['password']
        )
        if commit:
            user.save()
        return user

class LoginForm(forms.Form):
    username=forms.CharField()
    password=forms.CharField(widget=forms.PasswordInput())