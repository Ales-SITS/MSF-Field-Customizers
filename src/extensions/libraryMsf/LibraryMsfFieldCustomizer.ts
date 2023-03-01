import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Log } from '@microsoft/sp-core-library';
import {
  BaseFieldCustomizer,
  IFieldCustomizerCellEventParameters
} from '@microsoft/sp-listview-extensibility';
import  { sp }  from '@pnp/sp/presets/all'
import * as strings from 'LibraryMsfFieldCustomizerStrings';
import LibraryMsf, { ILibraryMsfProps } from './components/LibraryMsf';


export interface ILibraryMsfFieldCustomizerProperties {

}


export default class LibraryMsfFieldCustomizer
  extends BaseFieldCustomizer<ILibraryMsfFieldCustomizerProperties> {

  public async onInit(): Promise<void> {
    
    console.log("***INITIALIZED***")
    const columnName:string = this.context._field.internalName;
    const guid: string = `${this.context._pageContext._list.id._guid}`
    const listTitle: string =  `${this.context._pageContext._list.title}`
    const items: any[] = await sp.web.lists.getByTitle(listTitle).items();
    const list = sp.web.lists.getByTitle(listTitle)
    
    const updateItems = async function () {
      try { await items.forEach((item)=> { 
        list.items.getById(item.ID).update({
          SPFxLibrary: `${listTitle}`
    
      })
        console.log(`ID: ${item.ID}***FINISHED***`)
      })} catch (err) {
        console.log(err)
      }
    }

    updateItems()


    return Promise.resolve();
  }

  public onRenderCell(event: IFieldCustomizerCellEventParameters): void {
  
    console.log('***RENDERING***')
    const text: string =  `${this.context._pageContext._list.title}` 

    const libraryMsf: React.ReactElement<{}> =
      React.createElement(LibraryMsf, { text } as ILibraryMsfProps);

    ReactDOM.render(libraryMsf, event.domElement);
  }

  public onDisposeCell(event: IFieldCustomizerCellEventParameters): void {
    
    ReactDOM.unmountComponentAtNode(event.domElement);
    super.onDisposeCell(event);
  }
}
