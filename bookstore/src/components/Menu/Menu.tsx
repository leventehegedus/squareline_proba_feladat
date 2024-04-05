import { useAppDispatch, useAppSelector } from "@/hooks";
import { NavLink } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Flex, Text } from "@radix-ui/themes";
import LockSlash from "./assets/lock-slash-svgrepo-com.svg";
import Star from "./assets/star-1-svgrepo-com.svg";
import Profile from "./assets/profile-svgrepo-com.svg";
import Home from "./assets/home-1-svgrepo-com.svg";
import LoginModal from "../LoginModal/LoginModal";
import { logout } from "@/features/auth/authSlice";
import { Button } from "../ui/button";

const Menu: React.FC = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const isLoggedIn = useAppSelector((state) => state.authSlice.isLoggedIn);

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
          <LoginModal />
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
