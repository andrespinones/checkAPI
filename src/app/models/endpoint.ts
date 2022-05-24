export interface Endpoint {
    name:                string;
    path:                string;
    endpointDescription: string;
    methodType:          string;
    lastResp:            null;
    status:              boolean;
    dataType:            string;
    paramName:           string;
    isRequired:          boolean;
    paramDescription:    string;
    number:              number;
    respDescription:     string;
}
