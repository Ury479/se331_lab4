export interface Event {
  id?: number // optional while creating
  category: string
  title: string
  description: string
  location: string
  date: string
  time: string
  petsAllowed?: boolean
  organizer: string
}

export interface Passenger {
  _id: string
  name: string
  trips: number
  airline: Airline[]
  __v: number
}

export interface Airline {
  id: number
  name: string
  country: string
  logo: string
  slogan: string
  head_quaters: string
  website: string
  established: string
}

export interface MessageState {
  message: string
}

export interface EventState {
  event: Event | null
}

export interface PassengerState {
  passenger: Passenger | null
}
