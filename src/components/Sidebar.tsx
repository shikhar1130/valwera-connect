
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card } from "./ui/card";
import { Link } from "react-router-dom";
import { Activity, Award, UserPlus, BookMarked, Bookmark } from "lucide-react";

const Sidebar = () => {
  const { user } = useAuth();

  if (!user) return null;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const sportsList = user.sports || ["Basketball", "Football", "Tennis"];

  return (
    <div className="space-y-6 sticky top-20">
      <Card className="overflow-hidden">
        {/* Cover Image */}
        <div className="h-20 bg-gradient-to-r from-brandPurple to-brandPurple-dark" />
        
        {/* Profile Summary */}
        <div className="px-4 pb-4 text-center -mt-10">
          <Avatar className="h-20 w-20 border-4 border-white mx-auto">
            <AvatarImage src={user.profileImage} />
            <AvatarFallback className="text-xl">{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          
          <Link to={`/profile/${user._id}`} className="block mt-2">
            <h3 className="font-semibold text-lg">{user.name}</h3>
          </Link>
          
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
            {user.headline || "ValWera Sports Member"}
          </p>
        </div>
      </Card>

      {/* Navigation Links */}
      <Card>
        <div className="p-2">
          <Link to="/connections" className="flex items-center p-2 rounded-md hover:bg-muted">
            <UserPlus className="h-4 w-4 mr-3" />
            <span className="text-sm">My Connections</span>
          </Link>
          
          <Link to="/saved" className="flex items-center p-2 rounded-md hover:bg-muted">
            <Bookmark className="h-4 w-4 mr-3" />
            <span className="text-sm">Saved Posts</span>
          </Link>
          
          <Link to="/my-sports" className="flex items-center p-2 rounded-md hover:bg-muted">
            <Activity className="h-4 w-4 mr-3" />
            <span className="text-sm">My Sports</span>
          </Link>
          
          <Link to="/events" className="flex items-center p-2 rounded-md hover:bg-muted">
            <Award className="h-4 w-4 mr-3" />
            <span className="text-sm">Events</span>
          </Link>
          
          <Link to="/articles" className="flex items-center p-2 rounded-md hover:bg-muted">
            <BookMarked className="h-4 w-4 mr-3" />
            <span className="text-sm">Articles</span>
          </Link>
        </div>
      </Card>

      {/* My Sports */}
      <Card>
        <div className="p-4">
          <h3 className="text-sm font-medium mb-3">My Sports</h3>
          
          <div className="space-y-2">
            {sportsList.map((sport, index) => (
              <div key={index} className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-brandPurple mr-2" />
                <span className="text-sm">{sport}</span>
              </div>
            ))}
            
            <Link to="/add-sports" className="text-xs text-brandPurple hover:underline block mt-1">
              + Add more sports
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Sidebar;
