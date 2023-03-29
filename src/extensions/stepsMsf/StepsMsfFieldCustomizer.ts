import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  BaseFieldCustomizer,
  IFieldCustomizerCellEventParameters,
} from '@microsoft/sp-listview-extensibility';
import { spfi, SPFx } from "@pnp/sp";
import { IField, IFieldInfo } from "@pnp/sp/fields/types";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/fields";
import "@pnp/sp/items";

import StepsMsf, { IStepsMsfProps } from './components/StepsMsf';

export interface IStepsMsfFieldCustomizerProperties {
  listTitle: string;
  columnName: string;
}


let choices:string[] = []
let cxt : any
let choicesOptions: any
export default class StepsMsfFieldCustomizer
  extends BaseFieldCustomizer<IStepsMsfFieldCustomizerProperties> {
    private options: string[];

    public async onInit(): Promise<void> {

      const sp = spfi().using(SPFx(this.context));
      const listTitle: string =  `${this.context._pageContext._list.title}`
      const optionsfield: IFieldInfo = await sp.web.lists.getByTitle(listTitle).fields.getByTitle("StepsOptions")();
      
      const readChoices = function () {
  
      }
  
      readChoices()

      choices = optionsfield.Choices
      choicesOptions = optionsfield
      cxt = this.context
    return Promise.resolve();
  }
 


  public onRenderCell(event: IFieldCustomizerCellEventParameters): void {
    
    const val: any = event.listItem;
    const opt: string = event.fieldValue;

    const stepsMsf: React.ReactElement<{}> =
      React.createElement(StepsMsf, { choices, cxt, val,  choicesOptions, opt } as IStepsMsfProps);

    ReactDOM.render(stepsMsf, event.domElement);
  }


  public onDisposeCell(event: IFieldCustomizerCellEventParameters): void {
    ReactDOM.unmountComponentAtNode(event.domElement);
    super.onDisposeCell(event);
  }


}



//Set-PnPField -Identity 'Procedure' -List 'Repository' -Values @{ClientSideComponentId=[GUID]"cfcf9dab-8fa8-45af-a591-3b1150ef6fc9"}