export type Style = 'danger' | 'primary'

export type Array1Of<Type> = [Type] | []
export type Array2Of<Type> = [Type, Type] | Array1Of<Type>
export type Array3Of<Type> = [Type, Type, Type] | Array2Of<Type>
export type Array4Of<Type> = [Type, Type, Type, Type] | Array3Of<Type>
export type Array5Of<Type> = [Type, Type, Type, Type, Type] | Array4Of<Type>
export type Array6Of<Type> = [Type, Type, Type, Type, Type, Type] | Array5Of<Type>
export type Array7Of<Type> = [Type, Type, Type, Type, Type, Type, Type] | Array6Of<Type>
export type Array8Of<Type> = [Type, Type, Type, Type, Type, Type, Type, Type] | Array7Of<Type>
export type Array9Of<Type> = [Type, Type, Type, Type, Type, Type, Type, Type, Type] | Array8Of<Type>
export type Array10Of<Type> = [Type, Type, Type, Type, Type, Type, Type, Type, Type, Type] | Array9Of<Type>
