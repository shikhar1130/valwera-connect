
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { User, UserPlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useState } from "react";

const RightBar = () => {
  // In a real app, these would come from an API
  const [suggestedConnections] = useState([
    {
      id: "1",
      name: "Michael Jordan",
      headline: "Basketball Legend | 6x NBA Champion",
      avatar: "",
    },
    {
      id: "2",
      name: "Serena Williams",
      headline: "Tennis Pro | 23 Grand Slam Titles",
      avatar: "",
    },
    {
      id: "3",
      name: "Lionel Messi",
      headline: "Footballer | 8x Ballon d'Or Winner",
      avatar: "",
    },
  ]);

  const [events] = useState([
    {
      id: "1",
      title: "Local Basketball Tournament",
      date: "Apr 15, 2025",
    },
    {
      id: "2",
      title: "Sports Networking Meetup",
      date: "Apr 20, 2025",
    },
  ]);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="space-y-6 sticky top-20">
      {/* Suggested Connections */}
      <Card>
        <div className="p-4">
          <h3 className="text-sm font-medium mb-3">People You May Know</h3>
          
          <div className="space-y-4">
            {suggestedConnections.map((connection) => (
              <div key={connection.id} className="flex items-start">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={connection.avatar} />
                  <AvatarFallback>{getInitials(connection.name)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium line-clamp-1">
                    {connection.name}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {connection.headline}
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-2 w-full flex items-center justify-center"
                  >
                    <UserPlus className="h-3 w-3 mr-1" />
                    Connect
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            className="w-full mt-3 text-brandPurple hover:text-brandPurple-dark"
          >
            View more
          </Button>
        </div>
      </Card>

      {/* Upcoming Events */}
      <Card>
        <div className="p-4">
          <h3 className="text-sm font-medium mb-3">Upcoming Events</h3>
          
          <div className="space-y-3">
            {events.map((event) => (
              <div key={event.id} className="border-l-2 border-brandPurple pl-3">
                <h4 className="text-sm font-medium">{event.title}</h4>
                <p className="text-xs text-muted-foreground">{event.date}</p>
              </div>
            ))}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            className="w-full mt-3 text-brandPurple hover:text-brandPurple-dark"
          >
            View all events
          </Button>
        </div>
      </Card>

      {/* Footer */}
      <div className="text-xs text-muted-foreground p-2">
        <div className="flex flex-wrap gap-x-2">
          <a href="#" className="hover:underline">About</a>
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">Help Center</a>
        </div>
        <p className="mt-2">© 2025 ValWera Sports</p>
      </div>
    </div>
  );
};

export default RightBar;
