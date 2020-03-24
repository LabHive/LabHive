

export enum Schemas {
    address = "/address",
    contact = "/contact",
    password_forgotton = "/password_forgotton",
    password_reset = "/password_reset",
    registration_human = "/registration_human",
    registration_lab = "/registration_lab",
    login = "/login"
};

export type SchemaIdenifier = keyof typeof Schemas
