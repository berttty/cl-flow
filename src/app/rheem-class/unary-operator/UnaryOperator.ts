import {Operator} from '../Operator';
import {Parameter} from '../Parameter';
import {Platform} from '../Platform';
import {Conexion} from '../Conexion';
import {OperatorType} from '../OperatorType';
import {OperatorFactory} from '../factory/OperatorFactory';

export class UnaryOperator extends Operator {
  constructor(
    className: string,
    parameters: Parameter[],
    name: string,
    inputClass?: string,
    outputClass?: string,
    platforms?: Platform[],
    connexions?: Conexion[],
    broadcasts?: Conexion[],
    udfTexts?: string[]
  ) {
    super(
      className,
      parameters,
      OperatorType.Unary,
      name,
      inputClass,
      outputClass,
      platforms,
      connexions,
      broadcasts,
      udfTexts
    );
  }

  getConfParameters(): any {
    const opt: any = super.getConfParameters();
    opt.function1 = true;
    opt.typeOperator = ['Filter Operator', 'Map Operator'];
    return opt;
  }

  addValueConfParameters(values: any): void {
    super.addValueConfParameters(values);
    this.setUDF( values.textInput );
  }

  protected setUDF(udfText: string) {}

  setTypeOperator(typeOperator: string): Operator {
    const name: string = typeOperator.replace(' ', '');
    return OperatorFactory.buildOperator(name);
  }

}
