import React from 'react';

interface AverageChartHeaderProps {
  title?: string;
}

const AverageChartHeader: React.FC<AverageChartHeaderProps> = ({
  title = '平均取引価格の傾向',
}) => <h4 className="text-2xl font-bold mb-4">{title}</h4>;

export default AverageChartHeader;
