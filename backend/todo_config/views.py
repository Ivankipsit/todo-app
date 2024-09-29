from rest_framework.viewsets import ModelViewSet
from .models import Tasks
from .serializers import TaskSerializer
from rest_framework.response import Response
from django.utils import timezone  # Import timezone to get the current time


class TaskViewSet(ModelViewSet):
    queryset = Tasks.objects.all()
    serializer_class = TaskSerializer

    def list(self, request):
        # Get the original queryset
        queryset = self.get_queryset()
        sorting_parameter = self.request.query_params.get("sorting_parameter")
        sort_by = self.request.query_params.get("sort_by")
        filter_values = request.query_params.getlist("filter")  # Expecting a list

        # Apply filtering based on the filter list
        if filter_values:
            if "overdue" in filter_values:
                # Filter tasks that are overdue
                queryset = queryset.filter(complete_by__lt=timezone.now())

            if "completed" in filter_values:
                # Filter tasks that are completed (assuming you have a `completed` field)
                queryset = queryset.filter(
                    completed=True
                )  # Change according to your field

            if "starred" in filter_values:
                # Filter tasks that are starred (assuming you have a `starred` field)
                queryset = queryset.filter(
                    starred=True
                )  # Change according to your field

        # Apply sorting if sorting parameters are provided
        # http://localhost:8000/tasks/?sorting_parameter=complete_by&sort_by=asc
        if sorting_parameter is not None and sort_by is not None:
            # Check if sorting_parameters is a valid field in the Tasks model
            if sorting_parameter not in [
                field.name for field in Tasks._meta.get_fields()
            ]:
                return Response(
                    {
                        "error": f"'{sorting_parameter}' is not a valid sorting parameter."
                    },
                    status=400,
                )

            if sort_by.lower() == "asc":
                queryset = queryset.order_by(sorting_parameter)
            elif sort_by.lower() == "desc":
                queryset = queryset.order_by("-" + sorting_parameter)
            else:
                return Response(
                    {"error": "Invalid sort_by value. Use 'asc' or 'desc'."}, status=400
                )

        serializer = self.get_serializer(queryset, many=True)
        return Response(data=serializer.data)
