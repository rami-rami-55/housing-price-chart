from django.urls import path

from .views import EstateAverageView, EstateHistoryView

urlpatterns = [
    path("history/", EstateHistoryView.as_view(), name="estate-history"),
    path("average/", EstateAverageView.as_view(), name="estate-average"),
]
