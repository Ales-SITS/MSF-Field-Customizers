import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  BaseFieldCustomizer,
  IFieldCustomizerCellEventParameters
} from '@microsoft/sp-listview-extensibility';
import  { sp }  from '@pnp/sp/presets/all'
import GuidMsf, { IGuidMsfProps } from './components/GuidMsf';


export interface IGuidMsfFieldCustomizerProperties {

}


export default class GuidMsfFieldCustomizer
  extends BaseFieldCustomizer<IGuidMsfFieldCustomizerProperties> {

  public async onInit(): Promise<void> {
    
    const guid: string = `${this.context._pageContext._list.id._guid}`
    const listTitle: string =  `${this.context._pageContext._list.title}`
    const items: any[] = await sp.web.lists.getByTitle(listTitle).items();
    const list = sp.web.lists.getByTitle(listTitle)
    
    const updateItems = async function () {
      try { await items.forEach((item)=> { 
        list.items.getById(item.ID).update({
        SPFxGUID: `${guid}`
    
      })
    
      })} catch (err) {
        console.log(err)
      }
    }

    updateItems()

    return Promise.resolve();
  }


  public onRenderCell(event: IFieldCustomizerCellEventParameters): void {
 
    const guid: string = `${this.context._pageContext._list.id._guid}`
    const guidMsf: React.ReactElement<{}> =
      React.createElement(GuidMsf, { guid } as IGuidMsfProps);

    ReactDOM.render(guidMsf, event.domElement);
  }


  public onDisposeCell(event: IFieldCustomizerCellEventParameters): void {
    ReactDOM.unmountComponentAtNode(event.domElement);
    super.onDisposeCell(event);
  }
}
