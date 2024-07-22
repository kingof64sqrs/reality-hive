import React, { Suspense } from "react";
import { Environment, Html, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import backgroundImage from "./assets/bg/sepulchral_chapel_rotunda_2k.hdr";
import Ground from "./components/Ground";
import View from "./View2";
import Experiment_01 from "./experiments/chemistry/Experiment_01";
import Experiment_02 from "./experiments/chemistry/Experiment_02";
import Experiment_03 from "./experiments/chemistry/Experiment_03";
import Experiment_05 from "./experiments/chemistry/Experiment_05";
import Experiment_06 from "./experiments/chemistry/Experiment_06";
import Experiment_10 from "./experiments/chemistry/Experiment_10";
import TextToVideoGenerator from "./experiments/chemistry/TextToVideoGenerator";

import { ChevronRight, X } from "lucide-react";
import Loader from "./components/Loader";

const experiments = [
  {
    label: "Beyer's Test",
    element: <Experiment_02 />,
  },
  {
    label: "Fehling's Test",
    element: <Experiment_03 />,
  },
  {
    label: "Bromine Water Test",
    element: <Experiment_01 />,
  },
  {
    label: "Tollen's Test",
    element: <Experiment_05 />,
  },
  {
    label: "Iodine Test",
    element: <Experiment_06/>,
  },
  {
    label: "Enthalpy of Dissolution",
    element: <Html />,
  },
  {
    label: "Acid/Base Test",
    element: <Experiment_10 />,
  },
] as {
  element: JSX.Element;
  label: string;
}[];

function App() {
  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = React.useState(-1);

  return (
    <>
      <div
        className={`absolute top-0 bottom-0 w-1/2 z-10 bg-white rounded m-4 max-w-md py-8 px-6 transition-all shadow duration-700 left-0 ${
          open || "-left-[460px]"
        }`}
      >
        <div className="relative prose prose-slate prose-ul:list-none prose-ul:p-0 prose-li:border prose-li:shadow prose-li:p-4 prose-li:rounded prose-li:cursor-pointer prose-li:bg-slate-950">
          <div className="flex justify-between">
            <h1>🧪 Experiments</h1>
            <X onClick={() => setOpen(false)} className="cursor-pointer" />
          </div>

          <ChevronRight
            className={`cursor-pointer absolute text-white -right-12 top-1/2 hover:-right-14 transition-all ${
              open && "scale-150"
            }`}
            onClick={() => setOpen(true)}
          />

          <ul className="grid gap-x-4 grid-cols-2 text-white font-semibold">
            {experiments.map((e, i) => (
              <li
                className="flex text-center items-center justify-center"
                onClick={() => setIndex(i)}
                key={i}
              >
                {e.label}
              </li>
            ))}
          </ul>
          <div className="flex justify-center items-end h-full">
            <button
              onClick={() => {
                window.location.href = "http://127.0.0.1:5000/";
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Text to Video
            </button>
          </div>
        </div>
      </div>

      <Canvas camera={{ position: [5, 1.3, 8], fov: 50 }}>
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={2} />
          <directionalLight intensity={1} position={[0, 10, 0]} />
          <pointLight intensity={2} position={[1, 1, 1]} />

          <View />
          {index !== -1 && experiments[index].element}
          <Environment background files={backgroundImage} />
        </Suspense>
      </Canvas>
    </>
  );
}

export default App;
