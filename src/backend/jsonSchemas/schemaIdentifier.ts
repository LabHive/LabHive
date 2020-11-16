

export enum Schemas {
    address = "/address",
    contact = "/contact",
    password_forgotton = "/password_forgotton",
    password_reset = "/password_reset",
    registration_volunteer = "/registration_volunteer",
    registration_labDiag = "/registration_labDiag",
    registration_labResearch = "/registration_labResearch",
    registration_admin = "/registration_admin",
    login = "/login",
    testCapcity = "/testCapacity"
};

export type SchemaIdenifier = keyof typeof Schemas
