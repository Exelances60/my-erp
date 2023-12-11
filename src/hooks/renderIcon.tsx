import * as HeroIconsOutline from "@heroicons/react/outline";

const iconComponents = { ...HeroIconsOutline };

const iconMap = Object.fromEntries(
  Object.entries(iconComponents).map(([key, value]) => [
    key.replace(/Icon$/, ""),
    value,
  ])
);

export const renderIcon = (icon: any) => {
  const IconComponent = iconMap[icon];
  return IconComponent ? <IconComponent className="w-7 h-7" /> : null;
};

export const iconOptions = Object.keys(iconMap).map((iconLabel) => ({
  label: (
    <div className="flex items-center">
      {renderIcon(iconLabel)}
      <span className="ml-2">{iconLabel}</span>
    </div>
  ),
  value: iconLabel,
}));
