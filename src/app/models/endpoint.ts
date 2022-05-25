import { Parameter } from "./parameter";

export interface Endpoint {
    name:                string;
    path:                string;
    endpointDescription: string;
    methodType:          string;
    lastResp:            null;
    status:              boolean;
    //parameters:         Parameter[];
    number:              number;
    respDescription:     string;
}
