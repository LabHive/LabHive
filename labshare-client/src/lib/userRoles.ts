export enum UserRoles {
  VOLUNTEER = 'volunteer',
  LAB_RESEARCH = 'lab_research',
  LAB_DIAG = 'lab_diag',
  SUPPLIER = 'supplier',
}

export type UserRolesString = keyof typeof UserRoles;

export enum AdminUserRoles {
  ADMIN = 'admin',
  SUPER_ADMIN = 'superAdmin',
}

export type AdminUserRolesString = keyof typeof UserRoles;

export const UserMapIconPaths = {
  [UserRoles.VOLUNTEER]: 'map-icon-volunteer.png',
  [UserRoles.LAB_RESEARCH]: 'map-icon-research.png',
  [UserRoles.LAB_DIAG]: 'map-icon-diag.png',
  [UserRoles.SUPPLIER]: 'map-icon-diag.png'
};
