export interface IUserPut {
    first_name: 'string';
    second_name: 'string';
    display_name: 'string';
    login: 'string';
    email: 'string';
    phone: 'string';
}

export interface IUserGet {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
    avatar: string;
}

export interface IUserAvatarGet {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
    avatar: string;
}

export interface IPassword {
    oldPassword: string;
    newPassword: string;
}
