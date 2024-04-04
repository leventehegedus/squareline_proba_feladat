import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login, logout } from "@/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const Menu: React.FC = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const isLoggedIn = useAppSelector((state) => state.authSlice.isLoggedIn);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username && password) {
      console.log("pina");
      dispatch(login());
      toast({
        description: "Logged in",
        duration: 3000,
      });
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    toast({
      description: "Logged out",
      duration: 3000,
    });
  };

  return (
    <>
      <Dialog>
        {!isLoggedIn && (
          <DialogTrigger asChild>
            <Button variant="outline">Login</Button>
          </DialogTrigger>
        )}
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                placeholder="username"
                className="col-span-3"
                value={username}
                onChange={(e) =>
                  setUsername((e.target as HTMLInputElement).value)
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input
                id="password"
                placeholder="***"
                className="col-span-3"
                value={password}
                onChange={(e) =>
                  setPassword((e.target as HTMLInputElement).value)
                }
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <Button
              type="button"
              variant="secondary"
              onClick={() => handleLogin()}
            >
              Login
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {isLoggedIn && <Button onClick={() => handleLogout()}>Logout</Button>}
      <NavLink to={`/favorites`}>Favorites</NavLink>
      <NavLink to={`/`}>Home</NavLink>
    </>
  );
};

export default Menu;
