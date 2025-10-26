import { useCallback, useState } from 'react';
import ChartErrorBoundary from '../features/ChartErrorBoundary';
import ChartTypeSelector from '../features/ChartTypeSelector';
import ComparisonAreaList from '../features/ComparisonAreaList';
import DateRangeSelector from '../features/DateRangeSelector';
import HamburgerMenuButton from '../features/HamburgerMenuButton';
import LocationSelector from '../features/LocationSelector';
import MultiLayoutSelector from '../features/MultiLayoutSelector';
import MultiPropertyStatusSelector from '../features/MultiPropertyStatusSelector';
import MultiPropertyTypeSelector from '../features/MultiPropertyTypeSelector';
import MultiStructureSelector from '../features/MultiStructureSelector';
import RealEstatePriceChart from '../features/RealEstatePriceChart';
import SearchButton from '../features/SearchButton';
import SidebarHeader from '../features/SidebarHeader';
import { AreaData, ChartType, ComparisonArea } from '../types/estate';

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
  const [selectedStructure, setSelectedStructure] = useState('wood');
  const [selectedPropertyStatus, setSelectedPropertyStatus] = useState('new');
  const [selectedPropertyType, setSelectedPropertyType] = useState('mansion');
  const [selectedPrefecture, setSelectedPrefecture] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedStation, setSelectedStation] = useState('');
  const [selectedLayout, setSelectedLayout] = useState('1R_1K');
  const [startYear, setStartYear] = useState('2024');
  const [endYear, setEndYear] = useState('2024');

  // 複数選択用の状態
  const [selectedStructures, setSelectedStructures] = useState<string[]>(['wood']);
  const [selectedLayouts, setSelectedLayouts] = useState<string[]>(['1R_1K']);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>(['mansion']);
  const [selectedPropertyStatuses, setSelectedPropertyStatuses] = useState<string[]>(['new']);

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

  const handleStructureChange = (structure: string) => {
    setSelectedStructure(structure);
    console.log('Selected structure:', structure);
  };

  const handlePropertyStatusChange = (status: string) => {
    setSelectedPropertyStatus(status);
    console.log('Selected property status:', status);
  };

  const handlePropertyTypeChange = (type: string) => {
    setSelectedPropertyType(type);
    console.log('Selected property type:', type);
  };

  const handlePrefectureChange = (prefecture: string) => {
    setSelectedPrefecture(prefecture);
    console.log('Selected prefecture:', prefecture);
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    console.log('Selected city:', city);
  };

  const handleStationChange = (station: string) => {
    setSelectedStation(station);
    console.log('Selected station:', station);
  };

  const handleLayoutChange = (layout: string) => {
    setSelectedLayout(layout);
    console.log('Selected layout:', layout);
  };

  const handleStartYearChange = (year: string) => {
    setStartYear(year);
    console.log('Selected start year:', year);
  };

  const handleEndYearChange = (year: string) => {
    setEndYear(year);
    console.log('Selected end year:', year);
  };

  const handleSearch = () => {
    console.log('Search button clicked');
    // 実際の検索ロジックをここに実装
  };

  // 複数選択用のハンドラー
  const handleStructuresChange = (structures: string[]) => {
    setSelectedStructures(structures);
    console.log('Selected structures:', structures);
  };

  const handleLayoutsChange = (layouts: string[]) => {
    setSelectedLayouts(layouts);
    console.log('Selected layouts:', layouts);
  };

  const handlePropertyTypesChange = (types: string[]) => {
    setSelectedPropertyTypes(types);
    console.log('Selected property types:', types);
  };

  const handlePropertyStatusesChange = (statuses: string[]) => {
    setSelectedPropertyStatuses(statuses);
    console.log('Selected property statuses:', statuses);
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
        <SidebarHeader />

        <div className="space-y-6">
          <MultiPropertyTypeSelector
            selectedTypes={selectedPropertyTypes}
            onTypesChange={handlePropertyTypesChange}
          />

          <MultiPropertyStatusSelector
            selectedStatuses={selectedPropertyStatuses}
            onStatusesChange={handlePropertyStatusesChange}
          />

          <MultiStructureSelector
            selectedStructures={selectedStructures}
            onStructuresChange={handleStructuresChange}
          />

          <div className="mt-4">
            <MultiLayoutSelector
              selectedLayouts={selectedLayouts}
              onLayoutsChange={handleLayoutsChange}
            />
          </div>

          <LocationSelector
            selectedPrefecture={selectedPrefecture}
            selectedCity={selectedCity}
            selectedStation={selectedStation}
            onPrefectureChange={handlePrefectureChange}
            onCityChange={handleCityChange}
            onStationChange={handleStationChange}
          />

          <DateRangeSelector
            startYear={startYear}
            endYear={endYear}
            onStartYearChange={handleStartYearChange}
            onEndYearChange={handleEndYearChange}
          />

          <SearchButton onSearch={handleSearch} />

          <ComparisonAreaList
            comparisonAreas={comparisonAreas}
            onToggleAreaSelection={toggleAreaSelection}
            onRemoveArea={removeArea}
            getColorHex={getColorHex}
          />
        </div>
      </div>

      {/* ハンバーガーメニューボタン（モバイル用） */}
      <HamburgerMenuButton isSidebarOpen={isSidebarOpen} onToggleSidebar={toggleSidebar} />

      {/* メインコンテンツ */}
      <main className="main-content flex-1 p-6 flex flex-col min-w-0 bg-gray-100">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">分析グラフ</h2>

        {/* グラフ切り替えタブ */}
        <ChartTypeSelector chartType={chartType} onChartTypeChange={setChartType} />

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
