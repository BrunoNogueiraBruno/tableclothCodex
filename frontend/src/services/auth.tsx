import baseApi from ".";

export interface TimeResponse {
  time: string;
}

export interface Form {
  identifier: string;
  password: string;
}

export async function login(form: Form): Promise<TimeResponse> {
  const res = await baseApi.post<TimeResponse>("/login", form);
  console.log(res.data);
  return res.data;
}