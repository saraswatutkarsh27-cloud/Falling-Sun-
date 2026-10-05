import { eventConfig } from '../config/eventConfig';

export const REGISTRATION_OPENS_AT = new Date(eventConfig.registrationOpensAt).getTime();

export interface RegistrationTimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function isRegistrationOpen(): boolean {
  return Date.now() >= REGISTRATION_OPENS_AT;
}

export function getRegistrationTimeLeft(): RegistrationTimeLeft {
  const diff = Math.max(0, REGISTRATION_OPENS_AT - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function getRegistrationTarget(): string {
  return eventConfig.registrationUrl || eventConfig.whatsappUrl;
}
