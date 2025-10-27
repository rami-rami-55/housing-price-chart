import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import { AreaData, ChartType, ComparisonArea } from '../types/estate';

// 状態の型定義
interface DashboardState {
  // チャート関連
  chartType: ChartType;
  chartLabels: string[];

  // サイドバー
  isSidebarOpen: boolean;

  // 比較エリア
  comparisonAreas: ComparisonArea[];

  // エリアのマスターデータ
  areaMasterData: Record<string, AreaData>;

  // 単一選択の状態
  selectedStructure: string;
  selectedPropertyStatus: string;
  selectedPropertyType: string;
  selectedAreaName: string;
  selectedLayout: string;
  startYear: string;
  endYear: string;

  // 複数選択の状態
  selectedStructures: string[];
  selectedLayouts: string[];
  selectedPropertyStatuses: string[];

  // 期間選択
  selectedDuration: string;

  // 地域選択
  selectedPrefecture: string;
  selectedCity: string;
  selectedStation: string;
}

// アクションの型定義
interface DashboardActions {
  // チャート関連
  setChartType: (type: ChartType) => void;
  setChartLabels: (labels: string[]) => void;

  // サイドバー
  toggleSidebar: () => void;

  // 比較エリア
  addArea: () => void;
  removeArea: (areaId: string) => void;
  toggleAreaSelection: (areaId: string) => void;

  // 色とテキスト取得
  getColorHex: (color: string) => string;
  getDurationText: (duration: number) => string;

  // 単一選択のハンドラー
  handleStructureChange: (structure: string) => void;
  handlePropertyStatusChange: (status: string) => void;
  handlePropertyTypeChange: (type: string) => void;
  handleAreaNameChange: (areaName: string) => void;
  handleLayoutChange: (layout: string) => void;
  handleStartYearChange: (year: string) => void;
  handleEndYearChange: (year: string) => void;

  // 複数選択のハンドラー
  handleStructuresChange: (structures: string[]) => void;
  handleLayoutsChange: (layouts: string[]) => void;
  handlePropertyStatusesChange: (statuses: string[]) => void;

  // 期間選択
  handleDurationChange: (duration: string) => void;

  // 地域選択
  handlePrefectureChange: (prefecture: string) => void;
  handleCityChange: (city: string) => void;
  handleStationChange: (station: string) => void;

  // 検索
  handleSearch: () => void;
}

type DashboardContextType = DashboardState & DashboardActions;

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

interface DashboardProviderProps {
  children: ReactNode;
}

// 期間に応じたダミーデータ生成関数
const generateDummyData = (
  durationInYears: number,
  basePrice: number,
  basePricePerUnit: number
): { priceData: number[]; unitPriceData: number[] } => {
  let totalPoints: number;
  switch (durationInYears) {
    case 1:
      totalPoints = 4; // 1年→4分割
      break;
    case 3:
      totalPoints = 12; // 3年→12分割
      break;
    case 5:
      totalPoints = 15; // 5年→15分割
      break;
    default:
      totalPoints = Math.min(durationInYears * 4, 20);
      break;
  }

  const priceData: number[] = [];
  const unitPriceData: number[] = [];

  // 期間全体での価格変動率（年間約5-10%の上昇を想定）
  const totalGrowthRate = durationInYears * 0.07; // 年7%の上昇

  for (let i = 0; i < totalPoints; i++) {
    const progress = i / (totalPoints - 1);

    // 基本的な上昇トレンドに少しの変動を追加
    const trendGrowth = progress * totalGrowthRate;
    const randomVariation = (Math.random() - 0.5) * 0.05; // ±2.5%の変動
    const growthFactor = 1 + trendGrowth + randomVariation;

    priceData.push(Math.round(basePrice * growthFactor));
    unitPriceData.push(Math.round(basePricePerUnit * growthFactor));
  }

  return { priceData, unitPriceData };
};

