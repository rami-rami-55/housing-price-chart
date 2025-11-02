import logging
import os
from typing import Dict, Optional

import geopandas as gpd
import requests
from django.conf import settings

logger = logging.getLogger(__name__)


class RealEstateRepository:
    def get_estate_detail_data(self, year: str, station_code: str) -> Dict:
        """不動産取引データを取得"""
        token = settings.MLIT_API_TOKEN
        url = settings.MLIT_API_ENDPOINT
        params = {"year": year, "priceClassification": "01", "station": station_code}

        try:
            response = requests.get(
                url,
                params=params,
                headers={
                    "Ocp-Apim-Subscription-Key": token,
                },
            )

            response.raise_for_status()
            api_response = response.json()

            # data配列の中身だけを返却（エラーハンドリング付き）
            if api_response.get("status") == "OK" and "data" in api_response:
                return api_response["data"]
            else:
                logger.warning(
                    f"API response error: status={api_response.get('status', 'Unknown')}"
                )
                return []

        except requests.exceptions.RequestException as e:
            logger.error(f"API request failed: {str(e)}")
            return []


class StationCodeRepository:
    def get_station_code_from_shapefile(cls, station_name: str) -> Optional[str]:
        """Shapefileから駅名を検索してN02_005cコードを取得"""

        try:
            # プロジェクトルートからstationsディレクトリのパスを構築
            base_dir = getattr(settings, "BASE_DIR", os.path.dirname(os.path.dirname(__file__)))
            shapefile_path = os.path.join(
                os.path.dirname(base_dir), "stations", "N02-22_Station.shp"
            )

            # Shapefileを読み込み（UTF-8エンコーディングを指定）
            gdf = gpd.read_file(shapefile_path, encoding="utf-8")

            # 駅名で検索
            target_station = gdf[gdf["N02_005"] == station_name]
            return target_station.iloc[0]["N02_005c"] if not target_station.empty else None

        except Exception as e:
            logger.error(f"Error reading Shapefile for station '{station_name}': {str(e)}")
            return None
