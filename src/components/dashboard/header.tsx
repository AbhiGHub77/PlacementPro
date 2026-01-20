import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { mockUser } from "@/lib/data";

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search..." className="w-full rounded-full pl-9" />
      </div>
      <Avatar className="h-9 w-9">
        <AvatarImage src={mockUser.avatarUrl} alt={mockUser.name} />
        <AvatarFallback>{mockUser.name.charAt(0)}</AvatarFallback>
      </Avatar>
    </header>
  );
}
