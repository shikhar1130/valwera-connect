
import { useQuery } from "@tanstack/react-query";
import Layout from "../components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { UserPlus, X, Check } from "lucide-react";
import { connectionService, ConnectionRequest } from "@/services/connection";
import { User } from "@/services/auth";
import { toast } from "sonner";

const Network = () => {
  const { data: connectionRequests, isLoading: requestsLoading } = useQuery({
    queryKey: ["connectionRequests"],
    queryFn: connectionService.getConnectionRequests,
  });

  const { data: suggestedConnections, isLoading: suggestionsLoading } = useQuery({
    queryKey: ["suggestedConnections"],
    queryFn: connectionService.suggestedConnections,
  });

  const { data: connections, isLoading: connectionsLoading } = useQuery({
    queryKey: ["connections"],
    queryFn: connectionService.getConnections,
  });
  
  const isLoading = requestsLoading || suggestionsLoading || connectionsLoading;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleAcceptRequest = async (requestId: string) => {
    try {
      await connectionService.acceptConnectionRequest(requestId);
      toast.success("Connection request accepted");
    } catch (error) {
      console.error("Error accepting connection request:", error);
    }
  };

  const handleDeclineRequest = async (requestId: string) => {
    try {
      await connectionService.declineConnectionRequest(requestId);
      toast.success("Connection request declined");
    } catch (error) {
      console.error("Error declining connection request:", error);
    }
  };

  const handleSendRequest = async (userId: string) => {
    try {
      await connectionService.sendConnectionRequest(userId);
      toast.success("Connection request sent");
    } catch (error) {
      console.error("Error sending connection request:", error);
    }
  };

  return (
    <Layout requireAuth>
      <div className="space-y-6">
        {/* Connection Requests */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Pending Requests</CardTitle>
          </CardHeader>
          <CardContent>
            {requestsLoading ? (
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="flex items-center p-2 animate-pulse">
                    <div className="w-10 h-10 rounded-full bg-gray-200 mr-3" />
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
                      <div className="h-3 bg-gray-200 rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : connectionRequests && connectionRequests.length > 0 ? (
              <div className="space-y-4">
                {connectionRequests.map((request: ConnectionRequest) => (
                  <div key={request._id} className="flex items-center">
                    <Link to={`/profile/${request.sender._id}`}>
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={request.sender.profileImage} />
                        <AvatarFallback>{getInitials(request.sender.name)}</AvatarFallback>
                      </Avatar>
                    </Link>
                    
                    <div className="flex-1 min-w-0 mr-4">
                      <Link to={`/profile/${request.sender._id}`} className="font-medium hover:underline">
                        {request.sender.name}
                      </Link>
                      <p className="text-xs text-muted-foreground truncate">
                        {request.sender.headline || "ValWera Sports Member"}
                      </p>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-full w-8 h-8 p-0"
                        onClick={() => handleDeclineRequest(request._id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        className="rounded-full w-8 h-8 p-0 bg-brandPurple hover:bg-brandPurple-dark"
                        onClick={() => handleAcceptRequest(request._id)}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No pending connection requests</p>
            )}
          </CardContent>
        </Card>

        {/* Suggested Connections */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>People You May Know</CardTitle>
          </CardHeader>
          <CardContent>
            {suggestionsLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center p-2 animate-pulse">
                    <div className="w-10 h-10 rounded-full bg-gray-200 mr-3" />
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
                      <div className="h-3 bg-gray-200 rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : suggestedConnections && suggestedConnections.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {suggestedConnections.map((user: User) => (
                  <div key={user._id} className="flex items-center">
                    <Link to={`/profile/${user._id}`}>
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={user.profileImage} />
                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                      </Avatar>
                    </Link>
                    
                    <div className="flex-1 min-w-0 mr-2">
                      <Link to={`/profile/${user._id}`} className="font-medium hover:underline">
                        {user.name}
                      </Link>
                      <p className="text-xs text-muted-foreground truncate">
                        {user.headline || "ValWera Sports Member"}
                      </p>
                    </div>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex items-center whitespace-nowrap"
                      onClick={() => handleSendRequest(user._id)}
                    >
                      <UserPlus className="h-3 w-3 mr-1" />
                      Connect
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No suggestions available</p>
            )}
          </CardContent>
        </Card>

        {/* Current Connections */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>My Connections</CardTitle>
          </CardHeader>
          <CardContent>
            {connectionsLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center p-2 animate-pulse">
                    <div className="w-10 h-10 rounded-full bg-gray-200 mr-3" />
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
                      <div className="h-3 bg-gray-200 rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : connections && connections.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {connections.map((user: User) => (
                  <div key={user._id} className="flex items-center">
                    <Link to={`/profile/${user._id}`}>
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={user.profileImage} />
                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                      </Avatar>
                    </Link>
                    
                    <div className="flex-1 min-w-0">
                      <Link to={`/profile/${user._id}`} className="font-medium hover:underline">
                        {user.name}
                      </Link>
                      <p className="text-xs text-muted-foreground truncate">
                        {user.headline || "ValWera Sports Member"}
                      </p>
                      <Button
                        variant="link"
                        className="text-xs h-auto p-0 mt-1 text-brandPurple"
                      >
                        Message
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">
                You haven't connected with anyone yet
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Network;
