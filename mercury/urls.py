from django.urls import path
from .views import simulator, views, dashboard, can, stopwatch, event, sensor, \
    sensor_data

app_name = "mercury"
urlpatterns = [
    path("", views.EventAccess.as_view(), name="EventAccess"),
    path("logout/", views.Logout.as_view(), name="logout"),
    path("index", views.HomePageView.as_view(), name="index"),
    path("simulator/", simulator.SimulatorView.as_view(), name="simulator"),
    path("dashboard/", dashboard.DashboardView.as_view(), name="dashboard"),
    path("stopwatch/", stopwatch.StopwatchView.as_view(), name="stopwatch"),
    path("api/can/", can.post, name="can-api"),  # CAN API Ingestion endpoint
    path("can/", can.CANUI.as_view(), name="can-ui"),  # CAN Decoder UI endpoint
    path("event/", event.CreateEventView.as_view(), name="event"),
    path("sensor/", sensor.CreateSensorView.as_view(), name="sensor"),
    path("sensor_data/", sensor_data.SensorDataView.as_view(), name="sensor_data"),
]
