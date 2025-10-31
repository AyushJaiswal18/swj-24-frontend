import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";

interface Idea {
  _id: string;
  name: string;
  title: string;
  description: string;
  owner: {
    name: string;
  };
  ownerCode: string;
  votes: [string];
}

export default function VotingForIdeas() {
  const [searchParam, setSearchParam] = useState("");
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [participantId, setParticipantId] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const ideasPerPage = 12;

  const handleVote = async (idea: Idea) => {
    setSelectedIdea(idea);
    setIsDialogOpen(true);
  };

  const fetchIdeas = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        "https://swj-server.builtwithayush.tech/api/v1/idea/getAll"
      );
      setIdeas(res.data.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load ideas",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, []);

  const confirmVote = async () => {
    if (!selectedIdea) return;

    setIsConfirming(true);
    console.log("test")

    try {
      const response: any = await axios.post(
        "https://swj-server.builtwithayush.tech/api/v1/idea/vote",
        {
          ideaId: selectedIdea._id,
          voterCode: participantId,
        }
      );
      toast({
        title: "Vote Confirmed",
        description: `Voted as ${response.data.data.name} for ${selectedIdea.title}`,
        variant: "default",
        className: "bg-green-500",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response.data.message,
        variant: "destructive",
      });
    } finally {
      setIsConfirming(false);
      setIsDialogOpen(false);
      setParticipantId("");
    }
  };

  const filteredIdeas = ideas
    .filter((idea) => {
      return (
        idea.title.toLowerCase().includes(searchParam.toLowerCase()) ||
        idea.description.toLowerCase().includes(searchParam.toLowerCase())
      );
    })
    .sort((a, b) => b.votes.length - a.votes.length);

  const totalPages = Math.ceil(filteredIdeas.length / ideasPerPage);
  const startIndex = (currentPage - 1) * ideasPerPage;
  const paginatedIdeas = filteredIdeas.slice(startIndex, startIndex + ideasPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchParam]);

  return (
    <>
      <div className="container mx-auto p-6 mt-24 min-h-[100svh]">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Vote for your favorite idea!
        </h1>
        <div className="flex items-center justify-center mb-5">
          <Input
            placeholder="Search"
            className="text-brand "
            value={searchParam}
            onChange={(e) => setSearchParam(e.target.value)}
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="h-12 w-12 animate-spin text-brand" />
          </div>
        ) : (
          <>
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6">
              {paginatedIdeas.map((idea, index) => (
                <motion.div
                  className="mb-6 break-inside-avoid"
                  key={idea._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0 }}
                >
                  <Card className="h-min w-full border-2 border-brand bg-background">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold">
                        {idea.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        By {idea.owner.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Total Votes : {idea.votes.length}
                      </p>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <ScrollArea>
                        <p className="text-sm">{idea.description}</p>
                      </ScrollArea>
                    </CardContent>
                    <CardFooter className="">
                      <Button
                        className="w-full rounded-full"
                        onClick={() => handleVote(idea)}
                      >
                        Vote for This Idea
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-8">
                <Button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="rounded-full"
                >
                  Previous
                </Button>
                <span className="text-sm">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="rounded-full"
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="border-2 border-brand">
            <DialogHeader>
              <DialogTitle className="text-brand">
                Confirm Your Vote
              </DialogTitle>
              <DialogDescription>
                Please enter your participant code to vote for "
                {selectedIdea?.title}".
              </DialogDescription>
            </DialogHeader>
            <Input
              placeholder="Enter your participant code"
              className="text-brand"
              value={participantId}
              maxLength={6}
              minLength={6}
              onChange={(e) => setParticipantId(e.target.value.toUpperCase())}
            />
            <DialogFooter>
              <Button
                className="rounded-full"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="rounded-full mb-2"
                onClick={confirmVote}
                disabled={!participantId || isConfirming}
              >
                {isConfirming ? "Confirming..." : "Confirm Vote"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Toaster />
    </>
  );
}