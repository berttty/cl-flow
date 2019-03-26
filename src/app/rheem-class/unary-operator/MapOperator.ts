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
          MapOperator.generateUDF(null, udf, inputClass, outputClass),
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

  static generateUDF(alias: string, funCode: string, inputClass: string, outputClass: string) {
    if ( funCode !== undefined && funCode.startsWith('#') ) {
      return MapOperator.generateUDFSpecial(alias, funCode.slice(1), inputClass, outputClass);
    }
    return `package org.qcri.rheem.rest;
            import ${inputClass};
            import ${outputClass};
            import java.util.*;
            import java.util.stream.*;
            import org.qcri.rheem.core.function.FunctionDescriptor;
            public class ${alias}_UdfFactory {
              public static FunctionDescriptor.SerializableFunction create() {
                  return new FunctionDescriptor.SerializableFunction<${inputClass}, ${outputClass}>() {
                      @Override
                      public ${outputClass} apply(${inputClass} input) {
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

  static generateUDFSpecial(alias: string, funCode: string, inputClass: string, outputClass: string) {
    return `package org.qcri.rheem.rest;
            import ${inputClass};
            import ${outputClass};
            import java.util.*;
            import java.util.stream.*;
            import org.qcri.rheem.apps.simwords.*;
            import org.qcri.rheem.core.function.FunctionDescriptor;
            public class ${alias}_UdfFactory {
              public static FunctionDescriptor.SerializableFunction create() {
                  return ${funCode};
              }
            }`;
  }

  addValueConfParameters(values: any): void {
    super.addValueConfParameters(values);
    this.setUDF( values.function1 );
    this.udfTexts[0] = values.function1;
  }

  getConfParameters(): any {
    const opt: any = super.getConfParameters();
    opt.outputClass = true;
    return opt;
  }

  protected setUDF(udfText: string) {
    this.parameters[0].setValue(MapOperator.generateUDF(this.parameters[0].getAlias(), udfText, this.classInput, this.getClassOutput()));
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

  validateConfiguration() {
    super.validateConfiguration();
    this.setUDF(this.udfTexts[0]);
  }
}
