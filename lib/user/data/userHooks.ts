import { useQuery, useMutation } from "react-query";
import { API, Method } from "@util/query";
import { Country,  UserRole } from "@prisma/client";
import { QueryParamType } from "@ui/hooks/query-param";
 
export const useHospitalUserList = (filter: QueryParamType) =>
  useQuery(
    [
      "userList",
      filter.size,
      filter.page,
      filter.role,
      filter.country,
      filter.text,
      filter.hospitalId,
      filter.invitedByMeOnly,
      filter.withAssessmentCount,
    ],
    API._query(Method.POST, `users/hospitalusers`, {}, filter),
    { enabled: !!filter }
  );

export const useHospitalAdminUserList = (filter: QueryParamType) =>
  useQuery(
    [
      "hospitalAdminUserList",
      filter.size,
      filter.page,
      filter.role,
      filter.country,
      filter.text,
    ],
    API._query(Method.POST, `users/hospitaladminusers`, {}, filter),
    { enabled: !!filter }
  );

export const useUserList = (filter: QueryParamType) =>
  useQuery(
    [
      "userList",
      filter.size,
      filter.page,
      filter.role,
      filter.country,
      filter.text,
    ],
    API._query(Method.POST, `users/list`, {}, filter),
    { enabled: !!filter }
  );

export const useUserDetail = (userId: any) => {
  return useQuery(
    ["userDetail", userId],
    API._query(Method.GET, `users/detail/${userId}`),
    { initialData: [] }
  );
};

// Delete invited user only
export const useDeleteInvitedUser = (userId: string) =>
  useMutation(API._mutate(Method.DELETE, `user/${userId}`));
// Delete invited user only
export const useConnectWithLocalDoctor = (interviewId: string) =>
  useMutation(
    API._mutate(
      Method.POST,
      `users/localdoctors/connect?interviewId=${interviewId}`
    )
  );

export const useDoctorsBySpecialistType = ({
  specialisttype,
  country,
  interviewId,
  condition,
  probability,
  hideMatch,
}: {
  specialisttype: string;
  country: Country;
  interviewId: string;
  condition: string;
  probability: number;
  hideMatch: boolean;
}) => {
  return useQuery<{
    matchType: string;
    matchQuery: string;
    isAssigned?: boolean;
    isAllowedToClick?: boolean;
  }>(
    ["localdoctorsspecialist", specialisttype],
    API._query(
      Method.POST,
      `users/localdoctors/type`,
      {},
      {
        interviewId: interviewId,
        specialisttype: specialisttype,
        country: country,
        condition: condition,
        probability: probability,
        hideMatch: hideMatch,
      }
    ),
    { enabled: !!specialisttype }
  );
};

// Create a new user
export const useCreateUser = () =>
  useMutation(API._mutate(Method.POST, `user`));

export const useCreateUserFromContact = () =>
  useMutation(API._mutate(Method.POST, `users/create`));

// Update an existing user
export const useUpdateUser = (userId: string) =>
  useMutation(API._mutate(Method.PUT, `user/${userId}`));

// Get list of all users
// Only verified and
export const useLocaldoctors = (country?: string) => {
  return useQuery(
    ["localdoctors", country],
    API._query(Method.GET, `users/localdoctors`, { country }),
    { initialData: [], enabled: !!country }
  );
};

//Disable localdoctor auto match
export const useDisableLocaldoctorMatch = (id?: string) => {
  return useQuery(
    ["disablelocaldoctors", id],
    API._query(Method.POST, `users/localdoctors/disablematch/${id}`, { id }),
    { initialData: [], enabled: !!id }
  );
};

//Enable localdoctor auto match
export const useEnableLocaldoctorMatch = (id?: string) => {
  return useQuery(
    ["enablelocaldoctors", id],
    API._query(Method.POST, `users/localdoctors/enablematch/${id}`, { id }),
    { initialData: [], enabled: !!id }
  );
};

// Enable/Disable localdoctor auto match
export const useToggleLocaldoctorMatch = () =>
  useMutation(API._mutate(Method.POST, `users/localdoctors/togglematch`));

//Subscription toggle
export const useToggleLocaldoctorSubscription = () =>
  useMutation(
    API._mutate(Method.POST, `users/localdoctors/togglesubscription`)
  );

// Get patient access table data
export const usePatientAccess = (userId: string) => {
  return useQuery(
    ["patientAccess", userId],
    API._query(Method.GET, `users/detail/${userId}/patientAccess`),
    { initialData: [], enabled: !!userId }
  );
};

// Give new access to local doctor
export const useAssignToLocalDoctor = () =>
  useMutation(API._mutate(Method.POST, `patient/giveaccess`));

// Give new access to local doctor
export const useRemoveFromAccessTable = () =>
  useMutation(API._mutate(Method.POST, `patient/removeaccess`));

// Give new access to local doctor
export const usePhonechangemanually = () =>
  useMutation(API._mutate(Method.POST, `users/phonechangemanually`));
export const useChangePasswordManually = () =>
  useMutation(API._mutate(Method.POST, `users/changepassword`));
export const useChangeEmailManually = () =>
  useMutation(API._mutate(Method.POST, `users/changeemail`));
