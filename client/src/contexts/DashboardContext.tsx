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
  selectedPropertyTypes: string[];
  selectedPropertyStatuses: string[];

  // 期間選択
  selectedDuration: string;
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
  handlePropertyTypesChange: (types: string[]) => void;
  handlePropertyStatusesChange: (statuses: string[]) => void;

  // 期間選択
  handleDurationChange: (duration: string) => void;

  // その他
  handleSearch: () => void;
  getColorHex: (colorName: string) => string;
  getDurationText: (durationInYears: number) => string;
}

type DashboardContextType = DashboardState & DashboardActions;

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

// カスタムフック
export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

// 初期データ
const generateChartLabels = (durationInYears: number): string[] => {
  const labels: string[] = [];
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const totalPoints = 10;
  const totalMonths = durationInYears * 12;

  let startYear = currentYear;
  let startMonth = currentMonth - totalMonths + 1;

  while (startMonth <= 0) {
    startYear--;
    startMonth += 12;
  }

  for (let i = 0; i < totalPoints; i++) {
    const progress = i / (totalPoints - 1);
    const monthsFromStart = Math.round(progress * (totalMonths - 1));

    let targetYear = startYear;
    let targetMonth = startMonth + monthsFromStart;

    while (targetMonth > 12) {
      targetYear++;
      targetMonth -= 12;
    }

    labels.push(`${targetYear}/${targetMonth}月`);
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

// エリアのマスターデータ
const initialAreaMasterData: Record<string, AreaData> = {
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

// プロバイダーコンポーネント
interface DashboardProviderProps {
  children: ReactNode;
}

export const DashboardProvider: React.FC<DashboardProviderProps> = ({ children }) => {
  // 状態の定義
  const [chartType, setChartType] = useState<ChartType>('price');
  const [chartLabels, setChartLabels] = useState(generateChartLabels(1));
  const [comparisonAreas, setComparisonAreas] = useState<ComparisonArea[]>(initialAreas);
  const [areaMasterData] = useState<Record<string, AreaData>>(initialAreaMasterData);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>(['mansion']);
  const [selectedPropertyStatuses, setSelectedPropertyStatuses] = useState<string[]>(['new']);

  // 期間選択用の状態
  const [selectedDuration, setSelectedDuration] = useState('1');

  // アクションの実装
  const addArea = useCallback(() => {
    if (!selectedAreaName.trim()) {
      console.warn('比較エリアを追加するには、駅名/エリア名を入力してください。');
      return;
    }

    // 利用可能な色を取得
    const availableColors = ['red', 'green', 'yellow', 'purple', 'indigo', 'pink', 'teal'];
    const assignedColors = comparisonAreas.map((a) => a.color);
    const availableColor =
      availableColors.find((color) => !assignedColors.includes(color)) ||
      availableColors[comparisonAreas.length % availableColors.length];

    const newAreaId = `area-${Date.now()}`;
    const newArea: ComparisonArea = {
      id: newAreaId,
      name: selectedAreaName, // 駅名/エリア名のみを表示名とする
      color: availableColor,
      selected: true,
      propertyType: selectedPropertyTypes[0] || 'マンション',
      propertyStatus: selectedPropertyStatuses[0] || '新築',
      structure: selectedStructures[0] || '木造',
      layouts: selectedLayouts.length > 0 ? selectedLayouts : ['1R_1K'],
      startYear: '2023',
      endYear: '2024',
      durationInYears: parseInt(selectedDuration),
    };

    setComparisonAreas((prev) => [...prev, newArea]);

    // 新規エリアのダミーデータ生成（実際はAPIコールで取得）
    const basePrice = 4000 + Math.random() * 2000;
    const baseUnitPrice = 60 + Math.random() * 30;
    const newAreaData: AreaData = {
      priceData: Array.from({ length: 10 }, (_, i) => basePrice + (Math.random() - 0.5) * 500),
      unitPriceData: Array.from(
        { length: 10 },
        (_, i) => baseUnitPrice + (Math.random() - 0.5) * 10
      ),
    };

    // マスターデータに追加（本来はサーバーから取得）
    areaMasterData[newAreaId] = newAreaData;

    // フォームをクリア
    setSelectedAreaName('');

    console.log('Added new area:', newArea);
  }, [
    selectedAreaName,
    selectedPropertyTypes,
    selectedPropertyStatuses,
    selectedStructures,
    selectedLayouts,
    selectedDuration,
    comparisonAreas,
    areaMasterData,
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
    const newLabels = generateChartLabels(parseInt(duration));
    setChartLabels(newLabels);

    // 既存のエリアの期間も更新
    setComparisonAreas((prev) =>
      prev.map((area) => ({
        ...area,
        durationInYears: parseInt(duration),
      }))
    );

    console.log('Selected duration:', duration);
  };

  const handleSearch = () => {
    console.log('Search button clicked');
  };

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

  const getDurationText = (durationInYears: number): string => {
    return `直近${durationInYears}年`;
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
    selectedPropertyTypes,
    selectedPropertyStatuses,
    selectedDuration,

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
    handlePropertyTypesChange,
    handlePropertyStatusesChange,
    handleDurationChange,
    handleSearch,
    getColorHex,
    getDurationText,
  };

  return <DashboardContext.Provider value={contextValue}>{children}</DashboardContext.Provider>;
};
