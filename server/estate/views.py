from datetime import datetime

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .services import EstateService


class EstateHistoryView(APIView):
    """今年度の物件の取引履歴情報を取得API"""

    def __init__(self):
        super().__init__()
        self.estate_service = EstateService()

    def post(self, request):
        try:
            data = request.data

            # リクエストデータから個別の引数を取得
            property_type = data.get("propertyType", "")
            structures = data.get("structures", [])
            layouts = data.get("layouts", [])
            station_name = data.get("stationName", "")

            # 必須パラメータのバリデーション
            if not station_name:
                return Response(
                    {"error": "stationName is required"}, status=status.HTTP_400_BAD_REQUEST
                )

            # 期間設定
            current_year = str(datetime.now().year)

            # 物件の取引履歴を取得
            detail_history = self.estate_service.get_estate_detail(
                property_type=property_type,
                structures=structures,
                layouts=layouts,
                station_name=station_name,
                year=current_year,
            )
            return Response({"areas": detail_history}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"error": f"Internal server error: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class EstateAverageView(APIView):
    """指定エリアの四半期別平均価格履歴を取得するAPI"""

    def __init__(self):
        super().__init__()
        self.estate_service = EstateService()

    def post(self, request):
        try:
            data = request.data

            # リクエストデータから引数を取得
            area_conditions = data.get("areaConditions", [])
            duration_in_years = data.get("durationInYears", 1)

            # 必須パラメータのバリデーション
            if not area_conditions:
                return Response(
                    {"error": "areaConditions is required and must not be empty"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # areaConditionsの各要素をバリデーション
            for i, area in enumerate(area_conditions):
                if not area.get("station"):
                    return Response(
                        {"error": f"station is required in areaConditions[{i}]"},
                        status=status.HTTP_400_BAD_REQUEST,
                    )

            # 期間設定
            current_year = datetime.now().year
            years = list(range(current_year - int(duration_in_years), current_year))

            # チャートラベルの作成
            chart_labels = self.estate_service.generate_chart_labels(duration_in_years)

            area_price_list = []
            for area in area_conditions:
                all_year_data = []
                property_type = area.get("propertyType", "")
                structures = area.get("structures", [])
                layouts = area.get("layouts", [])
                station_name = area.get("stationName", "")

                for year in years:
                    target_year_data = self.estate_service.get_estate_detail(
                        property_type=property_type,
                        structures=structures,
                        layouts=layouts,
                        station_name=station_name,
                        year=year,
                    )
                    all_year_data.append({"year": year, "data": target_year_data})

                average_price_list, average_unit_price_list = (
                    self.estate_service.get_average_price_history(chart_labels, all_year_data)
                )
                area_price_list.append(
                    {
                        "areaName": station_name,
                        "priceData": average_price_list,
                        "unitPriceData": average_unit_price_list,
                    }
                )

            response = {
                "duration": duration_in_years,
                "totalQuarters": len(chart_labels),
                "chartLabels": chart_labels,
                "areas": area_price_list,
            }

            return Response(
                response,
                status=status.HTTP_200_OK,
            )

        except Exception as e:
            return Response(
                {"error": f"Internal server error: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
