import {
  CategoryScale,
  ChartConfiguration,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import React, { useEffect, useRef } from 'react';
import { AreaData, ChartType, ComparisonArea } from '../../types/estate';

// Chart.jsのコンポーネントを登録
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend
);

interface RealEstatePriceChartProps {
  chartType: ChartType;
  comparisonAreas: ComparisonArea[];
  areaMasterData: Record<string, AreaData>;
  chartLabels: string[];
}

const RealEstatePriceChart: React.FC<RealEstatePriceChartProps> = ({
  chartType,
  comparisonAreas,
  areaMasterData,
  chartLabels,
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<ChartJS | null>(null);

  useEffect(() => {
    if (!chartRef.current) {
      console.error('Chart canvas ref is not available');
      return;
    }

    console.log('Creating chart with:', { chartType, comparisonAreas, areaMasterData });

    // 既存のチャートを破棄
    if (chartInstance.current) {
      chartInstance.current.destroy();
      chartInstance.current = null;
    }

    // キャンバスのコンテキストをクリア
    const ctx = chartRef.current.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, chartRef.current.width, chartRef.current.height);
    }

    const isPrice = chartType === 'price';
    const titleText = isPrice ? '取引価格の時系列推移 (万円)' : '取引単価の時系列推移 (万円/㎡)';
    const yAxisLabel = isPrice ? '平均取引価格 (万円)' : '平均取引単価 (万円/㎡)';

    const datasets = comparisonAreas
      .filter((area) => area.selected)
      .map((area) => {
        const data = areaMasterData[area.id];
        const dataset = isPrice ? data.priceData : data.unitPriceData;
        const colorHex = getColorHex(area.color);

        return {
          label: area.name,
          data: dataset,
          borderColor: colorHex,
          backgroundColor: colorHex + '33',
          borderWidth: 3,
          pointRadius: 5,
          pointBackgroundColor: colorHex,
          tension: 0.4,
          fill: false,
        };
      });

    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels: chartLabels,
        datasets: datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: titleText,
            font: { size: 18 },
            color: '#1f2937',
          },
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              usePointStyle: true,
            },
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += context.parsed.y.toLocaleString() + (isPrice ? '万円' : '万円/㎡');
                }
                return label;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: false,
            title: {
              display: true,
              text: yAxisLabel,
              color: '#4b5563',
            },
          },
          x: {
            title: {
              display: true,
              text: '年月',
              color: '#4b5563',
            },
          },
        },
      },
    };

    // 既存のチャートを破棄（削除済みの処理なのでコメントアウト）
    // if (chartInstance.current) {
    //   chartInstance.current.destroy();
    // }

    // 新しいチャートを作成
    try {
      chartInstance.current = new ChartJS(chartRef.current, config);
      console.log('Chart created successfully');
    } catch (error) {
      console.error('Error creating chart:', error);
    }

    // コンポーネントのアンマウント時にチャートを破棄
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [chartType, comparisonAreas, areaMasterData, chartLabels]);

  return (
    <div className="flex-1 bg-white p-6 rounded-xl shadow-2xl min-h-0" style={{ height: '400px' }}>
      <canvas ref={chartRef} style={{ width: '100%', height: '100%' }}></canvas>
    </div>
  );
};

// 色の取得関数（仮実装）
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

export default RealEstatePriceChart;
