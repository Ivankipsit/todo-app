from rest_framework import serializers
from .models import Tasks


class TaskSerializer(serializers.ModelSerializer):
    is_draft = serializers.SerializerMethodField()

    class Meta:
        model = Tasks
        fields = ["id", "title", "description", "complete_by", "is_draft", "created_on"]

    def get_is_draft(self, obj):
        """
        Convention for method fields uses the prefix "get_" to indicate
        that the method is used to retrieve the value for a field

        RETURNS : False if object has completed_by, else True
        """
        return obj.complete_by is None
