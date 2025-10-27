import React from 'react';
import { useDashboard } from '../contexts/DashboardContext';
import {
  ComparisonAreaList,
  LocationSelector,
  MultiLayoutSelector,
  MultiStructureSelector,
  PropertyTypeSelector,
  SearchButton,
  SidebarHeader,
} from './index';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const {
    // 状態
    selectedPropertyType,
    selectedStructures,
    selectedLayouts,
    selectedAreaName,
    comparisonAreas,

    // アクション
    handlePropertyTypeChange,
    handleStructuresChange,
    handleLayoutsChange,
    handleAreaNameChange,
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
        <PropertyTypeSelector
          selectedType={selectedPropertyType}
          onTypeChange={handlePropertyTypeChange}
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
          selectedAreaName={selectedAreaName}
          onAreaNameChange={handleAreaNameChange}
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
