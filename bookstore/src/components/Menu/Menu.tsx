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
import { Flex, Text, Box } from "@radix-ui/themes";
import Lock from "./lock-svgrepo-com.svg";
import LockSlash from "./lock-slash-svgrepo-com.svg";
import Star from "./star-1-svgrepo-com.svg";
import Profile from "./profile-svgrepo-com.svg";
import Home from "./home-1-svgrepo-com.svg";

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
      <Flex className="h-12 bg-orange-400 items-center px-4 md:px-16 justify-end">
        {!isLoggedIn ? (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <img src={Lock} className="w-6" />
                <Text>Login</Text>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <Box className="grid gap-4 py-4">
                <Box className="grid grid-cols-4 items-center gap-4">
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
                </Box>
                <Box className="grid grid-cols-4 items-center gap-4">
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
                </Box>
              </Box>
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
        ) : (
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => handleLogout()}
          >
            <img src={LockSlash} className="w-6" />
            <Text>Logout</Text>
          </Button>
        )}
      </Flex>
      <Flex className="h-12 bg-slate-100 items-center px-4 md:px-16 justify-end">
        <>
          <Flex gap="2">
            <NavLink to={`/`}>
              {" "}
              <img src={Home} className="w-6" />
            </NavLink>
            {isLoggedIn && (
              <>
                <NavLink to={`/favorites`}>
                  {" "}
                  <img src={Star} className="w-6" />
                </NavLink>
                <img src={Profile} className="w-6" />
              </>
            )}
          </Flex>
        </>
      </Flex>
    </>
  );
};

export default Menu;
