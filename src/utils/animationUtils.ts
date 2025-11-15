
import { completionEmojis, congratsMessages, streakMessages } from '../contexts/taskConstants';

export const getRandomCompletionMessage = (): string => {
  const randomEmoji = completionEmojis[Math.floor(Math.random() * completionEmojis.length)];
  const randomMessage = congratsMessages[Math.floor(Math.random() * congratsMessages.length)];
  return `${randomEmoji} ${randomMessage}`;
};

export const getStreakMessage = (streak: number): string | null => {
  const streakMessage = streakMessages
    .reverse()
    .find(msg => streak >= msg.min);
  
  return streakMessage ? streakMessage.message : null;
};
