
import { useQuery } from "@tanstack/react-query";
import Layout from "../components/Layout";
import CreatePostCard from "../components/CreatePostCard";
import PostCard from "../components/PostCard";
import { postService } from "@/services/post";
import { Card } from "@/components/ui/card";

const Feed = () => {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: postService.getPosts,
  });

  return (
    <Layout requireAuth>
      <div className="space-y-6">
        <CreatePostCard />

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-4 h-40 animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <Card className="p-4 text-center">
            <p className="text-destructive">Failed to load posts</p>
            <p className="text-sm text-muted-foreground mt-2">
              Please try again later
            </p>
          </Card>
        ) : posts && posts.length > 0 ? (
          <>
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </>
        ) : (
          <Card className="p-8 text-center">
            <h3 className="text-lg font-medium mb-2">No posts yet</h3>
            <p className="text-muted-foreground">
              Create your first post or connect with others to see their updates
            </p>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Feed;
