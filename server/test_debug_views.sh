#!/bin/bash
echo "api/estate/historyのテスト"
curl -X POST http://localhost:8000/api/estate/history/ \
  -H "Content-Type: application/json" \
  -d '{
    "propertyType": "中古マンション等",
    "structures": [
      "ＳＲＣ"
    ],
    "layouts": [
      "２ＤＫ"
    ],
    "station": "北千住"
  }' | python -m json.tool


echo "api/estate/averageのテスト"
curl -X POST http://localhost:8000/api/estate/average/ \
  -H "Content-Type: application/json" \
  -d '{
    "areaConditions": [
      {
        "propertyType": "中古マンション等",
        "structures": ["ＳＲＣ", "ＲＣ"],
        "layouts": ["２ＤＫ", "１Ｋ"],
        "station": "北千住"
      },
      {
        "propertyType": "中古マンション等",
        "structures": ["ＳＲＣ"],
        "layouts": ["１ＬＤＫ"],
        "station": "新宿"
      }
    ],
    "durationInYears": 3
  }' | python -m json.tool
