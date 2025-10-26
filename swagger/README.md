# Housing Price Analysis API

不動産価格分析ダッシュボード用の REST API 仕様書です。

## ファイル構成

- `housing-price-api.yaml` - OpenAPI 3.0 形式の API 仕様書
- `api-samples.json` - API リクエスト・レスポンスのサンプルデータ
- `README.md` - このファイル

## API 概要

### エンドポイント一覧

#### 1. エリア検索 (`POST /areas/search`)

- 物件タイプ、構造、間取り、地域などの条件に基づいて比較可能なエリアを検索
- 複数の条件でフィルタリング可能

#### 2. 価格データ取得 (`GET /price-data/{areaId}`)

- 指定されたエリアの価格推移データを期間指定で取得
- チャート表示用のラベルと価格データを提供

#### 3. 取引履歴検索 (`POST /transactions/history`)

- 指定された条件に基づいて過去の取引履歴を検索
- ページネーション対応

#### 4. 地域情報取得

- `GET /locations/prefectures` - 都道府県一覧
- `GET /locations/stations` - 最寄り駅・地区一覧

#### 5. 市場サマリー (`GET /market/summary`)

- 全体的な市場動向のサマリー情報

## データ構造

### 主要なスキーマ

- **AreaInfo** - エリア情報（ID、名前、座標、市場情報）
- **PriceDataResponse** - 価格推移データ（チャートラベル、価格配列）
- **TransactionRecord** - 取引記録（価格、間取り、構造、面積など）
- **LocationInfo** - 地域情報（都道府県、市区町村、駅・地区）

### 列挙型

- **propertyTypes**: `mansion`（マンション）, `house`（戸建て）
- **propertyStatuses**: `new`（新築）, `used`（中古）
- **structures**: `wood`（木造）, `RC`（鉄筋コンクリート）, `SRC`（鉄骨鉄筋コンクリート）
- **layouts**: `1R_1K`, `1DK`, `2K`, `2DK`, `3LDK`, `4LDK_plus`

## サンプルリクエスト

### エリア検索

```bash
curl -X POST "http://localhost:8000/api/areas/search" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-api-key" \
  -d '{
    "propertyTypes": ["mansion"],
    "propertyStatuses": ["new"],
    "structures": ["wood"],
    "layouts": ["2K", "2DK"],
    "prefecture": "tokyo",
    "city": "setagaya",
    "durationInYears": 3
  }'
```

### 価格データ取得

```bash
curl -X GET "http://localhost:8000/api/price-data/area-tokyo-setagaya-001?duration=3" \
  -H "X-API-Key: your-api-key"
```

### 取引履歴検索

```bash
curl -X POST "http://localhost:8000/api/transactions/history" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-api-key" \
  -d '{
    "areaIds": ["area-tokyo-setagaya-001"],
    "propertyTypes": ["mansion"],
    "limit": 20,
    "offset": 0
  }'
```

## Swagger UI での確認方法

### オンライン版（Swagger Editor）

