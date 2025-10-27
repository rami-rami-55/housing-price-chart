import React from 'react';
import { useDashboard } from '../contexts/DashboardContext';
import { ComparisonArea } from '../types/estate';

interface TransactionRecord {
  date: string;
  price: number;
  layout: string;
  structure: string;
  area: number;
  city: string;
  district: string;
}

const TransactionHistory: React.FC = () => {
  const { comparisonAreas, selectedDuration } = useDashboard();
  // タブ表示の場合は常に表示するため、isHistoryVisibleは削除

  // 四半期ラベルを比較可能な形式 (YYYYQQ) に変換する関数
  const quarterLabelToComparable = (label: string): number => {
    const match = label.match(/(\d{4})年Q(\d)/);
    if (match) {
      return parseInt(match[1]) * 10 + parseInt(match[2]);
    }
    return 0;
  };

  // 期間に応じた取引履歴データ生成関数
  const generateTransactionData = (durationInYears: number): TransactionRecord[] => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentQuarter = Math.floor(currentDate.getMonth() / 3) + 1;

    let totalPoints: number;
    switch (durationInYears) {
      case 1:
        totalPoints = 8; // 1年→8件程度
        break;
      case 3:
        totalPoints = 15; // 3年→15件程度
        break;
      case 5:
        totalPoints = 20; // 5年→20件程度
        break;
      default:
        totalPoints = 10;
        break;
    }

    const transactions: TransactionRecord[] = [];
    const layouts = ['1R', '1K', '1DK', '1LDK', '2K', '2DK', '2LDK', '3LDK'];
    const structures = ['木造', 'RC', 'SRC', '鉄骨造'];
    const areas = [20, 25, 30, 40, 50, 60, 70, 85, 100];
    const districts = ['世田谷', '自由が丘駅', '渋谷', '新宿', '池袋', '品川'];
    const cities = ['世田谷区', '目黒区', '渋谷区', '新宿区', '豊島区', '品川区'];

    for (let i = 0; i < totalPoints; i++) {
      // ランダムな四半期を生成（過去の期間内）
      const quartersBack = Math.floor(Math.random() * (durationInYears * 4));
      let targetYear = currentYear;
      let targetQuarter = currentQuarter - quartersBack;

      while (targetQuarter <= 0) {
        targetYear--;
        targetQuarter += 4;
      }

      transactions.push({
        date: `${targetYear}年Q${targetQuarter}`,
        price: Math.floor(Math.random() * 3000) + 3000, // 3000-6000万円
        layout: layouts[Math.floor(Math.random() * layouts.length)],
        structure: structures[Math.floor(Math.random() * structures.length)],
        area: areas[Math.floor(Math.random() * areas.length)],
        district: districts[Math.floor(Math.random() * districts.length)],
        city: cities[Math.floor(Math.random() * cities.length)],
      });
    }

    return transactions.sort(
      (a, b) => quarterLabelToComparable(b.date) - quarterLabelToComparable(a.date)
    );
  };

  // ダミーの取引履歴データ（四半期形式）
  const recentHistoryData: TransactionRecord[] = generateTransactionData(
    parseInt(selectedDuration)
  );

  const renderHistoryTable = () => {
    // 表示中（selected=true）のエリアを取得
    const activeAreas = comparisonAreas.filter((area: ComparisonArea) => area.selected);

    if (activeAreas.length === 0) {
      return (
        <div className="p-4 text-center text-gray-500 bg-white rounded-xl shadow-sm">
          比較エリア一覧で表示中のエリアを選択してください。
        </div>
      );
    }

    return activeAreas.map((area: ComparisonArea) => {
      const selectedDistrictName = area.name; // エリアの名前を使用

      // データをフィルタリング
      const filteredHistory = recentHistoryData.filter((history) => {
        // 履歴データ内の city または district が、選択された area.name に含まれているかチェック
        return (
          history.city.includes(selectedDistrictName.split('区')[0] + '区') ||
          history.district.includes(selectedDistrictName.split('区')[0]) ||
          selectedDistrictName.includes(history.city) ||
          selectedDistrictName.includes(history.district)
        );
      });

      return (
        <div key={area.id} className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
          {/* エリアごとのタイトル */}
          <h3 className="text-xl font-bold text-gray-700 mb-3">{area.name} の取引履歴</h3>

          {filteredHistory.length === 0 ? (
            <p className="text-sm text-gray-400">該当する取引履歴は見つかりませんでした。</p>
          ) : (
            <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      取引時期
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      取引価格(万円)
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      間取り
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      構造
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      面積(㎡)
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      地域
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredHistory
                    .sort(
                      (a, b) => quarterLabelToComparable(b.date) - quarterLabelToComparable(a.date)
                    )
                    .map((record, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                          {record.date}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                          {record.price.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                          {record.layout}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                          {record.structure}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                          {record.area}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                          {record.city} {record.district}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-2xl h-full flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-6">{renderHistoryTable()}</div>
      </div>
    </div>
  );
};

export default TransactionHistory;
