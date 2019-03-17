import {Operator} from '../Operator';
import {Parameter} from '../Parameter';
import {Platform} from '../Platform';
import {Conexion} from '../Conexion';
import {OperatorType} from '../OperatorType';
import {OptionNext} from '../OptionNext';

export class SinkOperator extends Operator {
  constructor(
    className: string,
    parameters: Parameter[],
    name: string,
    inputClass?: string,
    outputClass?: string,
    platforms?: Platform[],
    connexions?: Conexion[],
    broadcasts?: Conexion[]
  ) {
    super(
      className,
      parameters,
      OperatorType.Sink,
      name,
      inputClass,
      outputClass,
      platforms,
      connexions,
      broadcasts
    );
  }

  isSink(): boolean {
    return true;
  }

  nextOption(): OptionNext {
    return new OptionNext(true);
  }
}
