import {Parameter} from '../Parameter';
import {Conexion} from '../Conexion';
import {SinkOperator} from './SinkOperator';
import {Platform} from '../Platform';

export class TextFileSink extends SinkOperator {

  constructor(
    name: string,
    path?: string,
    inputClass?: string,
    platforms?: Platform[],
    connexions?: Conexion[],
    broadcasts?: Conexion[]
  ) {
    super(
      'org.qcri.rheem.basic.operators.TextFileSink',
      [
        new Parameter( 'java.lang.String', path),
        new Parameter( 'java.lang.Class', inputClass),
      ],
      name,
      inputClass,
      undefined,
      platforms,
      connexions,
      broadcasts
    );
  }


  setClassInput(input: string): void {
    super.setClassInput(input);
    this.parameters[1].setValue(input);
    this.setClassOutput(input);
  }

  protected validateConfiguration() {
    super.validateConfiguration();
    this.setClassInput(this.getClassInput());
  }
}
