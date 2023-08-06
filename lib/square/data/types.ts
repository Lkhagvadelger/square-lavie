export type squareConfig = {
  value: any;
  label: string;
  common?: string;
  category?: string;
};
export enum MatchType {
  LocaldoctorsByConditionAndSpecialist,
  LocaldoctorsByCondition,
  LocaldoctorsBySpecialistType,
  LocaldoctorsGP,
}
