export const MESSENGER_DURATION_ANIMATION = 240;
export const MESSENGER_DURATION_RESET = 480;
export const MESSENGER_DURATION_MIN = 2000;
export const MESSENGER_DURATION_MAX = 7000;
export const MESSENGER_DURATION_CHAR = 50;

export function getDurationMessenger(message: string): number {
  let duration = message.length * MESSENGER_DURATION_CHAR;

  if (duration < MESSENGER_DURATION_MIN) {
    duration = MESSENGER_DURATION_MIN;
  } else if (duration > MESSENGER_DURATION_MAX) {
    duration = MESSENGER_DURATION_MAX;
  }

  return duration + MESSENGER_DURATION_RESET;
}
