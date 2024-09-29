from django.db import models

# Create your models here.


class Tasks(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField(max_length=150)
    complete_by = models.DateTimeField(null=True)
    completed = models.BooleanField(default=False)
    starred = models.BooleanField(default=False)
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
