import { Canvas } from "@react-three/fiber";
import { useState, Suspense, useRef, useEffect } from "react";
import Loader from "../Components/Loader";
import Island from "../models/Island";
import Sky from "../models/Sky";
import Bird from "../models/Bird";
import Plane from "../models/Plane";
import HomeInfo from "../Components/HomeInfo.jsx";
import sakura from "../assets/sakura.mp3";
import { soundoff, soundon } from "../assets/icons/index.js";


const Home = () => {

  const audioRef = useRef(new Audio(sakura));
  audioRef.current.volume = 0.4;
  audioRef.current.loop = true;

  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  useEffect(() => {
    if(isPlayingMusic) {
      audioRef.current.play();
    }

    return () => {
      audioRef.current.pause();
    }
  }, [isPlayingMusic]);

  const adjustIslandForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
      screenPosition = [0, -6.5, -43.4];
    } else {
      screenScale = [1, 1, 1];
      screenPosition = [0, -6.5, -43.4];
    }

    return [screenScale, screenPosition];
  };

  const adjustPlaneForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition=[0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPosition=[0, -4, -4];
    }

    return [screenScale, screenPosition];
  }

  const [isIslandScale, isIslandPosition, islandrotation] = adjustIslandForScreenSize();

  const [planeScale, planePosition ] = adjustPlaneForScreenSize();

  return (
    <section className="w-full h-screen relative">
      <div className="flex items-center justify-center absolute top-28 left-0 right-0 z-10">
        { currentStage && <HomeInfo currentStage={currentStage} />}
      </div>

      <Canvas className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader/>}>
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <hemisphereLight skyColor="#b1e1ff" groundColor={"#000000"} intensity={1} />

          <Plane position={planePosition} scale={planeScale} isRotating={isRotating} rotation={[0, 20, 0]} />
          <Bird />
          <Sky isRotating={isRotating} />

          <Island position={isIslandPosition} scale={isIslandScale} rotation={islandrotation} isRotating={isRotating} setIsRotating={setIsRotating} setCurrentStage={setCurrentStage} />
        </Suspense>
      </Canvas>

      <div>
        <img src={!isPlayingMusic ? soundoff : soundon} alt="i" onClick={() => setIsPlayingMusic(!isPlayingMusic)} className="w-10 h-10 cursor-pointer object-contain" />
      </div>
    </section>
  )
}

export default Home