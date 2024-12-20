export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export const formatTime = (date: string): string => {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  });
}

export const formatDateTime = (date: string): string => {
  return `${formatDate(date)} at ${formatTime(date)}`;
}

export const formatDateTimeShort = (date: string): string => {
  return `${formatDate(date)} ${formatTime(date)}`;
}