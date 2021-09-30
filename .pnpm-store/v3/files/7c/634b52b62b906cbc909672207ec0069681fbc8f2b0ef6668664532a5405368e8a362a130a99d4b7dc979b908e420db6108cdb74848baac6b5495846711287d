declare namespace FastCopy {
  // @ts-ignore
  export type Realm = Window | Global;

  export interface Cache {
    _values?: any[];
    add: (value: any) => void;
    has: (value: any) => boolean;
  }

  export type Copier = (object: any, cache: Cache) => any;

  export type ObjectCloner = (object: any, realm: Realm, handleCopy: Copier, cache: Cache) => any;

  export type Options = {
    isStrict?: boolean;
    realm?: Realm;
  };
}

declare function copy<ObjectType extends any = any>(
  object: ObjectType,
  options?: FastCopy.Options,
): ObjectType;

declare namespace copy {
  function strictCopy<ObjectType extends any = any>(
    object: ObjectType,
    options?: FastCopy.Options,
  ): ObjectType;
}

export default copy;
