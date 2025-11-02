from django.urls import path

from .views import EstateAverageView, EstateDetailView

urlpatterns = [
    path('detail/', EstateDetailView.as_view(), name='estate-detail'),
    path('average/', EstateAverageView.as_view(), name='estate-average'),
]