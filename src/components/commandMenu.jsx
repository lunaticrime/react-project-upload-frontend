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

const CommandMenu = (
  {
    /* isDarkMode*/
  }
) => {
  const { menuOpen, setMenuOpen } = useCommandMenu();
  const navigate = useNavigate();

  const handleSelect = (value) => {
    // Navigate to the selected path
    navigate(value);
    // Close the command dialog
    setMenuOpen(false);
  };

  return (
    <CommandDialog
      open={menuOpen}
      onOpenChange={setMenuOpen}
      className={`{ bg-amber-500`} //${isDarkMode ? 'dark' : ''}
    >
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          <CommandItem value="/" onSelect={handleSelect}>
            Home
          </CommandItem>
          <CommandItem value="/profile" onSelect={handleSelect}>
            profile
          </CommandItem>
          <CommandItem value="/login" onSelect={handleSelect}>
            login
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default CommandMenu;
