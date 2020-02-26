import logging

from django.contrib import messages
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.views.generic import TemplateView

from mercury.models import EventCodeAccess
from ..event_check import require_event_code

from mercury.forms import EventForm

log = logging.getLogger(__name__)
log.setLevel(logging.ERROR)

class CreateEventView(TemplateView):
    """This is the view for creating a new event."""
    template_name = "event.html"

    @require_event_code
    def get(self, request, *args, **kwargs):
        event_form = EventForm()
        context = {
            "event_form": event_form
        }
        return render(request, self.template_name, context)

    @require_event_code
    def post(self, request, *args, **kwargs):
    	return