import axios, { AxiosResponse } from "axios";
import { GetAttachmentsRequest } from "../models/GetAttachmentsRequest";
import { GetAttachmentsResponse } from "../models/GetAttachmentsResponse";
import { SendFileToSign } from "../models/SendFileToSignRequest";
import { AuthRequest } from "../models/AuthRequest";
import { token } from "morgan";

export class HttpClient {
  baseUrlMyApi = "https://mdodevski.vizibit.eu";
  baseUrlSignumId = "https://test.signumid.hr";
  baseUrlGraphApi = "https://graph.microsoft.com/v1.0";
  baseUrlMicrosoftOnline = "https://login.microsoftonline.com";

  async GetAttachments(request: GetAttachmentsRequest) {
    const res = await axios.post<
      GetAttachmentsRequest,
      AxiosResponse<GetAttachmentsResponse[]>
    >(this.baseUrlMyApi + "/getAttachments", request);
    return res.data;
  }

  async PrepareFileForSigning(file: string) {
    var request = {
      data: file,
    };

    const res = await axios.post<GetAttachmentsResponse, AxiosResponse<any>>(
      this.baseUrlSignumId + "/v/1/rms",
      request
    );
    return res.data;
  }

  async SendFileToSign(request: SendFileToSign) {
    const res = await axios.post<SendFileToSign, AxiosResponse<boolean>>(
      this.baseUrlMyApi + "/sendFileToSign",
      request
    );
    return res.data;
  }

  async GetAuthenticationToken(request: AuthRequest) {
    const res = await axios.post<AuthRequest, AxiosResponse<any>>(
      this.baseUrlMicrosoftOnline +
        "/common/oauth2/v2.0/token", "grant_type=" +
        request.grant_type +
        "&client_id=" +
        request.client_id +
        "&client_secret=" +
        request.client_secret +
        "&scope=" +
        request.scope +
        "&requested_token_use=" +
        request.requested_token_use +
        "&assertion=" +
        request.assertion,
        {
          headers:{
            Accept: "application/json",
            "Content-Type": "application/x-www-from-urlencoded"
          }
        }
    );
    return res.data;
  }

  async ExchangeForOBOToken(request: any){
    const res = await axios.post<any, AxiosResponse<any>>(
      this.baseUrlMyApi + "/exchange",
      request
    );
    return res.data;
  }
}
