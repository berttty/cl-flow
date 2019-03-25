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
import {MapOperator} from '../unary-operator/MapOperator';
import {FlatMapOperator} from '../unary-operator/FlatMapOperator';
import {MapPartitionOperator} from '../unary-operator/MapPartitionOperator';
import {ReduceByOperator} from '../unary-operator/ReduceByOperator';
import {SampleOperator} from '../unary-operator/SampleOperator';
import {ZipWithIndexOperator} from '../unary-operator/ZipWithIndexOperator';

export const Operators: any = {
  EmptyOperator,
  AIOperator,
  PreparationOperator,
  BinaryOperator,
  LoopOperator,
  SinkOperator,
    TextFileSink,
  SourceOperator,
    TextFileSource,
    TableSource,
  UnaryOperator,
    FilterOperator,
    MapOperator,
    FlatMapOperator,
    MapPartitionOperator,
    ReduceByOperator,
    SampleOperator,
    ZipWithIndexOperator
};
export class OperatorFactory {
  static buildOperator(params: any | string): Operator {
    const className: string = (typeof params === 'string' ? params : params.MetaOperator);
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
