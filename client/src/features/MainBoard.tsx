import React from 'react';
import { useDashboard } from '../contexts/DashboardContext';
import {
  ChartErrorBoundary,
  ChartTypeSelector,
  DurationSelector,
  RealEstatePriceChart,
} from './index';

const MainBoard: React.FC = () => {
  const {
    // 状態
    chartType,
    selectedDuration,
    comparisonAreas,
    chartLabels,
    areaMasterData,

    // アクション
    setChartType,
    handleDurationChange,
  } = useDashboard();

  return (
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
  );
};

export default MainBoard;
