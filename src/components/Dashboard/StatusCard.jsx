import React from 'react';
import { Card } from '../UI/Card';

export const StatusCard = ({
  title,
  value,
  icon,
  change,
  changeType = 'neutral',
  className = '',
}) => {
  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-green-600';
    if (changeType === 'negative') return 'text-red-600';
    return 'text-gray-500';
  };

  return (
    <Card className={`${className}`}>
      <div className="px-6 py-5 flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="mt-1 text-2xl font-semibold text-gray-900">{value}</h3>
          
          {change && (
            <p className={`mt-1 text-sm ${getChangeColor()}`}>
              {change}
            </p>
          )}
        </div>
        
        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
          {icon}
        </div>
      </div>
    </Card>
  );
};


