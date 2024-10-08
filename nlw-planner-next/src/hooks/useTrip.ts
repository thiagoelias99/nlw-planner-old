import { checkActivityAction } from '@/actions/activity/check-activity'
import { deleteActivityAction } from '@/actions/activity/delete-activity'
import { getActivitiesFromTripAction } from '@/actions/activity/get-activities-from-trip'
import { registerActivityAction } from '@/actions/activity/register-activity-action'
import { updateActivityAction } from '@/actions/activity/update-activity'
import { inviteGuestAction } from '@/actions/guest/invite-guest'
import { deleteLinkAction } from '@/actions/links/delete-link'
import { registerLinkAction } from '@/actions/links/register-link-action'
import { updateLinksAction } from '@/actions/links/update-link'
import { getTrip } from '@/actions/trip/get-trip'
import { Activity } from '@/types/types'
import { Links } from '@prisma/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const useTrip = (tripId: string) => {

  const queryClient = useQueryClient()

  //Get trip data
  const { data: trip, isLoading: isLoadingTrip } = useQuery({
    queryKey: ['trip', tripId],
    queryFn: async () => {
      return getTrip(tripId)
    }
  })

  //Register new link
  const { mutateAsync: registerLink, isPending: isRegisteringLink } = useMutation({
    mutationKey: ['registerLink', tripId],
    mutationFn: async (data: {
      title: string,
      url: string
    }) => {
      await registerLinkAction({ ...data, tripId })

      await queryClient.invalidateQueries({ queryKey: ['trip', tripId] })
    }
  })

  //Update link
  const { mutateAsync: updateLink, isPending: isUpdatingLink } = useMutation({
    mutationKey: ['updateLink', tripId],
    mutationFn: async (data: Links) => {
      await updateLinksAction(data)

      await queryClient.invalidateQueries({ queryKey: ['trip', tripId] })
    }
  })

  //Delete link
  const { mutateAsync: deleteLink, isPending: isDeletingLink } = useMutation({
    mutationKey: ['deleteLink', tripId],
    mutationFn: async (data: { linkId: string }) => {
      await deleteLinkAction(data)

      await queryClient.invalidateQueries({ queryKey: ['trip', tripId] })
    }
  })

  //Register new activity
  const { mutateAsync: registerActivity, isPending: isRegisteringActivity } = useMutation({
    mutationKey: ['registerActivity', tripId],
    mutationFn: async (data: {
      title: string,
      dateTime: Date
    }) => {
      await registerActivityAction({ ...data, tripId })

      await queryClient.invalidateQueries({ queryKey: ['tripActivities', tripId] })
    }
  })

  //Get activities
  const { data: activities, isLoading: isLoadingActivities } = useQuery({
    queryKey: ['tripActivities', tripId],
    queryFn: async () => {
      return getActivitiesFromTripAction(tripId)
    }
  })

  //Check activity
  const { mutateAsync: checkActivity, isPending: isCheckingActivity } = useMutation({
    mutationKey: ['checkActivity', tripId],
    mutationFn: async (data: {
      activityId: string,
      value: boolean
    }) => {
      await checkActivityAction(data)

      await queryClient.invalidateQueries({ queryKey: ['tripActivities', tripId] })
    }
  })

  //Update activity
  const { mutateAsync: updateActivity, isPending: isUpdatingActivity } = useMutation({
    mutationKey: ['updateActivity', tripId],
    mutationFn: async (data: Activity) => {
      await updateActivityAction(data)

      await queryClient.invalidateQueries({ queryKey: ['tripActivities', tripId] })
    }
  })

  //Delete activity
  const { mutateAsync: deleteActivity, isPending: isDeletingActivity } = useMutation({
    mutationKey: ['deleteActivity', tripId],
    mutationFn: async (data: { activityId: string }) => {
      await deleteActivityAction(data)

      await queryClient.invalidateQueries({ queryKey: ['tripActivities', tripId] })
    }
  })

  //Invite guest
  const { mutateAsync: inviteGuest, isPending: isInvitingGuest } = useMutation({
    mutationKey: ['inviteGuest', tripId],
    mutationFn: async (data: {
      guestEmail: string
      guestName: string
    }) => {
      await inviteGuestAction({ ...data, tripId })

      await queryClient.invalidateQueries({ queryKey: ['trip', tripId] })
    }
  })

  return { trip, isLoadingTrip, activities, isLoadingActivities, registerLink, isRegisteringLink, registerActivity, isRegisteringActivity, checkActivity, isCheckingActivity, updateActivity, isUpdatingActivity, deleteActivity, isDeletingActivity, inviteGuest, isInvitingGuest, deleteLink, isDeletingLink, updateLink, isUpdatingLink }
}

export { useTrip }
