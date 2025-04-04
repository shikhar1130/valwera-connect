
import { api } from "./api";
import { User } from "./auth";

export interface ConnectionRequest {
  _id: string;
  sender: User;
  recipient: User;
  status: "pending" | "accepted" | "declined";
  createdAt: string;
  updatedAt: string;
}

export const connectionService = {
  getConnections: () => {
    return api.get<User[]>("/connections");
  },
  
  getConnectionRequests: () => {
    return api.get<ConnectionRequest[]>("/connections/requests");
  },
  
  sendConnectionRequest: (userId: string) => {
    return api.post<ConnectionRequest>("/connections/request", { userId });
  },
  
  acceptConnectionRequest: (requestId: string) => {
    return api.put<ConnectionRequest>(`/connections/request/${requestId}/accept`, {});
  },
  
  declineConnectionRequest: (requestId: string) => {
    return api.put<ConnectionRequest>(`/connections/request/${requestId}/decline`, {});
  },
  
  removeConnection: (connectionId: string) => {
    return api.delete<{ success: boolean }>(`/connections/${connectionId}`);
  },
  
  suggestedConnections: () => {
    return api.get<User[]>("/connections/suggestions");
  }
};