// チャートラベル生成関数（四半期ベース）
const generateChartLabels = (durationInYears: number): string[] => {
  const labels: string[] = [];
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentQuarter = Math.floor(currentDate.getMonth() / 3) + 1; // 1-4

  const totalQuarters = durationInYears * 4;

  // 期間に応じた分割数を設定
  let totalPoints: number;
  switch (durationInYears) {
    case 1:
      totalPoints = 4; // 1年→4分割（四半期ごと）
      break;
    case 3:
      totalPoints = 12; // 3年→12分割（四半期ごと）
      break;
    case 5:
      totalPoints = 15; // 5年→15分割
      break;
    default:
      totalPoints = Math.min(totalQuarters, 20); // デフォルトは四半期数、最大20
      break;
  }

  // 期間の開始四半期を計算
  let startYear = currentYear;
  let startQuarter = currentQuarter - totalQuarters + 1;

  while (startQuarter <= 0) {
    startYear--;
    startQuarter += 4;
  }

  for (let i = 0; i < totalPoints; i++) {
    const progress = i / (totalPoints - 1);
    const quartersFromStart = Math.round(progress * (totalQuarters - 1));

    let targetYear = startYear;
    let targetQuarter = startQuarter + quartersFromStart;

    while (targetQuarter > 4) {
      targetYear++;
      targetQuarter -= 4;
    }

    labels.push(`${targetYear}年Q${targetQuarter}`);
  }

  return labels;
};

