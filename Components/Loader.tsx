import Lottie from 'react-lottie';
import animationData from '@/public/loading.json';

export default function Loader({Height,Width}:{Height:number,Width:number}) {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "square"
        }
    };

    return (
        <div className=''>
            <Lottie
                options={defaultOptions}
                height={Height}
                width={Width}
            />
        </div>
    );
}