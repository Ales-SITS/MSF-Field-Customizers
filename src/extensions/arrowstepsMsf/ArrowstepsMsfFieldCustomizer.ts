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

import ArrowstepsMsf, { IArrowstepsMsfProps } from './components/ArrowstepsMsf';


export interface IArrowstepsMsfFieldCustomizerProperties {
  listTitle: string;
  columnName: string;
}

let choices:string[] = []
let cxt : any
let choicesOptions: any

export default class ArrowstepsMsfFieldCustomizer
  extends BaseFieldCustomizer<IArrowstepsMsfFieldCustomizerProperties> {

  public async onInit(): Promise<void> {
    const sp = spfi().using(SPFx(this.context));
      const listTitle: string =  `${this.context.pageContext.list.title}`
      const optionsfield: IFieldInfo = await sp.web.lists.getByTitle(listTitle).fields.getByTitle("Status")();
      
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
    console.log(event)
    const arrowstepsMsf: React.ReactElement<{}> =
      React.createElement(ArrowstepsMsf, { choices, cxt, val,  choicesOptions, opt } as IArrowstepsMsfProps);

    ReactDOM.render(arrowstepsMsf, event.domElement);
  }

  public onDisposeCell(event: IFieldCustomizerCellEventParameters): void {
  
    ReactDOM.unmountComponentAtNode(event.domElement);
    super.onDisposeCell(event);
  }
}
