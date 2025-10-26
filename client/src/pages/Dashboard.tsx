import React, { useCallback, useState } from 'react';
import RealEstatePriceChart from '../components/features/RealEstatePriceChart';
import { AreaData, ChartType, ComparisonArea } from '../types/estate';

// エラーバウンダリコンポーネント
class ChartErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Chart Error:', error);
    console.error('Error Info:', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex-1 bg-white p-6 rounded-xl shadow-2xl min-h-0 flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-red-600 mb-2">
              チャートの読み込みに失敗しました
            </h3>
            <p className="text-gray-600 mb-4">
              {this.state.error?.message || 'Unknown error occurred'}
            </p>
            <button
              onClick={() => this.setState({ hasError: false, error: undefined })}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              再試行
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const availableColors = ['red', 'green', 'yellow', 'purple', 'indigo', 'pink', 'teal'];

const initialChartLabels = [
  '2024/1月',
  '2024/2月',
  '2024/3月',
  '2024/4月',
  '2024/5月',
  '2024/6月',
  '2024/7月',
  '2024/8月',
  '2024/9月',
  '2024/10月',
];

const initialAreas: ComparisonArea[] = [
  { id: 'area-1', name: '東京都世田谷区', color: 'red', selected: true },
  { id: 'area-2', name: '神奈川県目黒区', color: 'green', selected: true },
];

const areaMasterData: Record<string, AreaData> = {
  'area-1': {
    priceData: [5200, 5250, 5230, 5300, 5350, 5400, 5380, 5450, 5480, 5500],
    unitPriceData: [80, 81, 80, 82, 83, 84, 83, 85, 86, 87],
  },
  'area-2': {
    priceData: [4800, 4850, 4820, 4900, 4950, 5000, 4980, 5050, 5080, 5100],
    unitPriceData: [65, 66, 65, 67, 68, 69, 68, 70, 71, 72],
  },
  'area-3': {
    priceData: [4000, 4100, 4050, 4150, 4200, 4250, 4280, 4300, 4350, 4400],
    unitPriceData: [50, 51, 50, 52, 53, 54, 53, 55, 56, 57],
  },
  'area-4': {
    priceData: [5500, 5550, 5520, 5600, 5650, 5700, 5680, 5750, 5780, 5800],
    unitPriceData: [90, 91, 90, 92, 93, 94, 93, 95, 96, 97],
  },
  'area-5': {
    priceData: [4500, 4550, 4520, 4600, 4650, 4700, 4680, 4750, 4780, 4800],
    unitPriceData: [70, 71, 70, 72, 73, 74, 73, 75, 76, 77],
  },
};

const Dashboard = () => {
  const [chartType, setChartType] = useState<ChartType>('price');
  const [comparisonAreas, setComparisonAreas] = useState<ComparisonArea[]>(initialAreas);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const addArea = useCallback(() => {
    const availableAreaIds = ['area-3', 'area-4', 'area-5'];
    const usedAreaIds = comparisonAreas.map((area) => area.id);
    const nextAreaId = availableAreaIds.find((id) => !usedAreaIds.includes(id));

    if (!nextAreaId) return;

    const usedColors = comparisonAreas.map((area) => area.color);
    const nextColor = availableColors.find((color) => !usedColors.includes(color));

    if (!nextColor) return;

    const areaNames: Record<string, string> = {
      'area-3': '大阪府大阪市',
      'area-4': '東京都港区',
      'area-5': '神奈川県横浜市',
    };

    const newArea: ComparisonArea = {
      id: nextAreaId,
      name: areaNames[nextAreaId],
      color: nextColor,
      selected: true,
    };

    setComparisonAreas((prev) => [...prev, newArea]);
  }, [comparisonAreas]);

  const removeArea = useCallback((areaId: string) => {
    setComparisonAreas((prev) => prev.filter((area) => area.id !== areaId));
  }, []);

  const toggleAreaSelection = useCallback((areaId: string) => {
    setComparisonAreas((prev) =>
      prev.map((area) => (area.id === areaId ? { ...area, selected: !area.selected } : area))
    );
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // 色の取得関数
  const getColorHex = (colorName: string): string => {
    const colors: Record<string, string> = {
      red: '#ef4444',
      green: '#10b981',
      yellow: '#f59e0b',
      purple: '#a855f7',
      indigo: '#6366f1',
      pink: '#ec4899',
      teal: '#14b8a6',
    };
    return colors[colorName] || '#3b82f6';
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* サイドバー */}
      <div
        className={`sidebar w-full md:w-80 bg-white p-6 shadow-xl transform transition-transform duration-300 ease-in-out md:translate-x-0 absolute md:relative z-40 h-full ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-6">不動産価格比較サイト</h1>
        <div className="mt-8 pt-6 border-t border-gray-200" />

        <div className="space-y-6">
          {/* 物件の種類 */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">物件の種類</h2>
            <div className="grid grid-cols-1 gap-2">
              <button className="px-4 py-2 text-left bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                マンション
              </button>
              <button className="px-4 py-2 text-left bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                戸建て
              </button>
              <button className="px-4 py-2 text-left bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                土地
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {/* 中古、新品 */}
            <h2 className="text-lg font-semibold text-gray-700 mb-2">物件の状態</h2>
            <div className="grid grid-cols-2 gap-2">
              <button className="px-3 py-2 text-left bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                新品
              </button>
              <button className="px-3 py-2 text-left bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                中古
              </button>
            </div>
          </div>

          {/* 地域選択 */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">地域</h2>
            <div className="space-y-2">
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>都道府県を選択</option>
                <option>東京都</option>
                <option>神奈川県</option>
                <option>大阪府</option>
              </select>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>市区町村を選択</option>
                <option>世田谷区</option>
                <option>渋谷区</option>
                <option>新宿区</option>
              </select>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>最寄り駅を選択</option>
                <option>渋谷駅</option>
                <option>新宿駅</option>
                <option>池袋駅</option>
              </select>
            </div>
          </div>

          {/* レイアウト */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">レイアウト</h2>
            <div className="grid grid-cols-2 gap-2">
              <button className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                1R
              </button>
              <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                1K
              </button>
              <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                1DK
              </button>
              <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                1LDK
              </button>
              <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                2K
              </button>
              <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                2DK
              </button>
              <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                2LDK
              </button>
              <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                3LDK
              </button>
            </div>
          </div>

          {/* 検索ボタン */}
          <div className="space-y-3">
            <button className="w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-600 transition">
              条件を適用
            </button>
          </div>

          {/* 比較エリア一覧 */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">比較エリア一覧</h2>
            <p className="text-sm text-gray-500 mb-3">クリックでグラフ表示をON/OFF</p>
            <div className="space-y-3">
              {comparisonAreas.map((area) => (
                <div
                  key={area.id}
                  className={`flex items-center justify-between p-3 rounded-lg border-2 transition cursor-pointer ${
                    area.selected
                      ? 'border-blue-400 bg-blue-50'
                      : 'border-gray-200 bg-gray-50 opacity-60'
                  }`}
                  onClick={() => toggleAreaSelection(area.id)}
                >
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-3"
                      style={{
                        backgroundColor: getColorHex(area.color),
                        border: `1px solid ${getColorHex(area.color)}`,
                      }}
                    />
                    <span className="font-medium text-gray-700 truncate">{area.name}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeArea(area.id);
                    }}
                    className="text-red-500 hover:text-red-700 ml-2"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ハンバーガーメニューボタン（モバイル用） */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
      >
        {isSidebarOpen ? (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* メインコンテンツ */}
      <main className="main-content flex-1 p-6 flex flex-col min-w-0 bg-gray-100">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">分析グラフ</h2>

        {/* グラフ切り替えタブ */}
        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => setChartType('price')}
            className={`px-6 py-2 font-semibold rounded-xl shadow-md transition ${
              chartType === 'price'
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-white text-gray-700 hover:bg-gray-200'
            }`}
          >
            取引価格の時系列推移
          </button>
          <button
            onClick={() => setChartType('unit_price')}
            className={`px-6 py-2 font-semibold rounded-xl shadow-md transition ${
              chartType === 'unit_price'
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-white text-gray-700 hover:bg-gray-200'
            }`}
          >
            単価の時系列推移
          </button>
        </div>

        {/* グラフコンポーネント */}
        <ChartErrorBoundary>
          <RealEstatePriceChart
            chartType={chartType}
            comparisonAreas={comparisonAreas}
            areaMasterData={areaMasterData}
            chartLabels={initialChartLabels}
          />
        </ChartErrorBoundary>
      </main>
    </div>
  );
};

export default Dashboard;
