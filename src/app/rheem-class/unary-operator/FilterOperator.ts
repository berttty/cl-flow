import {UnaryOperator} from './UnaryOperator';
import {Platform} from '../Platform';
import {Conexion} from '../Conexion';
import {Parameter} from '../Parameter';

export class FilterOperator extends UnaryOperator {
  constructor(
    name: string,
    inputClass?: string,
    udf?: string,
    platforms?: Platform[],
    connexions?: Conexion[],
    broadcasts?: Conexion[]
  ) {
    super(
      'org.qcri.rheem.basic.operators.FilterOperator',
      [
        new Parameter(
          'PredicateDescriptor.SerializablePredicate',
          FilterOperator.generateUDF(null, udf, inputClass),
          true
        ),
        new Parameter('java.lang.Class', inputClass)
      ],
      name,
      inputClass,
      inputClass,
      platforms,
      connexions,
      broadcasts,
      [ udf ]
    );
  }

  static generateUDF(alias: string, funCode: string, inputClass: string) {
    return `package org.qcri.rheem.rest;
            import org.qcri.rheem.core.function.FunctionDescriptor;
            public class ${alias}_UdfFactory {
            public static FunctionDescriptor.SerializablePredicate create() {
              return new FunctionDescriptor.SerializablePredicate<${inputClass}>() {
              @Override
              public boolean test(${inputClass} input) {
                  return  ${funCode};
                }
              };
            }
          }`;
  }

  protected setUDF(udfText: string) {
    this.parameters[0].setValue(FilterOperator.generateUDF(this.parameters[0].getAlias(), udfText, this.classInput));
  }

  addValueConfParameters(values: any): void {
    super.addValueConfParameters(values);
    this.setUDF( values.function1 );
    this.udfTexts[0] = values.function1;
  }


  protected validateConfiguration() {
    super.validateConfiguration();
    this.setUDF(this.udfTexts[0]);
  }


  setClassInput(input: string): void {
    super.setClassInput(input);
    this.parameters[1].setValue(input);
    this.setClassOutput(input);
  }
}
