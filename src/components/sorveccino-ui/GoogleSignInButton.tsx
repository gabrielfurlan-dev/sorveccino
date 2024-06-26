import { ReactNode, FC } from "react";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { GoogleLogo } from "@phosphor-icons/react/dist/ssr";

interface GoogleSignInButtonProps {
    children: ReactNode;
}

const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({ children }) => {
    const loginWithGoogle = () => signIn('google');

    return (
        <Button onClick={loginWithGoogle} variant="outline" className="w-[448px] h-[56px] gap-2">
            <GoogleLogo size={24} /> {children}
        </Button>
    )
}

export default GoogleSignInButton;