const initialAreas: ComparisonArea[] = [
  {
    id: 'area-1',
    name: '世田谷',
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
    name: '自由が丘駅',
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

const initialAreaMasterData: Record<string, AreaData> = {
  'area-1': {
    id: 'area-1',
    name: '世田谷',
    priceData: [4900, 5300, 5600, 6000], // 1年間の4四半期
    unitPriceData: [75, 82, 88, 95], // 1年間の4四半期
  },
  'area-2': {
    id: 'area-2',
    name: '自由が丘駅',
    priceData: [4100, 4500, 4800, 5200], // 1年間の4四半期
    unitPriceData: [60, 67, 72, 79], // 1年間の4四半期
  },
};

export const DashboardProvider: React.FC<DashboardProviderProps> = ({ children }) => {
  // 状態管理
  const [chartType, setChartType] = useState<ChartType>('price');
  const [chartLabels, setChartLabels] = useState(generateChartLabels(1));
  const [comparisonAreas, setComparisonAreas] = useState<ComparisonArea[]>(initialAreas);
  const [areaMasterData] = useState<Record<string, AreaData>>(initialAreaMasterData);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 単一選択用の状態
  const [selectedStructure, setSelectedStructure] = useState('wood');
  const [selectedPropertyStatus, setSelectedPropertyStatus] = useState('new');
  const [selectedPropertyType, setSelectedPropertyType] = useState('mansion');
  const [selectedAreaName, setSelectedAreaName] = useState('');
  const [selectedLayout, setSelectedLayout] = useState('1R_1K');
  const [startYear, setStartYear] = useState('2024');
  const [endYear, setEndYear] = useState('2024');

  // 複数選択用の状態
  const [selectedStructures, setSelectedStructures] = useState<string[]>(['wood']);
  const [selectedLayouts, setSelectedLayouts] = useState<string[]>(['1R_1K']);
  const [selectedPropertyStatuses, setSelectedPropertyStatuses] = useState<string[]>(['new']);

  // 期間選択用の状態
  const [selectedDuration, setSelectedDuration] = useState('1');

  // 地域選択用の状態
  const [selectedPrefecture, setSelectedPrefecture] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedStation, setSelectedStation] = useState('');

  // アクションの実装
  const addArea = useCallback(() => {
    if (!selectedAreaName.trim()) {
      console.warn('比較エリアを追加するには、駅名/エリア名を入力してください。');
      return;
    }

    const newAreaId = `area-${Date.now()}`;
    const availableColors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
    const assignedColors = comparisonAreas.map((a) => a.color);
    const availableColor =
      availableColors.find((color) => !assignedColors.includes(color)) || 'gray';

    const newArea: ComparisonArea = {
      id: newAreaId,
      name: selectedAreaName,
      color: availableColor,
      selected: true,
      propertyType: selectedPropertyType || 'マンション',
      propertyStatus: selectedPropertyStatuses[0] || '新築',
      structure: selectedStructures[0] || '木造',
      layouts: selectedLayouts.length > 0 ? selectedLayouts : ['1R_1K'],
      startYear: '2023',
      endYear: '2024',
      durationInYears: parseInt(selectedDuration) || 1,
    };

    setComparisonAreas((prev) => [...prev, newArea]);

    // フォームをクリア
    setSelectedAreaName('');

    console.log('Added new area:', newArea);
  }, [
    selectedAreaName,
    selectedPropertyType,
    selectedPropertyStatuses,
    selectedStructures,
    selectedLayouts,
    selectedDuration,
    comparisonAreas,
  ]);

  const removeArea = useCallback((areaId: string) => {
    setComparisonAreas((prev) => prev.filter((area) => area.id !== areaId));
  }, []);

  const toggleAreaSelection = useCallback((areaId: string) => {
    setComparisonAreas((prev) =>
      prev.map((area) => (area.id === areaId ? { ...area, selected: !area.selected } : area))
    );
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  // 単一選択のハンドラー
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

  const handleAreaNameChange = (areaName: string) => {
    setSelectedAreaName(areaName);
    console.log('Selected area name:', areaName);
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

  // 複数選択のハンドラー
  const handleStructuresChange = (structures: string[]) => {
    setSelectedStructures(structures);
    console.log('Selected structures:', structures);
  };

  const handleLayoutsChange = (layouts: string[]) => {
    setSelectedLayouts(layouts);
    console.log('Selected layouts:', layouts);
  };

  const handlePropertyStatusesChange = (statuses: string[]) => {
    setSelectedPropertyStatuses(statuses);
    console.log('Selected property statuses:', statuses);
  };

  // 期間選択のハンドラー
  const handleDurationChange = (duration: string) => {
    setSelectedDuration(duration);
    setChartLabels(generateChartLabels(parseInt(duration)));
    console.log('Selected duration:', duration);
  };

  // 地域選択のハンドラー
  const handlePrefectureChange = (prefecture: string) => {
    setSelectedPrefecture(prefecture);
    setSelectedCity(''); // 都道府県が変わったら市区町村をリセット
    setSelectedStation(''); // 駅もリセット
    console.log('Selected prefecture:', prefecture);
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setSelectedStation(''); // 市区町村が変わったら駅をリセット
    console.log('Selected city:', city);
  };

  const handleStationChange = (station: string) => {
    setSelectedStation(station);
    console.log('Selected station:', station);
  };

  // 検索ハンドラー
  const handleSearch = () => {
    console.log('Search triggered with:', {
      propertyType: selectedPropertyType,
      structures: selectedStructures,
      layouts: selectedLayouts,
      prefecture: selectedPrefecture,
      city: selectedCity,
      station: selectedStation,
      duration: selectedDuration,
    });
  };

  // 色とテキスト取得関数
  const getColorHex = (color: string): string => {
    const colorMap: Record<string, string> = {
      red: '#EF4444',
      blue: '#3B82F6',
      green: '#10B981',
      yellow: '#F59E0B',
      purple: '#8B5CF6',
      orange: '#F97316',
      gray: '#6B7280',
    };
    return colorMap[color] || '#6B7280';
  };

  const getDurationText = (duration: number): string => {
    return duration === 1 ? '1年間' : `${duration}年間`;
  };

  const contextValue: DashboardContextType = {
    // 状態
    chartType,
    chartLabels,
    isSidebarOpen,
    comparisonAreas,
    areaMasterData,
    selectedStructure,
    selectedPropertyStatus,
    selectedPropertyType,
    selectedAreaName,
    selectedLayout,
    startYear,
    endYear,
    selectedStructures,
    selectedLayouts,
    selectedPropertyStatuses,
    selectedDuration,
    selectedPrefecture,
    selectedCity,
    selectedStation,

    // アクション
    setChartType,
    setChartLabels,
    toggleSidebar,
    addArea,
    removeArea,
    toggleAreaSelection,
    handleStructureChange,
    handlePropertyStatusChange,
    handlePropertyTypeChange,
    handleAreaNameChange,
    handleLayoutChange,
    handleStartYearChange,
    handleEndYearChange,
    handleStructuresChange,
    handleLayoutsChange,
    handlePropertyStatusesChange,
    handleDurationChange,
    handlePrefectureChange,
    handleCityChange,
    handleStationChange,
    handleSearch,
    getColorHex,
    getDurationText,
  };

  return <DashboardContext.Provider value={contextValue}>{children}</DashboardContext.Provider>;
};

export default DashboardContext;
