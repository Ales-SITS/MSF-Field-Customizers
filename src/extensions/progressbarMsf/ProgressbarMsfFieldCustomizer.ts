import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {
  BaseFieldCustomizer,
  IFieldCustomizerCellEventParameters
} from '@microsoft/sp-listview-extensibility';


import ProgressbarMsf, { IProgressbarMsfProps } from './components/ProgressbarMsf';

export interface IProgressbarMsfFieldCustomizerProperties {
  sampleText?: string;
}

export default class ProgressbarMsfFieldCustomizer
  extends BaseFieldCustomizer<IProgressbarMsfFieldCustomizerProperties> {

  public onInit(): Promise<void> {

    return Promise.resolve();
  }

  
  public onRenderCell(event: IFieldCustomizerCellEventParameters): void {
   
    const num: number = event.fieldValue;

    const progressbarMsf: React.ReactElement<{}> =
      React.createElement(ProgressbarMsf, { num } as IProgressbarMsfProps);

    ReactDOM.render(progressbarMsf, event.domElement);
  }

  public onDisposeCell(event: IFieldCustomizerCellEventParameters): void {
    
    ReactDOM.unmountComponentAtNode(event.domElement);
    super.onDisposeCell(event);
  }
}
