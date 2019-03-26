import {UnaryOperator} from './UnaryOperator';
import {Platform} from '../Platform';
import {Conexion} from '../Conexion';
import {Parameter} from '../Parameter';

export class ZipWithIdOperator extends UnaryOperator {
  constructor(
    name: string,
    inputClass?: string,
    outputClass?: string,
    udf?: string,
    platforms?: Platform[],
    connexions?: Conexion[],
    broadcasts?: Conexion[]
  ) {
    super(
      'org.qcri.rheem.basic.operators.ZipWithIdOperator',
      [
        new Parameter('java.lang.Class', inputClass)
      ],
      name,
      inputClass,
      outputClass,
      platforms,
      connexions,
      broadcasts,
      []
    );
  }

  addValueConfParameters(values: any): void {
    super.addValueConfParameters(values);
  }

  getConfParameters(): any {
    const opt: any = super.getConfParameters();
    opt.function1 = false;
    return opt;
  }

  setClassOutput(output: string): void {
    super.setClassOutput('org.qcri.rheem.basic.data.Tuple2');
  }

  getClassOutput(): string {
    return 'org.qcri.rheem.basic.data.Tuple2';
  }

  setClassInput(input: string): void {
    super.setClassInput(input);
    this.parameters[0].setValue(input);
  }
}
