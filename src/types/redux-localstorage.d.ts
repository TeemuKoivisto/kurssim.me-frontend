// Type definitions for react-side-effect v1.0.2
// Project: https://github.com/gaearon/react-side-effect
// Definitions by: Remo H. Jansen <https://github.com/remojansen/>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "redux-localstorage" {
  
  import * as Redux from "redux";
  
  export interface ActionTypes {
      INIT: string;
  }
  
  export type AdapterCallback = <A>(err?: any, result?: A) => void;
  
  export interface StorageAdapter<A> {
      0: A;
      put(key: string, value: any, callback: AdapterCallback): void;
      get(key: string, callback: AdapterCallback): void;
      del(key: string, callback: AdapterCallback): void;
  }
  
  export type StorageAdapterCreator<A> = (storage: A) => StorageAdapter<A>;
  
  export interface StorageAdapterEnhancer {}
  
  export function mergePersistedState(merge?: <A1, A2>(initialState: A1, persistentState: A2) => A1 & A2): <A>(next: Redux.Reducer<A>) => Redux.Reducer<A>;
  
  export interface ConfigRS {
    key: string;
    merge?: any;
    slicer?: any;
    serialize: (value: any, replacer?: (key: string, value: any) => any, space?: string | number) => string,
    deserialize: (text: string, reviver?: (key: any, value: any) => any) => any
  }

  export default function persistState(paths: string | string[], config?: ConfigRS): Redux.GenericStoreEnhancer;
}
