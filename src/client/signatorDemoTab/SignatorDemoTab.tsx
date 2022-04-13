import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { useTeams } from "msteams-react-base-component";
import * as microsoftTeams from "@microsoft/teams-js";
import { HttpClient } from "../../services/httpService";
import jwtDecode from "jwt-decode";
import { AuthRequest } from "../../models/AuthRequest";
import axios from "axios";
/**
 * Implementation of the Signator Demo content page
 */
export const SignatorDemoTab = () => {
  const httpClient = new HttpClient();

  const [{ inTeams, theme, context }] = useTeams();
  const [entityId, setEntityId] = useState<any | undefined>();
  const [name, setName] = useState<string>();
  const [ssoToken, setSsoToken] = useState<string>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    debugger;
    const httpClient = new HttpClient();

    if (inTeams === true) {
      microsoftTeams.authentication.getAuthToken({
        successCallback: (result) => {
      
          const serviceRequest: any = {
            client_id: "fb316bbd-723a-4179-a0d2-92b059042234",
            client_secret: "Qnx7Q~CAeGI305hOdDQHQmGSG--25sSTmxU.A",
            requested_token_use: "on_behalf_of",
            grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
            scope:
              "api://fb316bbd-723a-4179-a0d2-92b059042234/access_as_user",
            assertion: result,
          };

          httpClient.ExchangeForOBOToken(serviceRequest).then((res)=>{
            console.log(res);
          })

          microsoftTeams.appInitialization.notifySuccess();
        },
        failureCallback: function (error) {
           console.log(error);
        },
      });
    } else {
      setEntityId("Not in Microsoft Teams");
    }
  }, [inTeams]);

  useEffect(() => {
    if (context) {
      setEntityId(context.entityId);
      console.log(context);
    }
  }, [context]);

  /**
   * The render() method to create the UI of the tab
   */
  return (
    <iframe
      src="https://mobile.signator.hr/simple_signer/"
      style={{ width: "100%", height: "100vh", overflow: "hidden" }}
    ></iframe>
  );
};
