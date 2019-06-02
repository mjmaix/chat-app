interface Ext {
  ext: string;
  mime: string;
}
export = index;
declare function index(str: any): Ext[];
declare namespace index {
  function mime(str: any): Ext[];
}
