import { CreateTripDto } from '@/dto/create-trip-dto'
import { IUserServices, UserServices } from './user-services'
import { EmailServices, IEmailServices } from './email-services'
import { DatabaseServices, IDatabaseServices } from './database-services'

export interface ITripServices {
  createTrip(dto: CreateTripDto): Promise<{
    tripId: string
    isEmailVerified: boolean
  }>
}

export class TripServices {
  constructor(
    private readonly userServices: IUserServices,
    private readonly emailServices: IEmailServices,
    private readonly databaseServices: IDatabaseServices
  ) { }

  private static instance: TripServices | null = null

  public static getInstance(): TripServices {
    if (!TripServices.instance) {
      TripServices.instance = new TripServices(
        UserServices.getInstance(),
        EmailServices.getInstance(),
        DatabaseServices.getInstance()
      )
    }
    return TripServices.instance
  }

  async createTrip(dto: CreateTripDto): Promise<{
    tripId: string
    isEmailVerified: boolean
  }> {

    //Create a random confirmation token with 6 numeric digits
    const confirmationToken = Math.floor(100000 + Math.random() * 900000).toString()

    const tripId = await this.databaseServices.saveTrip(dto, confirmationToken)
    const isEmailVerified = await this.userServices.checkIfEmailIsVerified(dto.ownerEmail)

    if (isEmailVerified) {
      await this.emailServices.sendTripCreatedEmail(dto, tripId, confirmationToken)
    }

    return { tripId, isEmailVerified }
  }
}