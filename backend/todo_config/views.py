from rest_framework.viewsets import ModelViewSet
from .models import Tasks
from .serializers import TaskSerializer

"""
functionality
1.  add time and date for task completion
1.1 implement jwt
1.2 add creation time and date of task with the created user
2.  display tasks in ascending order of time and date
3.  filter for a specific date
4.  search a specific task
5.  have low/medium/hign priority
6.  have mui icons for each task
7.  step wise task - like a stepper
  7.00   two types of task, simple or workflow type
  7.01   like having a main task as 1. and having 1.1,1.2,1.3
8.  show like a dashboard count
  8.01   based on priority
  8.02   not started/in progress/completed
  8.03   graphs
9.  can upload excel to create a tasklist
10. can have multiple users
11. maintain hierarchy for users
12. can visualize tasks of users below/tagged under a superior user
13. can send mail to complete a specific task if not sompleted
14. can have tag(s) for all tasks
15. superior user can create task for users below/tagged under them.
"""

class TaskViewSet(ModelViewSet):
    queryset = Tasks.objects.all()
    serializer_class = TaskSerializer
