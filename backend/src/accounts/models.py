from django.contrib.auth.models import BaseUserManager, AbstractBaseUser

from django.db import models

class UserManager(BaseUserManager):
    def create_user(self, username=None, email=None, first_name=None, last_name=None, password=None):
        """
        Creates and saves a User with the given email, first name, last name and password.
        """
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            username=username,
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,  
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password):
        """
        Creates and saves a superuser with the given email, first name, last name and password.
        """
        user = self.create_user(
            username=username,
            email=email,
            password=password,
        )
        user.is_admin = True
        user.is_active = True
        
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    USER_TYPE_CHOICES = (
        (1, 'paticipant'),
        (2, 'business'),
        (3, 'event'),
        (4, 'admin'),
    )

    user_type = models.PositiveSmallIntegerField(choices=USER_TYPE_CHOICES, null=True, blank=True)
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    username = models.CharField(max_length=256, null=True, blank=True)
    first_name = models.CharField(max_length=256)
    last_name = models.CharField(max_length=256)
    is_active = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    password2 = models.CharField(max_length=256, null=True, blank=True)
    objects = UserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    def __unicode__(self):         
        return str(self.email)

    def get_full_name(self):
        
        return "% %" %(self.first_name, self.last_name)

    def get_short_name(self):
        
        return self.first_name

    def get_absolute_url(self):
        return reverse("profile", kwargs={"id":self.id})

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
       
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        
        return self.is_admin
        
class ParticipantProfile(models.Model):
    user = models.ForeignKey('User', on_delete=models.CASCADE)

    def __unicode__(self):         
        return str(self.user)

class BusinessProfile(models.Model):
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    business_name = models.CharField(max_length=256)
    business_url = models.CharField(max_length=256)
    business_phone = models.CharField(max_length=256)
    
    def __unicode__(self):         
        return str(self.user)

class EventProfile(models.Model):
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    account_id = models.CharField(max_length=150,null=True,blank=True)
    
    def __unicode__(self):         
        return str(self.user)

class AdminProfile(models.Model):
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    def __unicode__(self):         
        return str(self.user)

