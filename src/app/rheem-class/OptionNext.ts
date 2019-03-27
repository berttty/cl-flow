export enum ActionEnum {
  SETTINGS = 'settings',
  DELETE = 'delete',
  CREATE_NEW = 'create_new',
  BROADCAST = 'broadcast'
}

export class OptionNext {
  private options: Option[];

  constructor(empty: boolean) {
    this.options = [];
    // TODO add all the icons in the component
    this.options.push(
      new Option( 1, 'Settings', 'cog')
        .addSubOption(
          new Option(
            1,
            'Settings',
            'cogs',
            ActionEnum.SETTINGS,
            {}
          )
        )
        .addSubOption(new Option( 2, 'Broadcast', 'broadcast-tower', ActionEnum.BROADCAST))
        .addSubOption(new Option( 3, 'Delete', 'trash-alt', ActionEnum.DELETE))
    );
    if (empty) {
      return;
    }

    this.options.push(
        new Option( 2, 'Preparation', 'hammer')
            .addSubOption(
              new Option(
                1,
                'Missing Values Imputation',
                 'syringe',
                      ActionEnum.CREATE_NEW,
                {
                  icon: 'syringe',
                  MetaOperator: 'PreparationOperator',
                  TypeOperator: 'MVICleaning',
                }
              )
            )
            .addSubOption(
              new Option(
                2,
                'Outliers Removal',
                'chart-line',
                ActionEnum.CREATE_NEW,
                {
                  icon: 'chart-line',
                  MetaOperator: 'PreparationOperator',
                  TypeOperator: 'ORCleaning'
                }
              )
            )
    );
    this.options.push(
        new Option(3, 'Artificial Intelligence', 'brain')
          .addSubOption(
            new Option(
              1,
              'Clustering',
              'object-group',
              ActionEnum.CREATE_NEW,
              {
                icon: 'object-group',
                MetaOperator: 'AIOperator',
                TypeOperator: 'Clustering'
              }
            )
          )
          .addSubOption(
            new Option(
              2,
              'Classification',
              'tags',
              ActionEnum.CREATE_NEW,
              {
                icon: 'tags',
                MetaOperator: 'ClassificationOperator',
                TypeOperator: 'ClassificationOperator'
              }
            )
          )
    );
    this.options.push(
        new Option( 4, 'Data Analytics', 'puzzle-piece')
            .addSubOption(
              new Option(
                1,
                'Binary Operator',
                'angle-double-right',
                ActionEnum.CREATE_NEW,
                {
                  icon: 'angle-double-right',
                  MetaOperator: 'BinaryOperator',
                  TypeOperator: 'BinaryOperator'
                }
              )
            )
            .addSubOption(
              new Option(
                2,
                'Unary Operator',
                'angle-right',
                ActionEnum.CREATE_NEW,
                {
                  icon: 'angle-right',
                  MetaOperator: 'UnaryOperator',
                  TypeOperator: 'UnaryOperator'
                }
              )
            )
            /*.addSubOption(
              new Option(
                3,
                'Loop Operator',
                'puzzle-piece',
                ActionEnum.CREATE_NEW,
                {
                  icon: 'puzzle-piece',
                  MetaOperator: 'LoopOperator',
                  TypeOperator: 'LoopOperator'
                }
              )
            )*/
    );
    this.options.push(
        new Option( 5, 'Data Storage', 'bullseye')
            .addSubOption(
              new Option(
                1,
                'Raw Data',
                'file-csv',
                ActionEnum.CREATE_NEW,
                {
                  icon: 'file-csv',
                  MetaOperator: 'TextFileSink',
                  TypeOperator: 'TextFileSink'
                }
              )
            )
            /*.addSubOption(
              new Option(
                2,
                'Relational',
                'table',
                ActionEnum.CREATE_NEW,
                {
                  icon: 'table',
                  MetaOperator: 'SinkOperator',
                  TypeOperator: 'SinkOperator'
                }
              )
            )*/
    );
  }

  public getOptions(): Option[] {
    return this.options;
  }
}

export class Option {
  private index: number;
  private name: string;
  private icon: string;
  private action: ActionEnum;
  private actionOption: any;
  private subOption: Option[];
  constructor(index: number, name: string, icon: string, action?: ActionEnum, actionObject?: any) {
    this.index = index;
    this.name = name;
    this.icon = icon;
    this.action = action;
    this.actionOption = actionObject;
    this.subOption = [];
  }

  public addSubOption(opt: Option): Option {
    this.subOption.push(opt);
    return this;
  }

  public getIndex(): number {
    return this.index;
  }

  public getName(): string {
    return this.name;
  }

  public getIcon(): string {
    return this.icon;
  }

  public getSubOptions(): Option[] {
    return this.subOption;
  }

  public getAction(): ActionEnum {
    return this.action;
  }

  public getActionOption(): any {
    return this.actionOption ;
  }
}
