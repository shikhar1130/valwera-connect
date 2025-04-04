
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@/context/AuthContext";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Heart, MessageSquare, Share2, MoreHorizontal } from "lucide-react";
import { Post, postService } from "@/services/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { user } = useAuth();
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const queryClient = useQueryClient();

  if (!user) return null;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const isLiked = post.likes.includes(user._id);

  const likeMutation = useMutation({
    mutationFn: postService.likePost,
    onMutate: async () => {
      // Optimistic update
      const previousPosts = queryClient.getQueryData<Post[]>(["posts"]);
      
      if (previousPosts) {
        const updatedPosts = previousPosts.map((p) => {
          if (p._id === post._id) {
            const likes = [...p.likes];
            if (isLiked) {
              const index = likes.indexOf(user._id);
              if (index > -1) {
                likes.splice(index, 1);
              }
            } else {
              likes.push(user._id);
            }
            return { ...p, likes };
          }
          return p;
        });
        
        queryClient.setQueryData(["posts"], updatedPosts);
      }
      
      return { previousPosts };
    },
    onError: (_, __, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(["posts"], context.previousPosts);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const commentMutation = useMutation({
    mutationFn: postService.createComment,
    onSuccess: () => {
      setComment("");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleLike = () => {
    likeMutation.mutate(post._id);
  };

  const handleComment = async () => {
    if (!comment.trim()) return;
    
    setIsSubmittingComment(true);
    try {
      await commentMutation.mutateAsync({
        content: comment,
        postId: post._id,
      });
    } catch (err) {
      console.error("Error commenting:", err);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  return (
    <Card className="mb-6">
      <div className="p-4">
        {/* Post Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-start space-x-3">
            <Link to={`/profile/${post.author._id}`}>
              <Avatar>
                <AvatarImage src={post.author.profileImage} />
                <AvatarFallback>{getInitials(post.author.name)}</AvatarFallback>
              </Avatar>
            </Link>
            
            <div>
              <Link to={`/profile/${post.author._id}`} className="font-medium hover:underline">
                {post.author.name}
              </Link>
              <p className="text-xs text-muted-foreground">
                {post.author.headline || "ValWera Sports Member"}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
              </p>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Save post</DropdownMenuItem>
              <DropdownMenuItem>Report post</DropdownMenuItem>
              {user._id === post.author._id && (
                <DropdownMenuItem className="text-destructive">
                  Delete post
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Post Content */}
        <div className="mb-4">
          <p className="text-sm whitespace-pre-line">{post.content}</p>
          
          {post.image && (
            <img
              src={post.image}
              alt="Post attachment"
              className="mt-3 rounded-md max-h-96 w-full object-cover"
            />
          )}
        </div>

        {/* Post Stats */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2 border-b border-t py-2 border-gray-100">
          <div>{post.likes.length > 0 && `${post.likes.length} likes`}</div>
          <div>
            {post.comments.length > 0 &&
              `${post.comments.length} comment${post.comments.length !== 1 ? "s" : ""}`}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between pt-1">
          <Button
            variant="ghost"
            size="sm"
            className={`flex-1 ${isLiked ? "text-brandPurple" : ""}`}
            onClick={handleLike}
          >
            <Heart
              className={`h-4 w-4 mr-2 ${isLiked ? "fill-brandPurple" : ""}`}
            />
            Like
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="flex-1"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Comment
          </Button>
          
          <Button variant="ghost" size="sm" className="flex-1">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>

        {/* Comments */}
        {showComments && (
          <div className="mt-4 pt-2 border-t border-gray-100">
            {post.comments.length > 0 && (
              <div className="mb-4 space-y-4">
                {post.comments.map((comment) => (
                  <div key={comment._id} className="flex items-start space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={comment.author.profileImage} />
                      <AvatarFallback>
                        {getInitials(comment.author.name)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="bg-muted rounded-lg p-3">
                        <Link
                          to={`/profile/${comment.author._id}`}
                          className="font-medium text-xs hover:underline"
                        >
                          {comment.author.name}
                        </Link>
                        <p className="text-sm">{comment.content}</p>
                      </div>
                      
                      <div className="flex items-center mt-1 space-x-4">
                        <button className="text-xs text-muted-foreground hover:text-foreground">
                          Like
                        </button>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(comment.createdAt), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Add Comment */}
            <div className="flex items-start space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.profileImage} />
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <Textarea
                  placeholder="Write a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="min-h-20 resize-none"
                />
                
                <div className="flex justify-end mt-2">
                  <Button
                    size="sm"
                    className="bg-brandPurple hover:bg-brandPurple-dark"
                    disabled={!comment.trim() || isSubmittingComment}
                    onClick={handleComment}
                  >
                    {isSubmittingComment ? "Posting..." : "Post"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default PostCard;
