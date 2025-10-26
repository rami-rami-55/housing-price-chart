import { useCallback, useEffect, useState } from 'react';
import ChartErrorBoundary from '../features/ChartErrorBoundary';
import ChartTypeSelector from '../features/ChartTypeSelector';
import ComparisonAreaList from '../features/ComparisonAreaList';
import DurationSelector from '../features/DurationSelector';
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

// 期間に基づいてチャートラベルを生成する関数
const generateChartLabels = (durationInYears: number): string[] => {
  const labels: string[] = [];
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // 1-12

  // 常に10分割に固定
  const totalPoints = 10;

  // 終了日（現在）から開始日を計算
  const endYear = currentYear;
  const endMonth = currentMonth;

  // 開始日を計算（期間を月数に変換）
  const totalMonths = durationInYears * 12;
  let startYear = endYear;
  let startMonth = endMonth - totalMonths + 1;

  // 年の調整
  while (startMonth <= 0) {
    startYear--;
    startMonth += 12;
  }

  // 期間を10等分して均等にラベルを配置
  for (let i = 0; i < totalPoints; i++) {
    const progress = i / (totalPoints - 1); // 0から1の進行度
    const monthsFromStart = Math.round(progress * (totalMonths - 1));

    let targetYear = startYear;
    let targetMonth = startMonth + monthsFromStart;

    // 年の調整
    while (targetMonth > 12) {
      targetYear++;
      targetMonth -= 12;
    }

    labels.push(`${targetYear}/${targetMonth}月`);
  }

  return labels;
};

const initialChartLabels = generateChartLabels(1);

const initialAreas: ComparisonArea[] = [
  {
    id: 'area-1',
    name: '東京都世田谷区',
    color: 'red',
    selected: true,
    propertyType: 'マンション',
    propertyStatus: '新築',
    structure: '木造',
    layouts: ['2K', '2DK'],
    startYear: '2023',
    endYear: '2024',
    durationInYears: 1,
  },
  {
    id: 'area-2',
    name: '神奈川県目黒区',
    color: 'green',
    selected: true,
    propertyType: 'マンション',
    propertyStatus: '中古',
    structure: 'RC',
    layouts: ['1R_1K'],
    startYear: '2023',
    endYear: '2024',
    durationInYears: 1,
  },
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

  // 動的なチャートラベルの状態
  const [chartLabels, setChartLabels] = useState<string[]>(initialChartLabels);

  // 複数選択用の状態
  const [selectedStructures, setSelectedStructures] = useState<string[]>(['wood']);
  const [selectedLayouts, setSelectedLayouts] = useState<string[]>(['1R_1K']);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>(['mansion']);
  const [selectedPropertyStatuses, setSelectedPropertyStatuses] = useState<string[]>(['new']);

  // 期間選択用の状態
  const [selectedDuration, setSelectedDuration] = useState('1');

  // 初期化時にチャートラベルを設定
  useEffect(() => {
    const initialLabels = generateChartLabels(parseInt(selectedDuration));
    setChartLabels(initialLabels);
  }, [selectedDuration]);

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

    // 現在選択されている条件を取得
    const getSelectedConditions = () => {
      return {
        propertyType:
          selectedPropertyTypes.length > 0 ? selectedPropertyTypes[0] : selectedPropertyType,
        propertyStatus:
          selectedPropertyStatuses.length > 0
            ? selectedPropertyStatuses[0]
            : selectedPropertyStatus,
        structure: selectedStructures.length > 0 ? selectedStructures[0] : selectedStructure,
        layouts: selectedLayouts.length > 0 ? selectedLayouts : [selectedLayout],
      };
    };

    const conditions = getSelectedConditions();

    const newArea: ComparisonArea = {
      id: nextAreaId,
      name: areaNames[nextAreaId],
      color: nextColor,
      selected: true,
      propertyType: conditions.propertyType,
      propertyStatus: conditions.propertyStatus,
      structure: conditions.structure,
      layouts: conditions.layouts,
      startYear: startYear,
      endYear: endYear,
      durationInYears: parseInt(selectedDuration),
    };

    setComparisonAreas((prev) => [...prev, newArea]);
  }, [
    comparisonAreas,
    selectedPropertyType,
    selectedPropertyStatus,
    selectedStructure,
    selectedLayout,
    selectedPropertyTypes,
    selectedPropertyStatuses,
    selectedStructures,
    selectedLayouts,
    startYear,
    endYear,
    selectedDuration,
  ]);

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

  const handleDurationChange = (duration: string) => {
    setSelectedDuration(duration);
    console.log('Selected duration:', duration);

    // チャートラベルを新しい期間に基づいて更新
    const newChartLabels = generateChartLabels(parseInt(duration));
    setChartLabels(newChartLabels);
    console.log('Updated chart labels:', newChartLabels);

    // 期間変更時に全ての比較エリアの期間表示を更新
    const updatedAreas = comparisonAreas.map((area) => ({
      ...area,
      durationInYears: parseInt(duration),
    }));
    console.log('Updated areas with new duration:', updatedAreas);
    setComparisonAreas(updatedAreas);
  };

  // 期間選択に基づいて期間文字列を生成するヘルパー関数
  const getDurationText = (durationInYears: number): string => {
    const durationOptions: Record<number, string> = {
      1: '直近1年',
      3: '直近3年',
      5: '直近5年',
      10: '直近10年',
    };
    return durationOptions[durationInYears] || `直近${durationInYears}年`;
  };

  // 現在の年から期間に基づいて開始年・終了年を計算
  const getYearRange = (durationInYears: number): { startYear: number; endYear: number } => {
    const currentYear = new Date().getFullYear();
    const endYear = currentYear;
    const startYear = currentYear - durationInYears + 1;
    return { startYear, endYear };
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

          <SearchButton onSearch={handleSearch} />

          <ComparisonAreaList
            comparisonAreas={comparisonAreas}
            onToggleAreaSelection={toggleAreaSelection}
            onRemoveArea={removeArea}
            getColorHex={getColorHex}
            getDurationText={getDurationText}
            getYearRange={getYearRange}
          />
        </div>
      </div>

      {/* ハンバーガーメニューボタン（モバイル用） */}
      <HamburgerMenuButton isSidebarOpen={isSidebarOpen} onToggleSidebar={toggleSidebar} />

      {/* メインコンテンツ */}
      <main className="main-content flex-1 p-6 flex flex-col min-w-0 bg-gray-100">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">分析グラフ</h2>

        {/* 期間選択（右上に配置） */}
        <div className="mb-4">
          <DurationSelector
            selectedDuration={selectedDuration}
            onDurationChange={handleDurationChange}
          />
        </div>

        {/* グラフ切り替えタブ */}
        <ChartTypeSelector chartType={chartType} onChartTypeChange={setChartType} />

        {/* グラフコンポーネント */}
        <ChartErrorBoundary>
          <RealEstatePriceChart
            chartType={chartType}
            comparisonAreas={comparisonAreas}
            areaMasterData={areaMasterData}
            chartLabels={chartLabels}
          />
        </ChartErrorBoundary>
      </main>
    </div>
  );
};

export default Dashboard;
