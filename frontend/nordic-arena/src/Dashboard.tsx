import Navbar from "./components/navbar";
import Footer from "./components/footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F0F9FF]">
      <Navbar></Navbar>
      <div className="flex flex-1 min-h-[900px] items-center justify-center">
        <h1 className="text-4xl font-bold text-[#0F172A]">
          Velkommen til Nordic Arena
        </h1>
      </div>
      <Footer />
    </div>
  );
}

export default App;
