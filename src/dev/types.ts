export type Selective<Keys extends string, Type> = Partial<Record<Keys, Type>>

export type Prefix<Value, Prefix extends string> = Value extends string ? `${Prefix}${Value}` : never;
