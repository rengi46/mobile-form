import React from 'react';
import { Icon as UIKitIcon } from 'ui-kit'; // Replace 'ui-kit' with the actual UI kit library you are using

const Icon = ({ name }) => {
  // Map the provided icon name to the corresponding icon component from the UI kit
  const iconMap = {
    // Add more mappings as needed
    home: UIKitIcon.HomeIcon,
    settings: UIKitIcon.SettingsIcon,
    // ...
  };

  const IconComponent = iconMap[name] || UIKitIcon.DefaultIcon; // Use a default icon if the provided name is not found

  return <IconComponent />;
};

export default Icon;
