export interface Filters{
  idTribus?: number[],
  idCelulas?: number[],
  idProfiles: number[],
  idProviders:number[],
  idSenioritys?: number[],
  assigned?: number,
  assignmentRange?: {
    from: string,
    to: string
  },
  tentativeEndRange?: {
    from: string,
    to: string
  },
  filter: string,

}
