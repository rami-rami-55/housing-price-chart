import React, { useState } from 'react';
import { useDashboard } from '../contexts/DashboardContext';
import {
  ChartErrorBoundary,
  ChartTypeSelector,
  DurationSelector,
  RealEstatePriceChart,
} from './index';
import TransactionHistory from './TransactionHistory';

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

  // タブの状態管理
  const [currentView, setCurrentView] = useState<'chart' | 'history'>('chart');

  return (
    <main className="main-content flex-1 h-full p-6 flex flex-col min-w-0 bg-gray-100 overflow-y-auto">
      {/* タブ切り替え */}
      <div className="flex items-center mb-4">
        {/* タブグループ */}
        <div className="flex space-x-2 sm:space-x-4">
          {/* グラフのタブ */}
          <button
            onClick={() => setCurrentView('chart')}
            className={`main-tab px-4 sm:px-6 py-2 font-semibold rounded-xl shadow-md transition ${
              currentView === 'chart'
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-white text-gray-700 hover:bg-gray-200'
            }`}
          >
            グラフ
          </button>
          {/* 取引履歴のタブ */}
          <button
            onClick={() => setCurrentView('history')}
            className={`main-tab px-4 sm:px-6 py-2 font-semibold rounded-xl shadow-md transition ${
              currentView === 'history'
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-white text-gray-700 hover:bg-gray-200'
            }`}
          >
            取引履歴
          </button>
        </div>
      </div>

      {/* タブコンテンツエリア */}
      <div className="flex-1 min-h-[400px]">
        {currentView === 'chart' ? (
          /* グラフコンテンツ */
          <div className="w-full h-full bg-white p-6 rounded-xl shadow-2xl flex flex-col">
            {/* グラフサブタブと期間選択を横一列に */}
            <div className="flex items-center justify-between mb-4">
              <ChartTypeSelector chartType={chartType} onChartTypeChange={setChartType} />

              {/* 期間選択 (右側) */}
              <div className="flex items-center">
                <DurationSelector
                  selectedDuration={selectedDuration}
                  onDurationChange={handleDurationChange}
                />
              </div>
            </div>

            {/* グラフコンテナ */}
            <div className="flex-1 relative min-h-[250px]">
              <ChartErrorBoundary>
                <RealEstatePriceChart
                  chartType={chartType}
                  comparisonAreas={comparisonAreas}
                  areaMasterData={areaMasterData}
                  chartLabels={chartLabels}
                />
              </ChartErrorBoundary>
            </div>
          </div>
        ) : (
          /* 取引履歴コンテンツ */
          <div className="w-full h-full">
            <TransactionHistory />
          </div>
        )}
      </div>
    </main>
  );
};

export default MainBoard;
