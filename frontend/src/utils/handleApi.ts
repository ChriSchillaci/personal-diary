import type { MessageType } from "../types/messageType";
import type { EndpointType } from "../types/endpointType";
import endpoints from "../mocks/endpoints";

export default async function handleApi<T>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  endpoint: EndpointType,
  bodyData?: {}
): Promise<T | MessageType> {
  const res = await fetch(`${import.meta.env.VITE_BASE_API}/user/${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: bodyData ? JSON.stringify(bodyData) : null,
    credentials: endpoints.includes(endpoint) ? "include" : "same-origin",
  });

  const data = await res.json();

  if (endpoint === "data") {
    return data as T;
  }

  return { status: res.status, message: data.message } as MessageType;
}
