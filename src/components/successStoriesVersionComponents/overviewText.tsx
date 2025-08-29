import { PortableTextComponents } from "@portabletext/react";

const components: PortableTextComponents = {
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-gray-800">{children}</strong>
    ),
  },
  block: {
    normal: ({ children }) => (
      <p className="text-gray-600 mb-4">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold text-gray-800 mt-6 mb-3">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-gray-700 mt-5 mb-2">{children}</h3>
    ),
  },
};

export default components;
