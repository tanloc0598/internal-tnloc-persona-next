import { ReactElement } from "react";
import Footer from "../commons/footer";
import Header from "../commons/header";

type LayoutProps = {
  children: ReactElement
}

const MainLayout: (properties: LayoutProps) => JSX.Element = ({children}: LayoutProps) => {
// export default function MainLayout({ children }) {
    return (
      <>
        <Header />
        <main>{children}</main>
        <Footer />
      </>
    )
}

export default MainLayout
