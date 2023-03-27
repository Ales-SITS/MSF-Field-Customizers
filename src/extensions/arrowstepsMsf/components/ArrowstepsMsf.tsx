import * as React from 'react';
import {useState} from 'react';
import styles from './ArrowstepsMsf.module.scss';
import ArrowComponent from './ArrowComponent';
import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/fields";
import "@pnp/sp/items";
import { IField, IFieldInfo } from "@pnp/sp/fields/types";



export interface IArrowstepsMsfProps {
  choices: any[];
  cxt: any;
  val: any;
  choicesOptions: any
}

const ArrowstepsMsf = (props:IArrowstepsMsfProps) => {
 
    const jsonString = props.choicesOptions.CustomFormatter

    const jsonObject = JSON.parse(jsonString).children[0].attributes.class;
    const jsonObject2 = jsonObject.operands[2]
    const jsonObject3 = jsonObject2.operands[2]
    const jsonObject4 = jsonObject3.operands[2]
    const jsonObject5 = jsonObject4.operands[2]
    console.log(jsonObject)
  
    let classobj:any = {}
  
    classobj[jsonObject.operands[0].operands[1]] = jsonObject.operands[1]
    classobj[jsonObject2.operands[0].operands[1]] = jsonObject2.operands[1]
    classobj[jsonObject3.operands[0].operands[1]] = jsonObject3.operands[1]
    classobj[jsonObject4.operands[0].operands[1]] = jsonObject4.operands[1]
    classobj[jsonObject5.operands[0].operands[1]] = jsonObject5.operands[1]
    console.log(classobj)
  
    const itemID:number = props.val._values.get("ID")
    const sp = spfi().using(SPFx(props.cxt));
    const listTitle: string =  `${props.cxt._pageContext._list.title}`
    
    const updateItem = async (update:string) => {
      try { 
        await sp.web.lists.getByTitle(listTitle).items.getById(itemID).update({Steps: update})
        await sp.web.lists.getByTitle(listTitle).items.getById(itemID).update({Steps0: update})
        //location.reload()
      }
      catch (err) {
        console.log(err)
      }
    }
  
  
  
    const options = props.choices
  
    const [selection,setSelection] = useState (props.val._values.get("Steps"))
    
    const selectionHandler = (e:any) => {
        setSelection(e.target.value) 
        updateItem(e.target.value)
      }
  


    return (
      <div className={styles.stepsMsf}>
      {options.map((option:string, i:number, arr:string[]) => 
        <div className={`${classobj[option]} ${styles.step_arrow}`} onClick={selectionHandler}>
          <div className={styles.arrow_text}>
            <span>{option}</span>
          </div>
          <div className={`${classobj[option]} ${styles.arrow_tip}`}/>
        </div>
      )}

    </div>
    );
  
}

export default ArrowstepsMsf

//<div className={styles.arrow_tip_below}/>