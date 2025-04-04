
import { useQuery } from "@tanstack/react-query";
import Layout from "../components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Briefcase, MapPin, Clock, Filter } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for jobs/trials
const mockJobs = [
  {
    id: "1",
    title: "Basketball Coach",
    company: "City Sports Club",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$45,000 - $60,000",
    posted: "2 days ago",
    logo: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=100&h=100&fit=crop",
    description: "Experienced basketball coach needed for youth training program."
  },
  {
    id: "2",
    title: "Tennis Instructor",
    company: "Tennis Academy",
    location: "Los Angeles, CA",
    type: "Part-time",
    salary: "$25-35/hour",
    posted: "1 week ago",
    logo: "https://images.unsplash.com/photo-1618355776464-8666794d2520?w=100&h=100&fit=crop",
    description: "Looking for tennis instructors to teach beginner and intermediate level players."
  },
  {
    id: "3",
    title: "Football Referee",
    company: "Regional Sports League",
    location: "Chicago, IL",
    type: "Contract",
    salary: "$80-120/game",
    posted: "3 days ago",
    logo: "https://images.unsplash.com/photo-1554816718-43300f1c3818?w=100&h=100&fit=crop",
    description: "Certified football referees needed for weekend games throughout the season."
  },
  {
    id: "4",
    title: "Sports Physiotherapist",
    company: "Athletes Recovery Center",
    location: "Remote",
    type: "Full-time",
    salary: "$70,000 - $90,000",
    posted: "5 days ago",
    logo: "https://images.unsplash.com/photo-1573669570332-ec6d2d955c2e?w=100&h=100&fit=crop",
    description: "Experienced physiotherapist to work with professional athletes on injury prevention and recovery."
  }
];

// Mock function to simulate API fetch
const fetchJobs = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockJobs);
    }, 1000);
  });
};

const Jobs = () => {
  const { 
    data: jobs, 
    isLoading 
  } = useQuery({
    queryKey: ["jobs"],
    queryFn: () => fetchJobs() as Promise<typeof mockJobs>
  });

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Layout requireAuth>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Jobs & Trials</h1>
          <Button 
            variant="outline" 
            className="flex items-center"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Job Search */}
        <Card className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Job title, keyword, or company"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brandPurple"
              />
            </div>
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Location or remote"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brandPurple"
              />
            </div>
            <Button className="bg-brandPurple hover:bg-brandPurple-dark whitespace-nowrap">
              Search Jobs
            </Button>
          </div>
        </Card>

        {/* Featured Jobs */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Featured Opportunities</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center p-4 animate-pulse border-b last:border-0">
                    <div className="w-12 h-12 rounded-md bg-gray-200 mr-4" />
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
                      <div className="h-3 bg-gray-200 rounded w-1/4 mb-2" />
                      <div className="h-3 bg-gray-200 rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : jobs && jobs.length > 0 ? (
              <div className="divide-y">
                {jobs.map((job) => (
                  <div key={job.id} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex items-start">
                      <Avatar className="h-12 w-12 rounded-md mr-4">
                        <AvatarImage src={job.logo} />
                        <AvatarFallback className="rounded-md bg-brandPurple text-white">
                          {getInitials(job.company)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <Link to={`/jobs/${job.id}`} className="text-lg font-medium hover:text-brandPurple transition-colors">
                          {job.title}
                        </Link>
                        <div className="text-sm text-muted-foreground">{job.company}</div>
                        
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <MapPin className="h-3.5 w-3.5 mr-1" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Briefcase className="h-3.5 w-3.5 mr-1" />
                            <span>{job.type}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3.5 w-3.5 mr-1" />
                            <span>Posted {job.posted}</span>
                          </div>
                        </div>
                        
                        <p className="mt-2 text-sm line-clamp-2">{job.description}</p>
                      </div>
                      
                      <div className="ml-4 flex-shrink-0">
                        <Button
                          variant="outline"
                          className="text-brandPurple border-brandPurple hover:bg-brandPurple hover:text-white transition-colors"
                        >
                          Apply
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No jobs available at the moment</p>
            )}
          </CardContent>
        </Card>

        {/* Sport Categories */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Browse by Sport</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Basketball", "Football", "Tennis", "Swimming", "Golf", "Volleyball", "Running", "Cycling"].map((sport) => (
                <Button key={sport} variant="outline" className="justify-start h-auto py-4 px-5">
                  <span>{sport}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Jobs;
