type Override<Type, NewType> = Omit<Type, keyof NewType> & NewType;
