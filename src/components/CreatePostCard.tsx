
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ImageIcon, SmileIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postService } from "@/services/post";

const CreatePostCard = () => {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: postService.createPost,
    onSuccess: () => {
      setContent("");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast({
        title: "Post created",
        description: "Your post has been published",
      });
    },
  });

  if (!user) return null;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleSubmit = async () => {
    if (!content.trim()) return;
    
    setIsSubmitting(true);
    try {
      await createPostMutation.mutateAsync({ content });
    } catch (err) {
      console.error("Error creating post:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="mb-6">
      <div className="p-4">
        <div className="flex space-x-3">
          <Avatar>
            <AvatarImage src={user.profileImage} />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <Textarea
              placeholder="Share something with your network..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-28 resize-none"
            />
            
            <div className="flex items-center justify-between mt-4">
              <div className="flex space-x-2">
                <Button variant="outline" size="icon" className="rounded-full" disabled={isSubmitting}>
                  <ImageIcon className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full" disabled={isSubmitting}>
                  <SmileIcon className="h-4 w-4" />
                </Button>
              </div>
              
              <Button 
                onClick={handleSubmit} 
                disabled={!content.trim() || isSubmitting}
                className="bg-brandPurple hover:bg-brandPurple-dark"
              >
                {isSubmitting ? "Posting..." : "Post"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CreatePostCard;
