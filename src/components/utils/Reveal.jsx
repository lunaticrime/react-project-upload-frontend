import React,{useEffect,useRef,useState} from 'react';
import {motion,useAnimation,useInView} from 'framer-motion';

export const Reveal = ({children,width = "fit-content",isDarkMode}) => {
    const ref = useRef(null);
    const isInView = useInView(ref,{once:false});

    const mainControls = useAnimation();
    const slideControls = useAnimation();
    useEffect(() => {
        if(isInView){
            mainControls.start("visible");
            slideControls.start("visible");
        }
    },[isInView]);
    return(
        <div ref={ref} style={{position:"relative",width,overflow:"hidden"}}>
            <motion.div
                variants={{
                    hidden:{opacity:0,y:75},
                    visible:{opacity:1,y:0},
                }}
                initial="hidden"
                animate={mainControls}
                transition={{delay:0.25,duration:0.5}}
            >
                {children}
            </motion.div>

            <motion.div
                variants={{
                    hidden:{left:0},
                    visible:{left:"100%"},
                }}
                initial="hidden"
                animate={slideControls}
                transition={{duration:0.5,ease:"easeIn"}}
                style={{position:"absolute",top:4,left:0,right:0,bottom:4,zIndex:200,background:isDarkMode ? "#1976c9" : "var(--color-blue-1)"}}
            >
            </motion.div>
        </div>
    );
}