import React from 'react';
import { useDashboard } from '../contexts/DashboardContext';
import {
  ComparisonAreaList,
  LocationSelector,
  MultiLayoutSelector,
  MultiPropertyStatusSelector,
  MultiPropertyTypeSelector,
  MultiStructureSelector,
  SearchButton,
  SidebarHeader,
} from './index';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const {
    // 状態
    selectedPropertyTypes,
    selectedPropertyStatuses,
    selectedStructures,
    selectedLayouts,
    selectedPrefecture,
    selectedCity,
    selectedStation,
    comparisonAreas,

    // アクション
    handlePropertyTypesChange,
    handlePropertyStatusesChange,
    handleStructuresChange,
    handleLayoutsChange,
    handlePrefectureChange,
    handleCityChange,
    handleStationChange,
    handleSearch,
    toggleAreaSelection,
    removeArea,
    getColorHex,
    getDurationText,
  } = useDashboard();

  return (
    <div className={className}>
      <SidebarHeader />

      <div className="space-y-6 pb-6">
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
        />
      </div>
    </div>
  );
};

export default Sidebar;
