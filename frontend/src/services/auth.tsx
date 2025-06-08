import baseApi from ".";

export interface Form {
  identifier: string;
  password: string;
}

export async function login(form: Form): Promise<TimeResponse> {
    return await baseApi.post("/login", form)
}