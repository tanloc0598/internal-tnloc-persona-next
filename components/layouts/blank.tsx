import { ReactElement } from "react";
import Footer from "../commons/footer";
import Header from "../commons/header";

type LayoutProps = {
  children: ReactElement
}

const Blank: (properties: LayoutProps) => JSX.Element = ({children}: LayoutProps) => {
    return (
      <>
        <main>{children}</main>
      </>
    )
}

export default Blank