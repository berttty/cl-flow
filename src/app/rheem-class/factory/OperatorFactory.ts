import {Operator} from '../Operator';
import {AIOperator} from '../special-operator/AIOperator';
import {EmptyOperator} from '../special-operator/EmptyOperator';
import {PreparationOperator} from '../special-operator/PreparationOperator';
import {BinaryOperator} from '../binary-operator/BinaryOperator';
import {LoopOperator} from '../loop-operator/LoopOperator';
import {SinkOperator} from '../sink-operator/SinkOperator';
import {TextFileSink} from '../sink-operator/TextFileSink';
import {SourceOperator} from '../source-operator/SourceOperator';
import {TextFileSource} from '../source-operator/TextFileSource';
import {FilterOperator} from '../unary-operator/FilterOperator';
import {UnaryOperator} from '../unary-operator/UnaryOperator';
import {TableSource} from '../source-operator/TableSource';

export const Operators: any = {
  AIOperator,
  EmptyOperator,
  PreparationOperator,
  BinaryOperator,
  LoopOperator,
  SinkOperator,
  TextFileSink,
  SourceOperator,
  TextFileSource,
  FilterOperator,
  UnaryOperator,
  TableSource
};
export class OperatorFactory {
  static buildOperator(params: any): Operator {
    const className: string = params.MetaOperator;
    return new Operators[className]();
  }

  static getConfigurationSource(nameSource: string) {
    console.log(nameSource.toLowerCase());
    switch (nameSource.toLowerCase()) {
      case 'hdfs':
      case 'lfs':
        return {
          icon: 'coins',
          MetaOperator: 'TextFileSource',
          TypeOperator: 'TextFileSource'
        };
      case 'postgresql':
        return {
          icon: 'coins',
          MetaOperator: 'TableSource',
          TypeOperator: 'TableSource'
        };
        break;
      default:
        console.log('error the name ' + nameSource + ' not have any mapping');
        break;
    }
  }

}
