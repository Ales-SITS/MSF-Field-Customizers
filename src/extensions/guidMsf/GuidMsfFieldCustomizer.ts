import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  BaseFieldCustomizer,
  IFieldCustomizerCellEventParameters
} from '@microsoft/sp-listview-extensibility';
import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/fields";
import "@pnp/sp/items";

import GuidMsf, { IGuidMsfProps } from './components/GuidMsf';



export interface IGuidMsfFieldCustomizerProperties {

}


export default class GuidMsfFieldCustomizer
  extends BaseFieldCustomizer<IGuidMsfFieldCustomizerProperties> {

  public async onInit(): Promise<void> {
    

    const sp = spfi().using(SPFx(this.context));
    const guid: string = `${this.context.pageContext.list.id}`
    const listTitle: string =  `${this.context.pageContext.list.title}`
    const items = await sp.web.lists.getByTitle(listTitle).items();
    const list = sp.web.lists.getByTitle(listTitle)
    

    const updateItems = async function () {
      try { await items.forEach((item)=> { 
        list.items.getById(item.ID).update({
        SPFxGUID: `${guid}`
      })
    
      })} catch (err) {
        console.log(list.items)
        console.log(err)
      }
    }

    updateItems()

    return Promise.resolve();
  }


  public onRenderCell(event: IFieldCustomizerCellEventParameters): void {
 
    const guid: string = `${this.context.pageContext.list.id}`
    const guidMsf: React.ReactElement<{}> =
      React.createElement(GuidMsf, { guid } as IGuidMsfProps);

    ReactDOM.render(guidMsf, event.domElement);
  }


  public onDisposeCell(event: IFieldCustomizerCellEventParameters): void {
    ReactDOM.unmountComponentAtNode(event.domElement);
    super.onDisposeCell(event);
  }
}
