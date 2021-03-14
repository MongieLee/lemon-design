function classes(...names: any[]): string {
  let classNames = new Array<string>();
  names.forEach((arg: any) => {
    if (typeof arg === 'string') {
      classNames.push(arg);
    } else if (arg instanceof Array) {
      arg.forEach((className: string) => {
        classNames.push(className);
      });
    } else if (typeof arg === 'object' && !(arg instanceof Array)) {
      console.log(arg)
      for (const key in arg) {
        if (arg.hasOwnProperty(key) && arg[key]) {
          console.log('???')
          classNames.push(key);
        }
      }
    }
  });
  return classNames.join(' ');
}

export default classes;
