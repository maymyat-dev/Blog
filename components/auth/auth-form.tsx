import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProviderLogin from "./provider-login";
import AuthFooter from "./auth-footer";
import logo from "@/public/img/logo.png";

type AuthFormProps = {
  children: React.ReactNode;
  formTitle: string;
  showProvider: boolean;
  footerLabel: string;
  footerHref: string;
};

function AuthForm({
  children,
  formTitle,
  showProvider,
  footerLabel,
  footerHref,
}: AuthFormProps) {
  return (
      <Card className="w-full shadow-lg rounded-xl overflow-hidden">
        <CardHeader className="text-center">
          <img
            src={logo.src}
            alt="Logo"
            width={60}
            height={60}
            className="mx-auto mb-4"
          />
          <CardTitle className="text-2xl font-bold">{formTitle}</CardTitle>
        </CardHeader>

        <CardContent>{children}</CardContent>

        <CardFooter className="flex flex-col gap-4">
          {showProvider && <ProviderLogin />}
          <AuthFooter footerHref={footerHref} footerLabel={footerLabel} />
        </CardFooter>
      </Card>
  );
}

export default AuthForm;
