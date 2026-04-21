import Navbar from "./components/navbar";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F0F9FF]">
      <Navbar></Navbar>
      <div className="flex flex-1 items-center justify-center">
        <h1 className="text-4xl font-bold text-[#0F172A]">
          Velkommen til Nordic Arena
        </h1>
      </div>
    </div>
  );
}

export default App;
