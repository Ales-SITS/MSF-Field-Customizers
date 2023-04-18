import * as React from 'react';
import {useState} from 'react';
import styles from './ArrowstepsMsf.module.scss';
import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/fields";
import "@pnp/sp/items";

export interface IArrowstepsMsfProps {
  choices: any[];
  cxt: any;
  val: any;
  choicesOptions: any;
  opt:string
}

interface GreyedProps extends React.CSSProperties {
  filter: string;
}

const ArrowstepsMsf = (props:IArrowstepsMsfProps) => {
 
    const jsonString = props.choicesOptions.CustomFormatter 
 

    const jsonObject = JSON.parse(jsonString).children[0].attributes.class;
    let jsonObject2, jsonObject3, jsonObject4, jsonObject5, jsonObject6, jsonObject7, jsonObject8, jsonObject9, jsonObject10

    jsonObject2 = jsonObject.hasOwnProperty("operands") ? jsonObject.operands[2] : ""
    jsonObject3 = jsonObject2.hasOwnProperty("operands") ? jsonObject2.operands[2] : ""
    jsonObject4 = jsonObject3.hasOwnProperty("operands") ? jsonObject3.operands[2] : ""
    jsonObject5 = jsonObject4.hasOwnProperty("operands") ? jsonObject4.operands[2] : ""
    jsonObject6 = jsonObject5.hasOwnProperty("operands") ? jsonObject5.operands[2] : ""
    jsonObject7 = jsonObject6.hasOwnProperty("operands") ? jsonObject6.operands[2] : ""
    jsonObject8 = jsonObject7.hasOwnProperty("operands") ? jsonObject7.operands[2] : ""
    jsonObject9 = jsonObject8.hasOwnProperty("operands") ? jsonObject8.operands[2] : ""
    jsonObject10 = jsonObject9.hasOwnProperty("operands") ? jsonObject9.operands[2] : ""


    let classobj:any = {}
  
    classobj[jsonObject.operands[0].operands[1]] = jsonObject.operands[1]
    jsonObject2.hasOwnProperty("operands") ? classobj[jsonObject2.operands[0].operands[1]] = jsonObject2.operands[1] : ""
    jsonObject3.hasOwnProperty("operands") ? classobj[jsonObject3.operands[0].operands[1]] = jsonObject3.operands[1] : ""
    jsonObject4.hasOwnProperty("operands") ? classobj[jsonObject4.operands[0].operands[1]] = jsonObject4.operands[1] : ""
    jsonObject5.hasOwnProperty("operands") ? classobj[jsonObject5.operands[0].operands[1]] = jsonObject5.operands[1] : ""
    jsonObject6.hasOwnProperty("operands") ? classobj[jsonObject6.operands[0].operands[1]] = jsonObject6.operands[1] : ""
    jsonObject7.hasOwnProperty("operands") ? classobj[jsonObject7.operands[0].operands[1]] = jsonObject7.operands[1] : ""
    jsonObject8.hasOwnProperty("operands") ? classobj[jsonObject8.operands[0].operands[1]] = jsonObject8.operands[1] : ""
    jsonObject9.hasOwnProperty("operands") ? classobj[jsonObject9.operands[0].operands[1]] = jsonObject9.operands[1] : ""
    jsonObject10.hasOwnProperty("operands") ? classobj[jsonObject10.operands[0].operands[1]] = jsonObject10.operands[1] : ""


    const itemID:number = props.val._values.get("ID")
    const sp = spfi().using(SPFx(props.cxt));
    const listTitle: string =  `${props.cxt._pageContext._list.title}`
    
    const updateItem = async (update:string) => {
      try { 
        await sp.web.lists.getByTitle(listTitle).items.getById(itemID).update({SPFx_Status_Arrows: update})
        await sp.web.lists.getByTitle(listTitle).items.getById(itemID).update({Status: update})
        location.reload()
      }
      catch (err) {
        //console.log(err)
      }
    }
    
  
    const options = props.choices

    const [selection,setSelection] = useState (props.opt)
    
    const selectionHandler = (option:any) => {
        setSelection(option) 
        updateItem(option)
       }

    return (
      <div className={styles.stepsMsf}>
      {options.map((option:string, i:number, arr:string[]) => 
      <>
        {option==="Approved" && props.opt==="Rejected"? "" :
         option==="Rejected" && props.opt==="Approved"? "" :
        <div className={styles.step_box} onClick={()=>selectionHandler(option)}>
          <div 
          className={`${options.indexOf(option) > options.indexOf(props.opt) ? styles.greyed : styles.saturated} ${classobj[option]} ${styles.step_arrow}`}/>
          <div className={`${options.indexOf(option) > options.indexOf(props.opt) ? styles.greyed : styles.saturated} ${classobj[option]} ${styles.arrow_text}`}
           ><p className={styles.text}>{option}</p></div>      
          <div className={`${options.indexOf(option) > options.indexOf(props.opt) ? styles.greyed : styles.saturated} ${classobj[option]} ${styles.arrow_tip}`}/>
        </div>}
      </>
      )}
     </div>
    );
  
}

export default ArrowstepsMsf

//<div className={styles.arrow_tip_below}/>