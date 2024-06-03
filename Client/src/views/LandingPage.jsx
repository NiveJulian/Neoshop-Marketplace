import axios from "axios";
import bgVideo from "../assets/videos/video2.mp4";
import Nav from "../components/Nav/Nav";

const LandingPage = () => {
  const postFakeApi = async () => {
    try {
      const response = await axios.post("http://localhost:3001/");
    } catch (error) {
      console.error("Error al hacer el fake POST:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <Nav />
      <header className="relative w-full h-[31vh] flex flex-col items-center justify-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={bgVideo} type="video/mp4" />
        </video>
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-4xl font-bold mb-4">Welcome to Neo Shop</h1>
          <p className="text-lg font-semibold mb-6">
            Our project aims to create an innovative marketplace allowing users
            to create personalized stores, securely make purchases, and settle
            payments through the page.
          </p>
          <button
            className="px-6 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-gray-900 font-semibold rounded-lg shadow-lg transform transition-transform duration-100 active:translate-y-[5%] hover:shadow-sm active:shadow-2xl"
            onClick={() => (window.location.href = "/home")}
          >
            <strong>Go to Store</strong>
          </button>
          <button
            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-gray-900 font-semibold rounded-lg shadow-lg transform transition-transform duration-100 active:translate-y-[5%] hover:shadow-sm active:shadow-2xl"
            onClick={postFakeApi}
          >
            <strong>post products</strong>
          </button>
        </div>
      </header>

      <section id="features" className="py-12 px-6 bg-white">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Why Choose Neo Shop?
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          <div className="bg-gray-100 rounded-lg p-6 max-w-sm shadow-lg">
            <h3 className="text-xl font-bold mb-4">Personalized Stores</h3>
            <p>
              Create and customize your store with ease using our intuitive
              tools.
            </p>
          </div>
          <div className="bg-gray-100 rounded-lg p-6 max-w-sm shadow-lg">
            <h3 className="text-xl font-bold mb-4">Secure Transactions</h3>
            <p>
              Enjoy safe and secure purchases with our robust payment system.
            </p>
          </div>
          <div className="bg-gray-100 rounded-lg p-6 max-w-sm shadow-lg">
            <h3 className="text-xl font-bold mb-4">Easy Integration</h3>
            <p>Integrate with various platforms and services effortlessly.</p>
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-12 px-6 bg-gray-100">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Customer Testimonials
        </h2>
        <div className="bg-white rounded-lg p-6 max-w-2xl mx-auto shadow-lg mb-6">
          <p className="mb-4">
            Neo Shop made it so easy to set up my online store. The process was
            seamless and secure!
          </p>
          <p className="font-bold">- Happy Customer</p>
        </div>
        <div className="bg-white rounded-lg p-6 max-w-2xl mx-auto shadow-lg">
          <p className="mb-4">
            A fantastic platform that allows for customization and secure
            transactions. Highly recommend!
          </p>
          <p className="font-bold">- Satisfied User</p>
        </div>
      </section>

      <footer
        id="github"
        className="w-full py-4 bg-gray-800 text-white text-center"
      >
        <button
          className="px-6 py-2 bg-gray-900 border border-white rounded-lg transition-colors duration-300 hover:bg-gray-700"
          onClick={() =>
            (window.location.href =
              "https://github.com/Proyecto-final-organization")
          }
        >
          <strong>Go to GitHub</strong>
        </button>
      </footer>
    </div>
  );
};

export default LandingPage;
