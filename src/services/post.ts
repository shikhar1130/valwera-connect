
import { api } from "./api";
import { User } from "./auth";

export interface Post {
  _id: string;
  content: string;
  author: User;
  likes: string[];
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
  image?: string;
}

export interface Comment {
  _id: string;
  content: string;
  author: User;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostData {
  content: string;
  image?: File;
}

export interface CreateCommentData {
  content: string;
  postId: string;
}

export const postService = {
  getPosts: () => {
    return api.get<Post[]>("/posts");
  },
  
  createPost: (data: CreatePostData) => {
    // In a real app, we would use FormData for file uploads
    return api.post<Post>("/posts", data);
  },
  
  likePost: (postId: string) => {
    return api.put<Post>(`/posts/${postId}/like`, {});
  },
  
  createComment: (data: CreateCommentData) => {
    return api.post<Comment>(`/posts/${data.postId}/comments`, { content: data.content });
  },
  
  getUserPosts: (userId: string) => {
    return api.get<Post[]>(`/posts/user/${userId}`);
  }
};
