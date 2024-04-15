import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const AuthLayout: FC<Props> = ({ children }): JSX.Element => {
  return (
    <div className="h-full flex items-center justify-center">{children}</div>
  );
};

export default AuthLayout;
