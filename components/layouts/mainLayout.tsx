import Footer from "../commons/footer";
import Header from "../commons/header";


export default function MainLayout({ children }) {
    return (
      <>
        <Header />
        <main>{children}</main>
        <Footer />
      </>
    )
  }