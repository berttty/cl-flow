import { Parameter } from './Parameter';
import {Conexion} from './Conexion';
import {OperatorType} from './OperatorType';
import {Platform} from './Platform';
import {OptionNext} from './OptionNext';


export class Operator {
  protected name: string;
  protected className: string;
  protected classInput: string;
  protected classOutput: string;
  protected parameters: Parameter[];
  protected connexions: Conexion[];
  protected broadcasts: Conexion[];
  protected type: OperatorType;
  protected platforms: Platform[];

  constructor(
      className: string,
      parameters: Parameter[],
      type: OperatorType,
      name: string,
      classInput?: string,
      classOutput?: string,
      platforms?: Platform[],
      connexions?: Conexion[],
      broadcasts?: Conexion[]
  ) {
    this.name = name;
    this.className = className;
    this.parameters = parameters;
    this.classInput = classInput;
    this.classOutput = classOutput;
    this.connexions = (connexions === undefined ? [] : connexions);
    this.platforms = (platforms === undefined ? [] : platforms);
    this.broadcasts = (broadcasts === undefined ? [] : broadcasts);
  }

  getName() {
    return this.name;
  }

  getClassOutput() {
    return this.classOutput;
  }

  createConnexion(indexSocket: number, nextOperator: Operator, nextSocket: number) {
    this.addConnexion(new Conexion(this, indexSocket, nextOperator, nextSocket));
  }

  addConnexion(connexion: Conexion) {
    this.connexions.push(connexion);
  }

  public toString(): string {
    return `{
              "name" : "${this.name}",'
              "java_class" : "${this.className}",
              "connects_to" : { ${this.connexions.join(' , ')} }
            }
            `;
    //              "parameters" : { ${this.parameters.join(' , ')} },
  }

  isSink(): boolean {
    return false;
  }

  isSource(): boolean {
    return false;
  }

  nextOption(): OptionNext {
    return new OptionNext(false);
  }
}

