from django.urls import path
from .views import RealEstatePriceView

urlpatterns = [
    path('api/prices/', RealEstatePriceView.as_view(), name='real-estate-prices'),
]