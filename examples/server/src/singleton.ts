const instances: any = {};

export namespace Singleton {

  export const getInstance = (Class: any): any => {
    if (instances.hasOwnProperty(Class)) {
      return instances[Class];
    }

    instances[Class] = new Class();

    return instances[Class];
  };
}
