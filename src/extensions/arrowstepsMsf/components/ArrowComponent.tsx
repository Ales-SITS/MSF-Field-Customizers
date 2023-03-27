import * as React from 'react';
import {useState} from 'react';
import styles from './ArrowstepsMsf.module.scss';
  
function ArrowComponent (props:any)  {

      const [selected,setSelected] = useState(1)
      const selectedHandler = (i:number) => {
        setSelected(i)
        //console.log(selected)
      }
  
      const options = props.options

      //console.log(options)
      return (
          <div className={styles.stepsMsf}>
              <div  className={styles.arrow_tip_front}/>
              {options.map((option:string, i:number, arr:string[]) => 
                <div className={styles.step_arrow} onClick={()=>selectedHandler(i)}>
                  <div className={styles.arrow_text}>
                    <span>{option}</span>
                  </div>
                  <div className={styles.arrow_tip}/>
                  <div className={styles.arrow_tip_below}/>
                </div>
              )}
        
            </div>
      );
}
  
export default ArrowComponent