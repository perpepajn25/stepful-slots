export type User = {
    id: number
    name: string
    phone_number: string
    role: 'coach' | 'student'
  }
  
  export type Slot = {
    id: number
    start_time: string
    end_time: string
    satisfaction_score?: number
    notes?: string
    coach: User
    student?: User
  }