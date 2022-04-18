import {useState,useLayoutEffect} from 'react';

const useWindowSize = () => {

    const [screenWidth,setScreenWidth]=useState(0);
    const [screenHeight,setScreenHeight]=useState(0);

    useLayoutEffect(()=>{

        const handleResize=()=>{
            setScreenHeight(window.innerHeight);
            setScreenWidth(window.innerWidth);
        }

        handleResize();
        window.addEventListener('resize',handleResize);
        return ()=>{
            window.removeEventListener('resize',handleResize);
        }
    },[])
    return [screenWidth,screenHeight];
}

export default useWindowSize;
