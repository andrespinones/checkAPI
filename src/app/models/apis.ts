export interface Api {
    apiID:         number;
    name:          string;
    baseUrl:       string;
    description:    string;
    isFavorite:    boolean; //BY USER
    isEnabled:     boolean;
    successAns: number;
    errorAns: number;
}
