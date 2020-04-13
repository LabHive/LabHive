

export enum UserRoles {
    VOLUNTEER = "volunteer",
    LAB_RESEARCH = "lab_research",
    LAB_DIAG = "lab_diag"
}

export type UserRolesString = keyof typeof UserRoles

export enum AdminUserRoles {
    ADMIN = "admin",
    SUPER_ADMIN = "superAdmin",
}

export type AdminUserRolesString = keyof typeof UserRoles

