import { refreshToken } from "./auth";
import { redirect } from "next/navigation";
import { getSession } from "./session";
import { BACKEND_URL } from "@/constants";

export interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

export const authFetch = async (
  url: string,
  options: FetchOptions = {},
  raw = true,
  redirectUnauth = false
) => {
  const session = await getSession();

  if (redirectUnauth) {
    if (!session?.tokens.accessToken) redirect("/sign-in");
  }

  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${session?.tokens.accessToken}`,
  };
  
  const response = await fetch(`${BACKEND_URL}/${url}`, options);
  // if (response.status === 401) {
  //   if (!session?.refreshToken) throw new Error("refresh token not found!");

  //   const newAccessToken = await refreshToken(session.refreshToken);

  //   if (newAccessToken) {
  //     options.headers.Authorization = `Bearer ${newAccessToken}`;
  //     response = await fetch(`${BACKEND_URL}/${url}`, options);
  //   }
  // }
  if (raw) return response;
  return await response.json();
};

export async function authFetchData(url: string, redirect = true) {
  return authFetch(url, {}, false, redirect);
}

export async function fetchData(url: string, options = {}) {
  const response = await fetch(`${BACKEND_URL}/${url}`, options);
  return response.json();
}
