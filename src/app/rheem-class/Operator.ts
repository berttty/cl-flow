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
  protected udfTexts: string[];
  protected parameters: Parameter[];
  protected connexions: Conexion[] | any[];
  protected broadcasts: Conexion[];
  protected type: OperatorType;
  protected platforms: Platform[];
  protected origin: Operator;
  protected metaInformation: any;

  constructor(
      className: string,
      parameters: Parameter[],
      type: OperatorType,
      name: string,
      classInput?: string,
      classOutput?: string,
      platforms?: Platform[],
      connexions?: Conexion[],
      broadcasts?: Conexion[],
      udfTexts?: string[]
  ) {
    this.name = name;
    this.className = className;
    this.parameters = (parameters === undefined ? [] : parameters);
    this.classInput = classInput;
    this.classOutput = classOutput;
    this.connexions = (connexions === undefined ? [] : connexions);
    this.platforms = (platforms === undefined ? [] : platforms);
    this.broadcasts = (broadcasts === undefined ? [] : broadcasts);
    this.udfTexts = (udfTexts === undefined ? [] : udfTexts);
  }

  getName() {
    return this.name;
  }

  setName(name: string): Operator {
    this.name = name;
    return this;
  }

  getClassName(): string {
    return this.className;
  }

  setClassName(clName: string): void {
    this.className = clName;
  }

  setClassOutput(output: string): void {
    this.classOutput = output;
  }

  setClassInput(input: string): void {
    this.classInput = input;
  }
  getClassOutput() {
    return this.classOutput;
  }

  createConnexion(indexSocket: number, nextOperator: Operator, nextSocket: number) {
    nextOperator.setClassInput(this.getClassOutput());
    this.addConnexion(new Conexion(this, indexSocket, nextOperator, nextSocket));
  }

  addConnexion(connexion: Conexion) {
    this.connexions.push(connexion);
  }

  public toString(): string {
    this.validateConfiguration();
    return `{
              "name" : "${this.name}",
              "java_class" : "${this.className}",
              "parameters" : {  ${this.parameters.join(' , ')} },
              "connects_to" : { ${this.connexions.join(' , ')} }
            }
            `;
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

  getConfParameters(): any {
    return {
      typeOperator: [],
      function1: false,
      function2: false,
      KeyFun: false,
      outputClass: false,
      textInput: false
    };
  }

  addValueConfParameters(values: any): void {
    this.name = values.name;
    return;
  }

  setTypeOperator(typeOperator: string): Operator {return this;}

  getOrigin(): Operator {
    return this.origin;
  }

  setOrigin(ope: Operator): Operator {
    this.origin = ope;
    return this;
  }

  protected validateConfiguration() {
    return;
  }

  setMetaInformation( metainfo: any ): void {
    this.metaInformation = metainfo;
  }

  getMetaInformation( ): any {
    return this.metaInformation;
  }
  getConexions(): Conexion[] {
    return this.connexions;
  }

  setConexiones(tmp: any[]): void {
    this.connexions = tmp;
  }

  cleanParameters(): void {
    this.parameters = [];
  }

  addParameters(param: Parameter): void {
    this.parameters.push(param);
  }

  getTypeOperator(): string {
    return this.constructor.name;
  }
}

