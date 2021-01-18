export interface ApolloQueryResultInterface<T> {
    loading: boolean;
    networkStatus: number;
    data: {
        [key: string]: Array<T>;
    };
}
