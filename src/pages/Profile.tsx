
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Layout from "../components/Layout";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/services/api";
import { User } from "@/services/auth";
import { useAuth } from "@/context/AuthContext";
import { postService, Post } from "@/services/post";
import { connectionService } from "@/services/connection";
import PostCard from "@/components/PostCard";
import { PencilLine, Mail, UserPlus, UserCheck } from "lucide-react";
import { toast } from "sonner";

const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const { user: currentUser } = useAuth();
  
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["user", id],
    queryFn: () => api.get<User>(`/users/${id}`),
    enabled: !!id,
  });

  const { data: posts, isLoading: postsLoading } = useQuery({
    queryKey: ["userPosts", id],
    queryFn: () => postService.getUserPosts(id as string),
    enabled: !!id,
  });

  const { data: isConnected, isLoading: connectionLoading } = useQuery({
    queryKey: ["isConnected", id],
    queryFn: () => api.get<boolean>(`/connections/check/${id}`),
    enabled: !!id && !!currentUser,
  });

  const { data: connectionStatus, isLoading: statusLoading } = useQuery({
    queryKey: ["connectionStatus", id],
    queryFn: () => api.get<{ status: "none" | "pending" | "received" | "connected" }>(`/connections/status/${id}`),
    enabled: !!id && !!currentUser && id !== currentUser._id,
  });

  const isOwnProfile = currentUser && user && currentUser._id === user._id;
  
  const isLoading = userLoading || postsLoading || connectionLoading || statusLoading;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleConnect = async () => {
    if (!currentUser || !user) return;
    
    try {
      await connectionService.sendConnectionRequest(user._id);
      toast.success("Connection request sent");
    } catch (error) {
      console.error("Error sending connection request:", error);
    }
  };

  const handleAcceptConnection = async () => {
    if (!currentUser || !user) return;
    
    try {
      // This is a placeholder - in a real app you would need the request ID
      await connectionService.acceptConnectionRequest("requestId");
      toast.success("Connection accepted");
    } catch (error) {
      console.error("Error accepting connection:", error);
    }
  };

  return (
    <Layout requireAuth>
      <div className="space-y-6">
        {isLoading ? (
          <div className="space-y-4">
            <Card className="h-60 animate-pulse" />
            <Card className="h-40 animate-pulse" />
          </div>
        ) : user ? (
          <>
            {/* Cover & Profile Section */}
            <Card className="overflow-hidden">
              {/* Cover Image */}
              <div className="h-40 md:h-60 bg-gradient-to-r from-brandPurple to-brandPurple-dark relative">
                {isOwnProfile && (
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute top-4 right-4"
                  >
                    <PencilLine className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="p-4 md:p-6 pt-0 md:pt-0 relative">
                <div className="-mt-16 md:-mt-20 flex flex-col md:flex-row md:items-end">
                  <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-white">
                    <AvatarImage src={user.profileImage} />
                    <AvatarFallback className="text-3xl">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  
                  {!isOwnProfile && currentUser && (
                    <div className="mt-4 md:mt-0 md:ml-auto">
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          className="flex items-center space-x-2"
                        >
                          <Mail className="h-4 w-4" />
                          <span>Message</span>
                        </Button>
                        
                        {connectionStatus?.status === "none" && (
                          <Button
                            className="flex items-center space-x-2 bg-brandPurple hover:bg-brandPurple-dark"
                            onClick={handleConnect}
                          >
                            <UserPlus className="h-4 w-4" />
                            <span>Connect</span>
                          </Button>
                        )}
                        
                        {connectionStatus?.status === "pending" && (
                          <Button
                            variant="outline"
                            className="flex items-center space-x-2"
                            disabled
                          >
                            <span>Request Sent</span>
                          </Button>
                        )}
                        
                        {connectionStatus?.status === "received" && (
                          <Button
                            className="flex items-center space-x-2 bg-brandPurple hover:bg-brandPurple-dark"
                            onClick={handleAcceptConnection}
                          >
                            <UserCheck className="h-4 w-4" />
                            <span>Accept Request</span>
                          </Button>
                        )}
                        
                        {connectionStatus?.status === "connected" && (
                          <Button
                            variant="outline"
                            className="flex items-center space-x-2"
                          >
                            <UserCheck className="h-4 w-4" />
                            <span>Connected</span>
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {isOwnProfile && (
                    <div className="mt-4 md:mt-0 md:ml-auto">
                      <Button
                        className="bg-brandPurple hover:bg-brandPurple-dark"
                        onClick={() => window.location.href = "/settings"}
                      >
                        Edit Profile
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 md:mt-6">
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <p className="text-muted-foreground">
                    {user.headline || "ValWera Sports Member"}
                  </p>
                  <p className="text-sm mt-1">{user.location}</p>
                  
                  {isConnected && (
                    <p className="text-sm text-muted-foreground mt-1">
                      <span className="font-medium">Connected</span>
                    </p>
                  )}
                </div>
                
                {user.bio && (
                  <div className="mt-4 text-sm">
                    <p className="whitespace-pre-line">{user.bio}</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Tab Content */}
            <Tabs defaultValue="posts">
              <TabsList className="w-full">
                <TabsTrigger value="posts" className="flex-1">
                  Posts
                </TabsTrigger>
                <TabsTrigger value="about" className="flex-1">
                  About
                </TabsTrigger>
                <TabsTrigger value="connections" className="flex-1">
                  Connections
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="posts" className="mt-6">
                {postsLoading ? (
                  <div className="space-y-4">
                    {[1, 2].map((i) => (
                      <Card key={i} className="p-4 h-40 animate-pulse" />
                    ))}
                  </div>
                ) : posts && posts.length > 0 ? (
                  <div className="space-y-6">
                    {posts.map((post: Post) => (
                      <PostCard key={post._id} post={post} />
                    ))}
                  </div>
                ) : (
                  <Card className="p-8 text-center">
                    <h3 className="text-lg font-medium mb-2">No posts yet</h3>
                    <p className="text-muted-foreground">
                      {isOwnProfile
                        ? "Create your first post to share with your network"
                        : "This user hasn't posted anything yet"}
                    </p>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="about" className="mt-6">
                <Card className="p-6">
                  <h3 className="text-lg font-medium mb-4">About</h3>
                  
                  {user.bio ? (
                    <p className="whitespace-pre-line">{user.bio}</p>
                  ) : (
                    <p className="text-muted-foreground">
                      {isOwnProfile
                        ? "Add a bio to tell others about yourself"
                        : "This user hasn't added a bio yet"}
                    </p>
                  )}
                  
                  <h3 className="text-lg font-medium mt-6 mb-4">Sports</h3>
                  {user.sports && user.sports.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {user.sports.map((sport) => (
                        <span
                          key={sport}
                          className="px-3 py-1 bg-brandPurple/10 text-brandPurple rounded-full text-sm"
                        >
                          {sport}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">
                      {isOwnProfile
                        ? "Add your favorite sports to your profile"
                        : "This user hasn't added any sports yet"}
                    </p>
                  )}
                </Card>
              </TabsContent>
              
              <TabsContent value="connections" className="mt-6">
                <Card className="p-6">
                  <h3 className="text-lg font-medium mb-4">Connections</h3>
                  
                  <p className="text-muted-foreground">
                    Connections feature will be implemented soon
                  </p>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        ) : (
          <Card className="p-8 text-center">
            <h3 className="text-xl font-medium mb-2">User not found</h3>
            <p className="text-muted-foreground">
              This profile doesn't exist or you don't have permission to view it
            </p>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Profile;
