export interface AnimalEvent {
  ageInDays: number
  alertType?: string
  animalId: string
  birthDateCalculated?: boolean
  breedingNumber?: number
  calvingEase?: unknown
  cowEntryStatus?: string
  cowId: number
  currentGroupId?: number
  currentGroupName?: string | null
  daysInLactation: number
  daysInPregnancy?: number | null
  deletable: boolean
  destinationGroup?: number
  destinationGroupName?: string | null
  duration?: number
  endDate?: number | null
  endDateTime?: number | null
  eventId: number
  healthIndex?: number
  heatIndexPeak?: string
  interval?: number | null
  isOutOfBreedingWindow?: boolean
  lactationNumber: number
  minValueDateTime?: number
  newGroupId?: number
  newGroupName?: string
  newborns?: unknown
  oldLactationNumber?: number
  originalStartDateTime?: unknown
  reportingDateTime: number
  sire?: unknown
  startDateTime: number
  type: string
  [index: string]: unknown
}
