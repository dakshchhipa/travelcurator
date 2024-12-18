import aboutImg from "../assets/images/about_img.png";
import { FaExternalLinkAlt } from "react-icons/fa";

const About = () => {
  return (
    <div className="w-full flex justify-center bg-gray-50 py-8">
      <div className="w-[90%] max-w-2xl rounded-xl shadow-lg bg-white p-6 flex flex-col gap-6">
        <h1 className="text-4xl text-center font-semibold text-gray-800">About</h1>
        <div className="w-max flex flex-col items-center">
          <img src={aboutImg} className="w-40 h-40 rounded-full border-2 border-gray-300" alt="Image" />
          <h1 className="text-xl font-semibold text-center text-gray-700 mt-4">Daksh Chhipa</h1>
        </div>
        <ul className="list-disc w-max mx-5 text-gray-600">
          <li className="hover:underline hover:text-blue-600 cursor-pointer">
            <a
              className="flex items-center gap-2"
              href="https://github.com/dakshchhipa"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub <FaExternalLinkAlt />
            </a>
          </li>
          <li className="hover:underline hover:text-blue-600 cursor-pointer">
            <a
              className="flex items-center gap-2"
              href="https://www.linkedin.com/in/daksh-chhipa-5a99a9228/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn <FaExternalLinkAlt />
            </a>
          </li>
        </ul>
        <p className="text-gray-600 text-center mt-4">
          A passionate developer focused on building innovative and scalable web applications.
        </p>
      </div>
    </div>
  );
};

export default About;
