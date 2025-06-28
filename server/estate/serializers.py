from rest_framework import serializers

class RealEstateQuerySerializer(serializers.Serializer):
    prefecture = serializers.CharField(required=True)
    city = serializers.CharField(required=False, allow_blank=True)
    station = serializers.CharField(required=False, allow_blank=True)
    property_type = serializers.CharField(required=False, allow_blank=True)
    layout = serializers.CharField(required=False, allow_blank=True)

class RealEstatePriceSerializer(serializers.Serializer):
    year = serializers.IntegerField()
    average_price = serializers.FloatField()
    transaction_count = serializers.IntegerField()