export interface Endpoint {
    endpointID:          number;
    name:                string;
    path:                string;
    endpointDescription: string;
    groupID:             number;
    methodType:          string;
    lastRespCode:        number;
    lastRespDate:        string;
    status:              boolean;
}
