import logging
import json
from django.views.generic import TemplateView
from django.http import HttpResponse
from ..models import CustomSensor
from ..serializers import SensorSerializer

log = logging.getLogger(__name__)
log.setLevel(logging.ERROR)


class SensorDataView(TemplateView):
    """This is the view for passing sensor data to the frontend."""

    def get(self, request, *args, **kwargs):
        sensors = CustomSensor.objects.all()
        data = dict()

        for sensor in sensors:
            serializer = SensorSerializer(sensor)
            data[sensor.sensor_name] = serializer.data

        print(data)
        return HttpResponse(json.dumps(data))
