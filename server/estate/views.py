from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import requests
from .serializers import RealEstateQuerySerializer, RealEstatePriceSerializer

class RealEstatePriceView(APIView):
    def post(self, request):
        serializer = RealEstateQuerySerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        # Here we would make a request to the MLIT API
        # For now, returning mock data as the actual API integration would require API keys
        mock_data = [
            {"year": 2020, "average_price": 35000000, "transaction_count": 150},
            {"year": 2021, "average_price": 36500000, "transaction_count": 180},
            {"year": 2022, "average_price": 38000000, "transaction_count": 165},
            {"year": 2023, "average_price": 39500000, "transaction_count": 200},
        ]
        
        result_serializer = RealEstatePriceSerializer(data=mock_data, many=True)
        if result_serializer.is_valid():
            return Response(result_serializer.data)
        return Response(result_serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