1. [Swagger Editor](https://editor.swagger.io/) にアクセス
2. `housing-price-api.yaml` の内容をコピー＆ペースト
3. 右側のプレビューで API 仕様を確認

### ローカル環境での Swagger UI 起動

#### Docker を使用する場合

```bash
# Swagger UIをDockerで起動
docker run -p 8080:8080 \
  -e SWAGGER_JSON=/app/housing-price-api.yaml \
  -v $(pwd):/app \
  swaggerapi/swagger-ui

# ブラウザで http://localhost:8080 にアクセス
```

#### Node.js swagger-ui-express を使用する場合

```bash
npm install swagger-ui-express express js-yaml

# server.js を作成して以下を記述
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('js-yaml');
const fs = require('fs');

const app = express();
const swaggerDocument = YAML.load(fs.readFileSync('./housing-price-api.yaml', 'utf8'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, () => {
  console.log('Swagger UI available at http://localhost:3000/api-docs');
});

# 実行
node server.js
```

## 認証

API は`X-API-Key`ヘッダーによる API キー認証を使用します。

```
X-API-Key: your-api-key-here
```

## エラーハンドリング

すべてのエラーレスポンスは以下の形式で返されます：

```json
{
  "error": "エラーメッセージ",
  "code": "エラーコード",
  "details": {
    "追加情報": "詳細"
  }
}
```

### 主要な HTTP ステータスコード

- `200 OK` - 正常処理
- `400 Bad Request` - リクエストパラメータ不正
- `401 Unauthorized` - 認証エラー
- `404 Not Found` - リソースが見つからない
- `500 Internal Server Error` - サーバーエラー

## フロントエンド統合例

### TypeScript 型定義

```typescript
// API型定義例
interface AreaSearchRequest {
  propertyTypes: ("mansion" | "house")[];
  propertyStatuses?: ("new" | "used")[];
  structures?: ("wood" | "RC" | "SRC")[];
  layouts?: string[];
  prefecture?: string;
  city?: string;
  station?: string;
  durationInYears: 1 | 3 | 5 | 10;
}

interface AreaInfo {
  id: string;
  name: string;
  districtName: string;
  prefecture: string;
  city: string;
  station: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  marketInfo: {
    averagePrice: number;
    averageUnitPrice: number;
    transactionCount: number;
  };
}
```

### React/Axios での使用例

```typescript
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "X-API-Key": process.env.REACT_APP_API_KEY,
  },
});

// エリア検索
const searchAreas = async (request: AreaSearchRequest): Promise<AreaInfo[]> => {
  const response = await apiClient.post<{ areas: AreaInfo[] }>(
    "/areas/search",
    request
  );
  return response.data.areas;
};

// 価格データ取得
const getPriceData = async (areaId: string, duration: number) => {
  const response = await apiClient.get(`/price-data/${areaId}`, {
    params: { duration },
  });
  return response.data;
};
```

## 今後の拡張予定

- WebSocket 対応（リアルタイム価格更新）
- GraphQL API
- 地図データ統合 API
- 予測分析 API
- バルク操作 API

## 注意事項

- 本 API 仕様は開発段階のものです
- 実際の実装では認証・認可、レート制限、キャッシュ戦略等を考慮してください
- サンプルデータは架空のものです

## Swagger UI の見方・使い方

### 1. Swagger UI の起動方法

まず、Swagger UI を起動して API 仕様を確認しましょう。

#### オンライン版（最も簡単）

1. [Swagger Editor](https://editor.swagger.io/) にアクセス
2. 左側のエディタに `housing-price-api.yaml` の内容をコピー＆ペースト
3. 右側に API 仕様が自動で表示されます

#### ローカルで Docker 使用

```bash
# プロジェクトのswaggerディレクトリで実行
cd /Users/yukiy1/Desktop/develop/housing-price-chart/swagger
docker run -p 8080:8080 -v $(pwd):/usr/share/nginx/html swaggerapi/swagger-ui
# ブラウザで http://localhost:8080 にアクセス
```

### 2. Swagger UI の画面構成

#### 📋 **上部ヘッダー部分**

- **API タイトル**: "Housing Price Analysis API"
- **説明**: API の概要説明
- **バージョン**: "1.0.0"
- **サーバー情報**: 開発・本番環境の URL

#### 🏷️ **タグ別グループ表示**

API エンドポイントは機能別にタグでグループ化されています：

- **Areas** - エリア検索・管理
- **Price Data** - 価格データ取得
- **Transactions** - 取引履歴
- **Locations** - 地域情報
- **Market** - 市場情報

#### 📝 **各エンドポイントの表示**

各エンドポイントには以下の情報が表示されます：

1. **HTTP メソッド** (GET, POST 等) と **パス**
2. **概要** (summary)
3. **詳細説明** (description)
4. **パラメータ** (Parameters)
5. **リクエストボディ** (Request Body)
6. **レスポンス例** (Responses)

### 3. エンドポイントの詳細確認方法

#### ステップ 1: エンドポイントをクリック

例：`POST /areas/search` をクリックすると詳細が展開されます

#### ステップ 2: 各セクションを確認

**🔍 Parameters（パラメータ）**

- パス、クエリ、ヘッダーパラメータの一覧
- 必須/任意の区別
- データ型と制約

**📤 Request Body（リクエストボディ）**

- POST や PUT で送信する JSON の構造
- `Schema` タブ：データ構造の定義
- `Example` タブ：実際の送信例

**📥 Responses（レスポンス）**

- HTTP ステータスコード別のレスポンス
- `200 OK`：正常時のレスポンス
- `400 Bad Request`：エラー時のレスポンス
- 各レスポンスの `Schema` と `Example` を確認可能

### 4. API テスト機能の使い方

Swagger UI では実際に API をテストできます：

#### ステップ 1: 「Try it out」ボタンをクリック

エンドポイントの詳細画面で右上の青い「Try it out」ボタンを押します

#### ステップ 2: パラメータを入力

- **パスパラメータ**: URL の`{areaId}`などを入力
- **クエリパラメータ**: `duration=3` などを入力
- **リクエストボディ**: JSON データを編集

#### ステップ 3: 「Execute」ボタンをクリック

実際に API リクエストが送信されます

#### ステップ 4: レスポンス確認

- **Response body**: 実際のレスポンスデータ
- **Response headers**: HTTP ヘッダー情報
- **Response code**: HTTP ステータスコード

### 5. スキーマ（データ構造）の確認方法

#### Models セクション

ページ下部の「Models」セクションで全データ構造を確認できます：

**📋 AreaSearchRequest**

```json
{
  "propertyTypes": ["mansion"], // 必須：物件タイプ
  "propertyStatuses": ["new"], // 任意：新築/中古
  "structures": ["wood"], // 任意：構造
  "layouts": ["2K", "2DK"], // 任意：間取り
  "prefecture": "tokyo", // 任意：都道府県
  "city": "setagaya", // 任意：市区町村
  "durationInYears": 3 // 必須：期間
}
```

**📊 AreaInfo（レスポンス）**

```json
{
  "id": "area-1",
  "name": "東京都世田谷区",
  "coordinates": {
    "latitude": 35.6466,
    "longitude": 139.6554
  },
  "marketInfo": {
    "averagePrice": 5200,
    "averageUnitPrice": 80.5,
    "transactionCount": 156
  }
}
```

### 6. 認証設定

API Key 認証を使用する場合：

1. 右上の「🔒 Authorize」ボタンをクリック
2. `ApiKeyAuth` セクションに API キーを入力
3. 「Authorize」をクリック
4. 以降のリクエストに自動で API キーが付与されます

### 7. 実用的な活用方法

#### 🔧 **開発時の使い方**

1. **API 仕様確認**: データ構造や必須パラメータを確認
2. **テストデータ作成**: Example 値を参考にテストデータを作成
3. **エラーケース確認**: 400/404 エラーのレスポンス形式を確認

#### 📚 **ドキュメントとしての活用**

1. **チーム共有**: フロントエンド・バックエンド間の仕様共有
2. **クライアントコード生成**: コード生成ツールでクライアントライブラリ作成
3. **API 仕様書**: 外部パートナーとの API 仕様書として使用

#### 🧪 **テスト・デバッグ**

1. **手動テスト**: Postman の代わりとして API テスト
2. **レスポンス確認**: 実際の API の動作確認
3. **パラメータ検証**: 各パラメータの効果を確認

### 8. よくある確認ポイント

#### ✅ **API を使う前にチェックすること**

- [ ] 必須パラメータは何か？
- [ ] データ型は正しいか？（string, number, array 等）
- [ ] 列挙型の値は何が使えるか？
- [ ] エラー時のレスポンス形式は？

#### 🔍 **デバッグ時のチェックポイント**

- [ ] リクエストボディの形式は正しいか？
- [ ] 必須フィールドが抜けていないか？
- [ ] 列挙型の値が仕様通りか？
- [ ] API キーは正しく設定されているか？

### 9. エラー解決方法

#### 🚫 **よくあるエラーと対処法**

**400 Bad Request**

- パラメータの型や値をチェック
- 必須フィールドが含まれているか確認
- 列挙型の値が正しいかチェック

**401 Unauthorized**

- API キーが正しく設定されているか確認
- Authorize ボタンで認証情報を入力

**404 Not Found**

- URL パスが正しいかチェック
- パスパラメータの値が存在するか確認

**500 Internal Server Error**

- サーバー側の問題
- 開発チームに問い合わせ

この方法で、Swagger UI を効果的に活用して API 開発を進めることができます！
