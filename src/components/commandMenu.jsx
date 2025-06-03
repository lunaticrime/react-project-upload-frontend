// CommandMenu.jsx
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { useNavigate } from "react-router-dom";
import { useCommandMenu } from "./CommandMenuContext";

const CommandMenu = () => {
  const { menuOpen, setMenuOpen } = useCommandMenu();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleSelect = (value) => {
    navigate(value);
    setMenuOpen(false);
  };

  return (
    <CommandDialog
      open={menuOpen}
      onOpenChange={setMenuOpen}
      className={`{ bg-amber-500`}
    >
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          <CommandItem value="/" onSelect={handleSelect}>
            Home
          </CommandItem>
          <CommandItem value="/profile" onSelect={handleSelect}>
            Profile
          </CommandItem>
          <CommandItem value="/feed" onSelect={handleSelect}>
            Feed
          </CommandItem>
          {!user && (
            <CommandItem value="/login" onSelect={handleSelect}>
              Login
            </CommandItem>
          )}
          {user?.role === "admin" && (
            <CommandItem value="/admin" onSelect={handleSelect}>
              Admin
            </CommandItem>
          )}
          {user?.role === "prof" && (
            <CommandItem value="/prof" onSelect={handleSelect}>
              Prof
            </CommandItem>
          )}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default CommandMenu;
