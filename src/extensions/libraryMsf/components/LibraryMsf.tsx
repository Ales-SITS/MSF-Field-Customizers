import { Log } from '@microsoft/sp-core-library';
import * as React from 'react';

import styles from './LibraryMsf.module.scss';

export interface ILibraryMsfProps {
  text: string;
}

const LOG_SOURCE: string = 'LibraryMsf';

export default class LibraryMsf extends React.Component<ILibraryMsfProps, {}> {
  public componentDidMount(): void {
  
  }

  public componentWillUnmount(): void {
   
  }

  public render(): React.ReactElement<{}> {
    return (
      <div className={styles.libraryMsf} onClick={()=>{navigator.clipboard.writeText(`${this.props.text}`)}}>
        { this.props.text }
      </div>
    );
  }
}
