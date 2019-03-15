export class Parameter {
  private classType: string;
  private value: string;
  private isUDF: boolean;

  constructor(classType: string, value?: string, isUDF?: boolean) {
    this.classType = classType;
    this.value = value;
    this.isUDF = (isUDF === undefined ? false : isUDF);
  }

  getClassType(): string {
    return this.classType;
  }

  getValue(): string {
    return this.value;
  }

  setValue(value: string) {
    this.value = value;
  }

  public toString(): string {
    /*return `{
        "name" :"param",
        "inputType": "${ (this.isUDF ? 'UDF' : 'string') }",
        "type" : "${this.classType}",
        "value" : "${this.value}" }`;*/
    return `"${ (this.classType) }" :"${this.value}"`;

  }
}
