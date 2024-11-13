import { AnimalEvent } from "./animal-event";

export interface EditEventPayload {
  key: keyof AnimalEvent;
  value: string;
}
