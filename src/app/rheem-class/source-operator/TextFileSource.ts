import {SourceOperator} from './SourceOperator';
import {Parameter} from '../Parameter';
import {Platform} from '../Platform';
import {Conexion} from '../Conexion';

export class TextFileSource extends SourceOperator {
  constructor(
    name: string,
    path?: string,
    platforms?: Platform[],
    connexions?: Conexion[],
    broadcasts?: Conexion[]
  ) {
    super(
      'org.qcri.rheem.basic.operators.TextFileSource',
      [ new Parameter( 'java.lang.String', path) ],
      name,
      undefined,
      'java.lang.String',
      platforms,
      connexions,
      broadcasts
    );
  }


  getConfParameters(): any {
    const opt: any = super.getConfParameters();
    opt.textInput = true;
    return opt;
  }
}
