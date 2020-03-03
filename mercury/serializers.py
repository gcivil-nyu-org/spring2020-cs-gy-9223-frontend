from rest_framework import serializers
from mercury.models import CustomSensor


class SensorSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomSensor
        depth = 1
        fields = "__all__"
