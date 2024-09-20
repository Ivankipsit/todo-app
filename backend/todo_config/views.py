from rest_framework.viewsets import ModelViewSet
from .models import Tasks
from .serializers import TaskSerializer

class TaskViewSet(ModelViewSet):
    queryset = Tasks.objects.all()
    serializer_class = TaskSerializer
