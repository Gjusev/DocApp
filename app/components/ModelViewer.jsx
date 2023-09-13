import { Canvas } from 'react-three-fiber';
import { OrbitControls } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

const ModelViewer = ({ modelPath }) => {
    const obj = useLoader(OBJLoader, modelPath);
    console.log(obj);
    console.log(modelPath);
    return (  
        <h1>
            TEst
            <Canvas>
                <ambientLight intensity={0.5} />
                <directionalLight intensity={0.5} position={[10, 10, 5]} />
                <orbitControls />
                <primitive object={obj} />
            </Canvas>
        </h1> 
    );
};

export default ModelViewer;
