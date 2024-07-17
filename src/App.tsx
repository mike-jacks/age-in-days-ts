import "./App.css";
import Calculator from "./Components/Calculator/Calculator";

function App() {
  return (
    <>
      <header>
        <h1>Age in Days Calculator</h1>
        <p>
          Given how many years old someone is, <br /> this app will tell you how many days old they are.
        </p>
      </header>
      <main>
        <Calculator />
      </main>
    </>
  );
}

export default App;
