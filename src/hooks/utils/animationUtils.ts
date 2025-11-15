
export const getCompletionAnimation = (): string => {
  const completionEmojis = ['🎉', '💪', '🎯', '🔥', '⭐', '🚀', '💎', '🏆', '🌟', '✨'];
  const congratsMessages = [
    "You're crushing it! 🔥",
    "Awesome work! 💪",
    "Keep it up! 🚀",
    "You're on fire! ⭐",
    "Fantastic! 🎉",
    "Well done! 🎯",
    "Outstanding! 💎"
  ];
  
  const randomEmoji = completionEmojis[Math.floor(Math.random() * completionEmojis.length)];
  const randomMessage = congratsMessages[Math.floor(Math.random() * congratsMessages.length)];
  return `${randomEmoji} ${randomMessage}`;
};

export const getStreakAnimation = (streak: number): string => {
  const streakMessages = [
    `🔥 ${streak} Day Streak! Amazing!`,
    `⚡ ${streak} Days Strong! Unstoppable!`,
    `🌟 ${streak} Day Streak! You're on fire!`,
    `🚀 ${streak} Days in a row! Incredible!`,
    `💪 ${streak} Day Streak! Keep it up!`
  ];
  
  return streakMessages[Math.floor(Math.random() * streakMessages.length)];
};
