
import React from 'react';

interface AnimationOverlayProps {
  completionAnimation: string;
  streakAnimation: string;
}

const AnimationOverlay: React.FC<AnimationOverlayProps> = ({ 
  completionAnimation, 
  streakAnimation 
}) => {
  return (
    <>
      {completionAnimation && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-2xl shadow-2xl text-lg font-bold animate-bounce">
            {completionAnimation}
          </div>
        </div>
      )}

      {streakAnimation && (
        <div className="fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-2xl shadow-2xl text-xl font-bold animate-pulse">
            {streakAnimation}
          </div>
        </div>
      )}
    </>
  );
};

export default AnimationOverlay;
