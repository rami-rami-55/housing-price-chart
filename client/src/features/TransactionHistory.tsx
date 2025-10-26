import React from 'react';
import { useDashboard } from '../contexts/DashboardContext';

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
  const { comparisonAreas } = useDashboard();
  // タブ表示の場合は常に表示するため、isHistoryVisibleは削除

  // ダミーの取引履歴データ
  const recentHistoryData: TransactionRecord[] = [
    {
      date: '2024年10月',
      price: 6200,
      layout: '2LDK',
      structure: '木造',
      area: 85,
      city: '世田谷区',
      district: '世田谷区',
    },
    {
      date: '2024年09月',
      price: 5500,
      layout: '1K',
      structure: 'RC',
      area: 30,
      city: '目黒区',
      district: '目黒区',
    },
    {
      date: '2024年09月',
      price: 5900,
      layout: '3LDK',
      structure: 'SRC',
      area: 78,
      city: '世田谷区',
      district: '世田谷区',
    },
    {
      date: '2024年08月',
      price: 5100,
      layout: '4LDK+',
      structure: '木造',
      area: 100,
      city: '新宿区',
      district: '新宿地区',
    },
    {
      date: '2024年07月',
      price: 4200,
      layout: '2DK',
      structure: 'RC',
      area: 65,
      city: '目黒区',
      district: '目黒区',
    },
    {
      date: '2024年07月',
      price: 5300,
      layout: '2K',
      structure: '木造',
      area: 55,
      city: '渋谷区',
      district: '渋谷地区',
    },
    {
      date: '2024年06月',
      price: 4500,
      layout: '3DK',
      structure: 'SRC',
      area: 70,
      city: '世田谷区',
      district: '世田谷区',
    },
    {
      date: '2024年05月',
      price: 5000,
      layout: '1LDK',
      structure: 'RC',
      area: 45,
      city: '目黒区',
      district: '目黒区',
    },
    {
      date: '2024年04月',
      price: 5800,
      layout: '4DK',
      structure: '木造',
      area: 90,
      city: '新宿区',
      district: '新宿地区',
    },
    {
      date: '2024年03月',
      price: 4100,
      layout: '1K',
      structure: 'RC',
      area: 35,
      city: '渋谷区',
      district: '渋谷地区',
    },
    {
      date: '2024年02月',
      price: 4700,
      layout: '2LDK',
      structure: 'SRC',
      area: 60,
      city: '世田谷区',
      district: '世田谷区',
    },
    {
      date: '2024年01月',
      price: 5200,
      layout: '3LDK',
      structure: '木造',
      area: 80,
      city: '目黒区',
      district: '目黒区',
    },
    {
      date: '2023年12月',
      price: 4300,
      layout: '2DK',
      structure: 'RC',
      area: 50,
      city: '渋谷区',
      district: '渋谷地区',
    },
    {
      date: '2023年11月',
      price: 5600,
      layout: '4LDK+',
      structure: '木造',
      area: 110,
      city: '新宿区',
      district: '新宿地区',
    },
  ];

  const renderHistoryTable = () => {
    // 表示中（selected=true）のエリアを取得
    const activeAreas = comparisonAreas.filter((area) => area.selected);

    if (activeAreas.length === 0) {
      return (
        <div className="p-4 text-center text-gray-500 bg-white rounded-xl shadow-sm">
          比較エリア一覧で表示中のエリアを選択してください。
        </div>
      );
    }

    return activeAreas.map((area) => {
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
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
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
