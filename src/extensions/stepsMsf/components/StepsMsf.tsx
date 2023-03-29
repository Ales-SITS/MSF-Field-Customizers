import * as React from 'react';
import {useState} from 'react';
import styles from './StepsMsf.module.scss';
import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/fields";
import "@pnp/sp/items";
import { IField, IFieldInfo } from "@pnp/sp/fields/types";
//import "../../../node_modules/@microsoft/sp-office-ui-fabric-core/dist/sass/SPFabricCore.scss";


export interface IStepsMsfProps {
  choices: any[];
  cxt: any;
  val: any;
  choicesOptions: any;
  opt: string
}


const StepsMsf = (props:IStepsMsfProps) => {

  const jsonString = props.choicesOptions.CustomFormatter

  const jsonObject = JSON.parse(jsonString).children[0].attributes.class;
  const jsonObject2 = jsonObject.operands[2]
  const jsonObject3 = jsonObject2.operands[2]
  const jsonObject4 = jsonObject3.operands[2]
  const jsonObject5 = jsonObject4.operands[2]
  //console.log(jsonObject)

  let classobj:any = {}

  classobj[jsonObject.operands[0].operands[1]] = jsonObject.operands[1]
  classobj[jsonObject2.operands[0].operands[1]] = jsonObject2.operands[1]
  classobj[jsonObject3.operands[0].operands[1]] = jsonObject3.operands[1]
  classobj[jsonObject4.operands[0].operands[1]] = jsonObject4.operands[1]
  classobj[jsonObject5.operands[0].operands[1]] = jsonObject5.operands[1]
  //console.log(classobj)

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

    const [selection,setSelection] = useState (props.opt)
    
    const selectionHandler = (e:any) => {
      setSelection(e.target.value) 
      updateItem(e.target.value)
    }
    //console.log(props.opt)
    return (
      <div className={styles.stepsMsf}>
        <div className={styles.steps}>
        {options.map((option, i, arr) => 
          <label className={`${classobj[option]} ${styles.steps_wrapper}`}>
            <div className={styles.step_box}>
                <span className={styles.step_label}>{option}</span>
            </div>
            <form className={styles.step_box}>
              {i === 0 ? <div className={styles.step_connector_invisible}/> : <div className={styles.step_connector}/>}
              <input 
              type="radio" 
              name="selection" 
              value={option}
              id={option.toLowerCase()}
              onChange={selectionHandler}
              checked={selection === option}
              className={styles.step_radio}
              />
              {arr.length - 1 === i ? <div className={styles.step_connector_invisible}/> : <div className={styles.step_connector}/>}

            </form>
          </label>
        )}
        </div>
      </div>
    );
  
}

export default StepsMsf