import Nav from "./Nav";

export default function Layout({ children }) {
  return (
    <div className="mx-6 md:max-w-2xl lg:max-w-4xl md:mx-auto font-poppins">
      <Nav />
      <main>{children}</main>
    </div>
  );
}
