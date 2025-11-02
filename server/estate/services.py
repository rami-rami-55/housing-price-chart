import random
from datetime import datetime
from typing import Any, Dict, List, Tuple

from .repositories import RealEstateRepository, StationCodeRepository


class EstateService:
    """不動産データのビジネスロジック処理"""

    def __init__(self):
        self.estate_repository = RealEstateRepository()
        self.station_repository = StationCodeRepository()

    def get_estate_detail(
        self,
        property_type: str,
        structures: List[str],
        layouts: List[str],
        station_name: str,
        year: str,
    ) -> List[Dict]:
        """物件の取引情報を取得"""
        # 駅コードを取得
        station_code = self.station_repository.get_station_code_from_shapefile(station_name)

        # 物件の全ての取引詳細情報を取得
        all_data = self.estate_repository.get_estate_detail_data(
            year=year,
            station_code=station_code,
        )

        # データを加工
        processed_data = self._process_detail_api_data(all_data, property_type, structures, layouts)

        return processed_data

    def _process_detail_api_data(
        self, api_data: List[Dict], property_type: str, structures: List[str], layouts: List[str]
    ) -> List[Dict]:
        """APIデータを詳細表示用に加工"""

        processed_data = []

        for item in api_data:
            if item.get("PropertyType", "") != property_type:
                continue
            if item.get("Structure", "") not in structures:
                continue
            if item.get("FloorPlan", "") not in layouts:
                continue

            # 国交省APIの項目名に合わせてマッピング
            processed_item = {
                "prefecture": item.get("Prefecture", ""),
                "city": item.get("Municipality", ""),
                "districtName": item.get("DistrictName", ""),
                "tradePrice": item.get("TradePrice", ""),
                "floorPlan": item.get("FloorPlan", ""),
                "area": str(item.get("Area", "")),
                "buildingYear": item.get("BuildingYear", ""),
                "structure": item.get("Structure", ""),
                "cityPlanning": item.get("CityPlanning", ""),
                "coverageRatio": str(item.get("CoverageRatio", "")),
                "floorAreaRatio": str(item.get("FloorAreaRatio", "")),
                "period": item.get("Period", ""),
                "renovation": item.get("Renovation", ""),
            }
            processed_data.append(processed_item)

        return processed_data

    def generate_chart_labels(self, duration_years: str) -> List[str]:
        """チャートラベルを生成"""

        current_date = datetime.now()
        current_year = current_date.year
        current_quarter = (current_date.month - 1) // 3 + 1

        total_quarters = int(duration_years) * 4
        labels = []

        year = current_year
        quarter = current_quarter

        for i in range(total_quarters):
            labels.append(f"{year}年第{quarter}四半期")
            quarter -= 1
            if quarter < 1:
                quarter = 4
                year -= 1

        return list(reversed(labels))

    def get_average_price_history(
        self, chart_labels: List[str], all_year_data: List[Dict]
    ) -> Tuple[List[float], List[float]]:
        """取引詳細情報から四半期別平均価格履歴を取得"""

        # 取引履歴データを四半期別に分類
        quarterly_detail_data = {}
        for label in chart_labels:
            quarterly_detail_data[label] = []

        # 全年度データから四半期別にデータを分類
        for year_data in all_year_data:
            data = year_data.get("data", [])

            # この年度のデータを各四半期に振り分け
            for item in data:
                item_period = item.get("period", "")
                if item_period in quarterly_detail_data:
                    quarterly_detail_data[item_period].append(item)

        # 各四半期の平均価格を計算
        average_price_list = []
        average_unit_price_list = []

        for label in chart_labels:
            period_items = quarterly_detail_data[label]

            average_price, average_unit_price = self._calculate_average_price(period_items)
            average_price_list.append(average_price)
            average_unit_price_list.append(average_unit_price)

        return average_price_list, average_unit_price_list

    def _calculate_average_price(self, detail_data: List[Dict]) -> Tuple[float, float]:
        """詳細データから平均価格と平均単価を計算"""

        total_price = 0.0
        total_unit_price = 0.0
        valid_count = 0

        for item in detail_data:

            # 取引価格を取得（文字列から数値に変換）
            trade_price = float(item.get("tradePrice", "0"))
            area = float(item.get("area", "1"))

            if trade_price > 0 and area > 0:
                total_price += trade_price
                total_unit_price += trade_price / area
                valid_count += 1

        if valid_count > 0:
            avg_price = total_price / valid_count
            avg_unit_price = total_unit_price / valid_count
            return round(avg_price, 1), round(avg_unit_price, 1)
        else:
            return 0.0, 0.0
