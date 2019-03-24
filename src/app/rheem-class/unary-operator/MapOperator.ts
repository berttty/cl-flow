import {UnaryOperator} from './UnaryOperator';
import {Platform} from '../Platform';
import {Conexion} from '../Conexion';
import {Parameter} from '../Parameter';

export class MapOperator extends UnaryOperator {
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
      'org.qcri.rheem.basic.operators.MapOperator',
      [
        new Parameter(
          'FunctionDescriptor.SerializableFunction',
          MapOperator.generateUDF(udf, inputClass),
          true
        ),
        new Parameter('java.lang.Class', inputClass),
        new Parameter('java.lang.Class', outputClass)
      ],
      name,
      inputClass,
      outputClass,
      platforms,
      connexions,
      broadcasts,
      [udf]
    );
  }

  static generateUDF(funCode: string, inputClass: string, outputClass: string) {
    return `package org.qcri.rheem.rest.PredicateDescriptor;
            import ${inputClass}
            import ${outputClass}
            import org.qcri.rheem.core.function.FunctionDescriptor;
            public class OPNAME_PARAMNAME_UdfFactory {
              public static FunctionDescriptor.SerializableFunction create() {
                  return new FunctionDescriptor.SerializableFunction<${inputClass}, ${outputClass}>() {
                      @Override
                      public ${outputClass} apply(${inputClass} dataPoint) {
                          /*
                          * TODO: - Implement your Map udf here !
                          *       - Replace INPUT and OUTPUT with good types!
                          *       - Don't forget the imports !
                          * */
                          return ${funCode};
                      }
                  };
              }
            }`;
  }


  getConfParameters(): any {
    const opt: any = super.getConfParameters();
    opt.outputClass = true;
    return opt;
  }

  protected setUDF(udfText: string) {
    this.parameters[0].setValue(MapOperator.generateUDF(udfText, this.classInput));
  }


  setClassOutput(output: string): void {
    super.setClassOutput(output);
    this.parameters[2].setValue(output);
  }

  setClassInput(input: string): void {
    super.setClassInput(input);
    this.parameters[1].setValue(input);
    this.setUDF(this.udfTexts[0]);
  }
}
